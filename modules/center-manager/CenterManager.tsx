/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CenterManager({ initialCenters }: { initialCenters: string[] }) {
  const [centers, setCenters] = useState<string[]>(initialCenters);
  const [newCenter, setNewCenter] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const saveToDatabase = async (updatedCenters: string[]) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings', { 
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ centers: updatedCenters }) 
      });
      const json = await response.json();
      
      if (!json.success) throw new Error("Database failed to update");
      
      setCenters(updatedCenters);
      toast.success("Centers updated successfully!");
    } catch (error :any) {
      toast.error("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdd = () => {
    if (!newCenter.trim()) return;
    if (centers.includes(newCenter.trim())) {
      toast.error("This center already exists.");
      return;
    }
    
    const updated = [...centers, newCenter.trim()];
    saveToDatabase(updated);
    setNewCenter("");
  };

  const handleDelete = (centerToRemove: string) => {
    const updated = centers.filter(c => c !== centerToRemove);
    saveToDatabase(updated);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Manage Centers</h2>
          <p className="text-xs text-slate-500">Add or remove NGO facility locations.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input 
          type="text" 
          placeholder="e.g. Gurugram Sector 14" 
          className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={newCenter}
          onChange={(e) => setNewCenter(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button 
          onClick={handleAdd}
          disabled={isSaving || !newCenter.trim()}
          className="w-full sm:w-auto justify-center px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Add
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Active Locations</h3>
        
        {centers.length === 0 ? (
          <p className="text-sm text-slate-500 italic p-4 text-center bg-slate-50 rounded-md border border-slate-100">No centers added yet.</p>
        ) : (
          centers.map((center, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-md group hover:border-slate-200 transition-colors">
              <span className="text-sm font-medium text-slate-700">{center}</span>
              <button 
                onClick={() => handleDelete(center)}
                className="text-slate-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Remove Center"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}