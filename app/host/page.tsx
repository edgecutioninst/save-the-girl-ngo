"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

// The reusable UI component for Emails, Phones, and Caretakers
const TagInput = ({ label, placeholder, tags, setTags }: { label: string, placeholder: string, tags: string[], setTags: (tags: string[]) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="p-2 border border-slate-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <div className="flex flex-wrap gap-2 mb-1">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md">
              {tag}
              <button type="button" onClick={() => removeTag(index)} className="text-blue-500 hover:text-red-500 transition-colors">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-sm outline-none bg-transparent placeholder:text-slate-400"
          placeholder={tags.length === 0 ? placeholder : "Type and press Enter to add more..."}
        />
      </div>
    </div>
  );
};

export default function HostCertificatePage() {
  // State for dynamic arrays
  const [emails, setEmails] = useState<string[]>([]);
  const [phones, setPhones] = useState<string[]>([]);
  const [caretakers, setCaretakers] = useState<string[]>([]);
  
  // State for conditional UI fields
  const [helpedFinancially, setHelpedFinancially] = useState("No");
  const [visitSure, setVisitSure] = useState(true);

  return (
    <div className="p-8 w-full max-w-4xl mx-auto bg-slate-50 min-h-screen text-slate-900">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Host Certificate Form</h2>
        <p className="text-sm text-slate-500">Log an event host and generate their certification of appreciation.</p>
      </div>

      <form className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm space-y-8">
        
        {/* Section 1: Host Basics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Name of Host</label>
            <input type="text" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" placeholder="Host name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Date of Event</label>
            <input type="date" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Facility / Location</label>
            <input type="text" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" placeholder="Event location" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Company Coordinator</label>
            <input type="text" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" placeholder="Coordinator name" />
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Section 2: Dynamic Contact Arrays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TagInput label="Phone Numbers" placeholder="Enter phone and press Enter" tags={phones} setTags={setPhones} />
          <TagInput label="Email Addresses" placeholder="Enter email and press Enter" tags={emails} setTags={setEmails} />
        </div>

        <hr className="border-slate-200" />

        {/* Section 3: Event Specifics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Center Visited (MCQ)</label>
            <select className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-slate-900 outline-none">
              <option>Sector -9, Gurgaon</option>
              <option>Sector -57, Gurgaon</option>
              <option>Noida Sec 63</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">No. of Children Visited</label>
            <input type="number" min="0" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" placeholder="e.g. 50" />
          </div>
          
          <div className="md:col-span-2">
            <TagInput label="Names of Caretakers" placeholder="Enter caretaker name and press Enter" tags={caretakers} setTags={setCaretakers} />
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Section 4: Post-Event Data */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Items Donated</label>
            <textarea className="w-full p-2.5 border border-slate-300 rounded-md h-20 outline-none bg-white text-slate-900" placeholder="List items here..."></textarea>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Report Upload (Google Drive Link)</label>
            <input type="url" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-blue-600" placeholder="https://drive.google.com/..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Future Partnership Remarks</label>
            <textarea className="w-full p-2.5 border border-slate-300 rounded-md h-20 outline-none bg-white text-slate-900" placeholder="Add remarks..."></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-lg border border-slate-200">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Have helped financially?</label>
              <select 
                className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-slate-900 outline-none"
                value={helpedFinancially}
                onChange={(e) => setHelpedFinancially(e.target.value)}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            {/* Conditional Amount Input */}
            {helpedFinancially === "Yes" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-sm font-medium text-slate-700">Enter Amount (₹)</label>
                <input type="number" className="w-full p-2.5 border border-blue-300 rounded-md outline-none bg-white text-slate-900 focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Next Expected Visit</label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={!visitSure}
                  onChange={() => setVisitSure(!visitSure)}
                />
                Not sure yet
              </label>
            </div>
            {/* Conditional Date Input */}
            <input 
              type="date" 
              disabled={!visitSure}
              className={`w-full p-2.5 border rounded-md outline-none transition-colors ${!visitSure ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white border-slate-300 text-slate-900'}`} 
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <button type="button" className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">Cancel</button>
          <button type="button" className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm">Save Host Data</button>
        </div>
      </form>
    </div>
  );
}