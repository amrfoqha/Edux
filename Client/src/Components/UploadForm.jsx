import React, { useState } from "react";
import UploadResourceComponent from "./UploadResourceComponent";

export const UploadForm = () => {
  const [open, setOpen] = useState(false);
  const FormOpen = () => {
    setOpen(!open);
  };
  return (
    <section className="container mx-auto px-6 mt-10 mb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Uploads</h2>
          <p className="text-gray-500 text-sm">Manage your shared resources</p>
        </div>

        <button
          onClick={FormOpen}
          className="bg-purple-600 text-white px-5 py-2 rounded-xl shadow hover:bg-purple-700 transition"
        >
          Upload New
        </button>
      </div>

      {/* Empty State */}
      {!open && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="[&amp;:last-child]:pb-6 p-16 text-center">
            <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-3xl inline-flex mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-upload h-16 w-16 text-white"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" x2="12" y1="3" y2="15"></line>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">No uploads yet</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Share your first resource with the community
            </p>
            <button
              onClick={FormOpen}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md has-[&gt;svg]:px-4 px-8"
            >
              Upload Resource
            </button>
          </div>
        </div>
      )}
      {open && <UploadResourceComponent setOpen={setOpen} />}
    </section>
  );
};
