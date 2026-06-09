/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import bcrypt from "bcryptjs";
import { prisma } from "@/db/prisma";
import { authOptions } from "@/lib/auth";

// Fetch all users
export async function GET() {
  const session = await getServerSession(authOptions);
  
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// CREATE: 
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, username, password, role } = body;

    if (!name || !username || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // UNIQUE CHECK
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ error: "User ID (Username) is already taken" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, username, password: hashedPassword, role },
      select: { id: true, username: true, role: true }
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// UPDATE: 
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  try {
    const { id, name, username, password, role } = await req.json();
    if (!id) return NextResponse.json({ error: "User ID required" }, { status: 400 });

    // UNIQUE CHECK 
    if (username) {
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser && existingUser.id !== id) {
        return NextResponse.json({ error: "User ID is already in use by another team member" }, { status: 400 });
      }
    }

    // Base update data
    const updateData: any = { name, username };

    if (id !== (session?.user as any)?.id) {
      updateData.role = role;
    }

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, username: true, role: true }
    });
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE: 
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const currentSessionId = (session?.user as any)?.id;
  const currentUsername = (session?.user as any)?.username;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    // LOCK 1 - self Delete
    if (id === currentSessionId) {
      return NextResponse.json({ error: "Critical: You cannot delete your own account." }, { status: 403 });
    }

    // Fetch the target user to see what role they have
    const targetUser = await prisma.user.findUnique({ where: { id }, select: { role: true } });
    if (!targetUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Check if the current user is the Master Admin (from NextAuth env variables)
    const isMasterAdmin = currentSessionId === "master-admin-override" || currentUsername === process.env.MASTER_ADMIN_USER;

    // LOCK 2 - Admin Deletion
    if (targetUser.role === "ADMIN" && !isMasterAdmin) {
      return NextResponse.json({ error: "Permission Denied: Only the Master Admin can delete other Admins." }, { status: 403 });
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}