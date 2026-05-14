export default function InternshipCertificatePage() {
  return (
    <div className="p-8 w-full max-w-4xl mx-auto bg-slate-50 min-h-screen text-slate-900">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Internship Certificate Form</h2>
        <p className="text-sm text-slate-500">Fill in the student details to generate their completion certificate.</p>
      </div>

      <form className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm space-y-6">
        
        {/* Section 1: Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Student Name</label>
            <input type="text" className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900" placeholder="Enter full name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Gender</label>
            <select className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Start Date</label>
            <input type="date" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">End Date</label>
            <input type="date" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" />
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Section 2: Internship Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Mode</label>
            <select className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-slate-900 outline-none">
              <option>Virtual</option>
              <option>Work from Location</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Post / Role</label>
            <input type="text" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" placeholder="e.g. Web Developer" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Schedule Type</label>
            <select className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-slate-900 outline-none">
              <option>Daily</option>
              <option>Weekend</option>
              <option>Hours</option>
              <option>Schedule</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Voluntary or University</label>
            <select className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-slate-900 outline-none">
              <option>Self Chosen</option>
              <option>College Recommended</option>
            </select>
          </div>
        </div>

        {/* Section 3: Additional Data */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">University Name</label>
            <input type="text" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" placeholder="Enter university name" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Donation Type</label>
              <select className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-slate-900 outline-none">
                <option>Financial</option>
                <option>Non Financial</option>
                <option>Both</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Rating (Out of 5)</label>
              <input type="number" min="1" max="5" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-slate-900" placeholder="5" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Photos / Google Drive Link</label>
            <input type="url" className="w-full p-2.5 border border-slate-300 rounded-md outline-none bg-white text-blue-600" placeholder="https://drive.google.com/..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Remarks</label>
            <textarea className="w-full p-2.5 border border-slate-300 rounded-md h-24 outline-none bg-white text-slate-900" placeholder="Add any additional notes here..."></textarea>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-4">
          <button type="button" className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="button" className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            Save Intern Data
          </button>
        </div>
      </form>
    </div>
  );
}