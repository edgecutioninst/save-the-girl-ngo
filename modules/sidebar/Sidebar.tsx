"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  HeartHandshake, 
  GraduationCap, 
  HandHeart,
  LogOut
} from "lucide-react";

const routes = [
  {
    label: "Manage Users",
    icon: LayoutDashboard,
    href: "/", 
  },
  {
    label: "Host Certificate",
    icon: Users,
    href: "/host",
  },
  {
    label: "Visitor Certificate",
    icon: UserPlus,
    href: "/visitor",
  },
  {
    label: "Donation Certificate",
    icon: HeartHandshake,
    href: "/donation",
  },
  {
    label: "Internship Certificate",
    icon: GraduationCap,
    href: "/internship",
  },
  {
    label: "Volunteer Certificate",
    icon: HandHeart,
    href: "/volunteer",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-slate-200 shrink-0">
      
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 border-b border-slate-200">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700" // Active state matching the brand theme
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <route.icon className={`h-5 w-5 ${isActive ? "text-blue-700" : "text-slate-400"}`} />
                  {route.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}