import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing Submission ID" }, { status: 400 });

    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });

    // 1. Dynamic Template Routing
    const templateMap: Record<string, string> = {
      'VOLUNTEER': 'volunteer.png',
      'INTERN': 'intern.png',
      'DONOR': 'donor.png',
      'HOST': 'host.png',
      'VISITOR': 'visitor.png',
    };

    const typeKey = submission.certificateType?.toUpperCase();
    const fileName = templateMap[typeKey];

    if (!fileName) {
      return NextResponse.json({ error: `Unsupported certificate type: ${typeKey}` }, { status: 400 });
    }

    // 2. Load the specific blank template
    const templatePath = path.join(process.cwd(), 'public', 'templates', fileName);
    const templateBytes = await fs.readFile(templatePath);

    // 3. Initialize PDF and embed the main background image
    const pdfDoc = await PDFDocument.create();
    const bgImage = await pdfDoc.embedPng(templateBytes);
    
    // Make the PDF page exactly the size of your JPG (2000 x 1414)
    const page = pdfDoc.addPage([bgImage.width, bgImage.height]);
    page.drawImage(bgImage, { x: 0, y: 0, width: bgImage.width, height: bgImage.height });

    // 4. Load and stamp Signature & Stamp
   const sigPath = path.join(process.cwd(), 'public', 'templates', 'signature.png');
    const stampPath = path.join(process.cwd(), 'public', 'templates', 'stamp.png');
    
    const [sigBytes, stampBytes] = await Promise.all([
      fs.readFile(sigPath).catch(() => null),
      fs.readFile(stampPath).catch(() => null)
    ]);

    if (sigBytes) {
      const sigImage = await pdfDoc.embedPng(sigBytes);
      // Your calculated signature placement
      page.drawImage(sigImage, { x: 1647, y: 157, width: 250, height: 80 }); 
    }

    if (stampBytes) {
      const stampImage = await pdfDoc.embedPng(stampBytes);
      // Placed the stamp on the bottom left to balance the signature
      page.drawImage(stampImage, { x: 200, y: 150, width: 150, height: 150 });
    }

    // 5. Stamp the Text Data
    const { applicantName, postRole, startDate, endDate, createdAt } = submission;
    const textColor = rgb(0.1, 0.1, 0.1);
    const formatDt = (dt: Date | null) => dt ? new Date(dt).toLocaleDateString('en-IN') : 'N/A';

    switch (typeKey) {
      case 'VOLUNTEER':
        page.drawText(formatDt(createdAt), { x: 264, y: 1137, size: 28, color: textColor });
        page.drawText(applicantName || "Unknown Name", { x: 958, y: 767, size: 56, color: textColor });
        page.drawText(postRole || "Volunteer", { x: 958, y: 553, size: 36, color: textColor });
        page.drawText(formatDt(startDate), { x: 687, y: 430, size: 32, color: textColor });
        page.drawText(formatDt(endDate), { x: 1360, y: 430, size: 32, color: textColor });
        break;

      case 'INTERN':
        // Date is floating on the middle-left line
        page.drawText(formatDt(createdAt), { x: 200, y: 850, size: 28, color: textColor });
        // Name is centered below SAVE THE GIRL
        page.drawText(applicantName || "Unknown Name", { x: 600, y: 680, size: 56, color: textColor });
        // Role is centered
        page.drawText(postRole || "Intern", { x: 750, y: 530, size: 36, color: textColor });
        // Start and End dates at the bottom
        page.drawText(formatDt(startDate), { x: 650, y: 400, size: 32, color: textColor });
        page.drawText(formatDt(endDate), { x: 1300, y: 400, size: 32, color: textColor });
        break;

      case 'DONOR':
        // Date top left
        page.drawText(formatDt(createdAt), { x: 250, y: 920, size: 28, color: textColor });
        // Name centered
        page.drawText(applicantName || "Unknown Name", { x: 800, y: 720, size: 56, color: textColor });
        // Donation type/items on the center line
        const donationItems = submission.itemsDonated ? "Donation in Kind" : "Financial Support";
        page.drawText(donationItems, { x: 650, y: 580, size: 32, color: textColor });
        break;

      case 'HOST':
        // Date top left
        page.drawText(formatDt(createdAt), { x: 200, y: 1020, size: 28, color: textColor });
        // Name shifted right
        page.drawText(applicantName || "Unknown Name", { x: 1000, y: 880, size: 48, color: textColor });
        // Location shifted right
        page.drawText(submission.facilityLocation || "Our Center", { x: 800, y: 740, size: 36, color: textColor });
        break;

      case 'VISITOR':
        // Name shifted right
        page.drawText(applicantName || "Unknown Name", { x: 1050, y: 900, size: 48, color: textColor });
        // Location shifted right
        page.drawText(submission.facilityLocation || "Our Center", { x: 950, y: 760, size: 36, color: textColor });
        break;
    }
    // 6. Save and convert to Buffer to fix the TypeScript error
    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${applicantName}_Certificate.pdf"`,
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}