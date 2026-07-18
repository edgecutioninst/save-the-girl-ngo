# 🌸 Save The Girl Operations Dashboard

> **A production-ready internal operations platform developed independently during a two-month software engineering internship for Save The Girl NGO.**
>
> Designed to streamline certificate processing, applicant management, staff administration, and certificate distribution through a centralized dashboard, replacing manual workflows with a secure digital system.

<p align="center">
  <a href="https://save-the-girl-ngo-iota.vercel.app/"><strong>🚀 Live Demo</strong></a>
</p>

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,postgres,prisma,vercel" />
</p>

---

# About the Project

This platform was built for **Save The Girl NGO** as an internal operational tool used exclusively by organization staff.

Rather than serving as a public-facing website, the application centralizes the NGO's certificate processing workflow into a single management dashboard. Staff members can review applications, manage records, generate certificates, and distribute them through multiple channels without relying on manual paperwork.

The system was independently developed during a **two-month software engineering internship**, from gathering requirements through deployment.

---

# ✨ Features

## 📋 Centralized Certificate Management

- Unified dashboard for all certificate requests
- Search applicants by ID, name, phone, or email
- Filter records by certificate category
- Filter applications by approval status
- Review complete applicant information from a single interface

---

## 📂 Applicant Record Management

Each application stores applicant information together with certificate-specific data such as donations, internships, volunteering, host visits, and visitor information.

Staff members can:

- View complete application details
- Edit existing applications
- Update approval status
- Delete records
- Duplicate previous applications using **Copy Record**

The **Copy Record** workflow automatically creates a new application pre-filled with data from an existing submission, significantly reducing repetitive data entry for recurring applicants.

---

## 📜 Certificate Generation Workflow

After approval, certificates can be generated directly from the dashboard.

Administrators may distribute certificates through one or multiple channels simultaneously:

- Download to local computer
- Upload to NGO Google Drive
- Email directly to the applicant

This reduces the entire certificate issuance workflow to only a few clicks.

---

## 👥 Role-Based Administration

The platform includes a dedicated administration panel implementing Role-Based Access Control (RBAC).

Administrators can:

- Create staff accounts
- Assign administrative roles
- Manage organizational centers
- Control user permissions
- Restrict sensitive operations

---

## 📊 Operations Dashboard

Designed for staff members processing large numbers of applications.

Features include:

- Advanced search
- Status filtering
- Certificate category filtering
- Approval workflow
- Excel export
- One-click navigation between records

---

## 🔐 Authentication & Security

- Google OAuth Authentication
- NextAuth session management
- Protected administrative routes
- Role-based authorization
- Master administrator account

---

## ☁️ Deployment

- Vercel
- PostgreSQL
- Prisma ORM

---

# 🔑 Demo Access

```env
MASTER_ADMIN_USER="MASTER_ADMIN_USER"
MASTER_ADMIN_PASS="MASTER_ADMIN_PASS"
```

---

# 📸 Screenshots

## Dashboard Overview

<img width="1918" height="870" alt="Screenshot 2026-07-18 002937" src="https://github.com/user-attachments/assets/e27d8cb8-6906-4473-9074-dd2b92d0fa88" />


Centralized dashboard displaying certificate requests with advanced filtering, approval controls, and Excel export.

---

## Applicant Details

<img width="1918" height="872" alt="Screenshot 2026-07-18 002548" src="https://github.com/user-attachments/assets/7f954054-cfd8-4562-bc07-8fc5c89da085" />


Detailed applicant information together with approval controls and certificate generation.

---

## Certificate Distribution

<img width="1919" height="879" alt="Screenshot 2026-07-18 002648" src="https://github.com/user-attachments/assets/0e53aac5-27df-46dc-8433-f440f2e6b221" />


Generate certificates and distribute them through local download, Google Drive, and email.

---

# 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- NextAuth

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Integrations

- Google OAuth
- Google Drive API
- Gmail API
- pdf-lib
- Nodemailer

---

# 🏗️ Workflow

```text
Certificate Request
        │
        ▼
Stored in Database
        │
        ▼
Staff Dashboard
        │
        ▼
Review Application
        │
 ┌──────┴─────────┐
 │                │
Approve        Reject
 │
 ▼
Generate Certificate
 │
 ├──────────────┬──────────────┐
 ▼              ▼              ▼
Download     Google Drive     Email
```

---

# 🚀 Running Locally

```bash
git clone https://github.com/edgecutioninst/save-the-girl-ngo.git

cd save-the-girl-ngo

npm install
```

Create a `.env`

```env
DATABASE_URL=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GOOGLE_REFRESH_TOKEN=
GOOGLE_DRIVE_FOLDER_ID=

EMAIL_USER=
EMAIL_PASS=

MASTER_ADMIN_USER=
MASTER_ADMIN_PASS=
```

```bash
npx prisma generate

npx prisma db push

npm run dev
```

---

# 💡 Engineering Challenges

## Translating Operational Workflows into Software

The most challenging aspect of the project was translating constantly evolving requirements from non-technical stakeholders into maintainable software.

As operational workflows evolved throughout development, features such as approval pipelines, record duplication, and certificate distribution required continuous redesign while preserving usability and data consistency.

---

## Designing Efficient Administrative Workflows

The platform minimizes repetitive administrative work through:

- Record duplication
- Automated certificate generation
- Multi-channel distribution
- Advanced search
- Filtering
- Excel export

---

## Secure Internal Platform

Since the application is intended exclusively for NGO staff, authorization and administrative permissions were essential. RBAC ensures sensitive functionality remains restricted to authorized personnel.

---

## Google Service Integration

The application integrates Google services to automatically distribute generated certificates via cloud storage and email without leaving the dashboard.

---

# 🎯 Internship Experience

This project represents my primary software engineering internship experience, where I independently designed, developed, and deployed a production-ready internal operations platform for a real non-profit organization.

Beyond the technical implementation, the internship provided valuable experience gathering requirements, collaborating with non-technical stakeholders, adapting to changing workflows, and delivering software that streamlined day-to-day organizational operations.
