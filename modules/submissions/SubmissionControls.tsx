/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Clock, FileBadge, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Shadcn UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ControlProps {
  id: string;
  currentStatus: string;
  applicantName: string | null;
  certificateType: string;
}

export default function SubmissionControls({ id, currentStatus, applicantName, certificateType }: ControlProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const updateStatus = async (newStatus: "APPROVED" | "REJECTED" | "PENDING") => {
    setIsUpdating(true);
    const toastId = toast.loading(`Updating to ${newStatus}...`);
    
    try {
      const response = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      
      const json = await response.json();
      
      if (json.success) {
        toast.success(`Status updated!`, { id: toastId });
        setStatus(newStatus);
        router.refresh(); 
      } else {
        toast.error(`Error: ${json.error}`, { id: toastId });
      }
    } catch (error) {
      toast.error("Network error", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    const toastId = toast.loading("Stamping PDF...");

    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate certificate.");
      }

      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const cleanName = applicantName ? applicantName.replace(/\s+/g, '_') : 'Applicant';
      a.download = `${cleanName}_${certificateType}_Certificate.pdf`;
      
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Certificate downloaded successfully!", { id: toastId });
      setIsModalOpen(false); 
    } catch (error: any) {
      console.error("PDF Error:", error);
      toast.error(error.message || "Network error.", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      
      <div className="flex items-center gap-2 border-r pr-4 mr-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Update Status</span>
        <button 
          onClick={() => updateStatus('APPROVED')}
          disabled={isUpdating || status === 'APPROVED'}
          className={`p-2 rounded-lg transition-all ${status === 'APPROVED' ? 'bg-green-100 text-green-600 ring-2 ring-green-500' : 'bg-slate-50 text-slate-400 hover:bg-green-50 hover:text-green-600'}`}
          title="Approve"
        >
          <CheckCircle2 className="h-5 w-5" />
        </button>
        <button 
          onClick={() => updateStatus('REJECTED')}
          disabled={isUpdating || status === 'REJECTED'}
          className={`p-2 rounded-lg transition-all ${status === 'REJECTED' ? 'bg-red-100 text-red-600 ring-2 ring-red-500' : 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600'}`}
          title="Reject"
        >
          <XCircle className="h-5 w-5" />
        </button>
        <button 
          onClick={() => updateStatus('PENDING')}
          disabled={isUpdating || status === 'PENDING'}
          className={`p-2 rounded-lg transition-all ${status === 'PENDING' ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-500' : 'bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-600'}`}
          title="Reset to Pending"
        >
          <Clock className="h-5 w-5" />
        </button>
      </div>

      {/* Certificate Modal - Only show button if Approved */}
      {status === 'APPROVED' && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <FileBadge className="h-4 w-4" />
              Generate Certificate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Official Certificate</DialogTitle>
              <DialogDescription>
                This will create a signed PDF certificate.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
               <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 italic">
                 Note: The PDF will download locally to your machine for review. Automated emailing will be added in the next phase.
               </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isGenerating}>Cancel</Button>
              <Button onClick={handleGenerateCertificate} disabled={isGenerating} className="bg-blue-600 min-w-35">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating
                  </>
                ) : (
                  "Confirm & Generate"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}