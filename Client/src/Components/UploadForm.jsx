import React from "react";

export const UploadForm = () => {
  return (
    <section className="container mx-auto px-6 mt-10 mb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Uploads</h2>
          <p className="text-gray-500 text-sm">Manage your shared resources</p>
        </div>

        <button className="bg-purple-600 text-white px-5 py-2 rounded-xl shadow hover:bg-purple-700 transition">
          Upload New
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
        <div
          data-slot="card-content"
          class="[&amp;:last-child]:pb-6 p-16 text-center"
          data-fg-cyo878="1.44:11.7560:/src/app/pages/DashboardPage.tsx:178:19:8068:687:e:CardContent:::::s:BJcl:1"
          data-fg-elfm5="0.19:0.1988:/src/app/components/ui/card.tsx:66:5:1513:119:e:div::1"
        >
          <div
            class="bg-gradient-to-br from-primary to-secondary p-6 rounded-3xl inline-flex mb-6"
            data-fg-cyo879="1.44:11.7560:/src/app/pages/DashboardPage.tsx:179:21:8131:187:e:div"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-upload h-16 w-16 text-white"
              data-fg-cyo880="1.44:11.7560:/src/app/pages/DashboardPage.tsx:180:23:8248:43:e:Upload::::::C6l4"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
          </div>
          <h3
            class="text-2xl font-bold mb-3"
            data-fg-cyo881="1.44:11.7560:/src/app/pages/DashboardPage.tsx:182:21:8339:59:e:h3"
          >
            No uploads yet
          </h3>
          <p
            class="text-muted-foreground mb-6 text-lg"
            data-fg-cyo883="1.44:11.7560:/src/app/pages/DashboardPage.tsx:183:21:8419:142:e:p"
          >
            Share your first resource with the community
          </p>
          <button
            data-slot="button"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md has-[&gt;svg]:px-4 px-8"
            data-fg-cyo885="1.44:11.7560:/src/app/pages/DashboardPage.tsx:186:21:8582:140:e:Button:::::s:BNeg:1"
            data-fg-csem0="0.17:5.211:/src/app/components/ui/button.tsx:47:5:1987:137:e:Comp"
          >
            Upload Resource
          </button>
        </div>
      </div>
    </section>
  );
};
