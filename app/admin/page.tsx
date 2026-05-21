"use client";

import Link from "next/link";
import { Users, MapPin, Database } from "lucide-react";

export default function AdminDashboard() {
  const adminModules = [
    {
      title: "Manage Staff",
      description: "Create, reset, or revoke access for staff members.",
      icon: Users,
      href: "/admin/users",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Manage Centers",
      description: "Update the list of official NGO facility locations.",
      icon: MapPin,
      href: "/settings", // Pointing to your existing settings route
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Export Data in xlsx format",
      description: "Export full database records.",
      icon: Database,
      href: "#",
      color: "text-slate-400",
      bg: "bg-slate-50",
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Control Panel</h1>
        <p className="text-slate-500 mt-2">Manage system settings, staff access, and master configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module) => (
          <Link 
            key={module.title} 
            href={module.href}
            className="block p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-slate-300 transition-all group"
          >
            <div className={`w-12 h-12 ${module.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <module.icon className={`h-6 w-6 ${module.color}`} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{module.title}</h3>
            <p className="text-sm text-slate-500">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}