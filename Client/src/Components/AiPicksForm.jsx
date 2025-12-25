import React from "react";

const AiPicksForm = () => {
  return (
    <section className="container mx-auto px-6 mt-10 mb-20">
      <div className="flex-1 outline-none space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-success to-info p-3 rounded-2xl">
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
              className="lucide lucide-sparkles h-7 w-7 text-white"
            >
              <path
                d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 
                        8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
              ></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold">AI Recommendations</h2>
            <p className="text-muted-foreground">
              Personalized picks based on your activity
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative">
            <div className="absolute -top-3 -right-3 z-10">
              <span
                data-slot="badge"
                className="inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap 
                        shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50
                        focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
                        transition-[color,box-shadow] overflow-hidden border-transparent [a&amp;]:hover:bg-primary/90
                        bg-gradient-to-r from-success to-info text-white shadow-xl px-3 py-1"
              >
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
                  className="lucide lucide-sparkles h-3 w-3 mr-1"
                >
                  <path
                    d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 
                                8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437
                                1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
                  ></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                AI Pick
              </span>
            </div>
            <div className="h-full">
              <div
                className="text-card-foreground gap-6 cursor-pointer h-full flex flex-col overflow-hidden bg-white shadow-md 
                        hover:shadow-xl transition-all duration-300 rounded-2xl border border-border/50"
              >
                <div
                  className="relative w-full"
                  style={{ paddingTop: "56.25%" }}
                >
                  <div className="absolute inset-0 bg-cover bg-center rounded-t-2xl"></div>
                  <div className="absolute top-3 right-3">
                    <span
                      className="inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 
                                    [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                                    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
                                    transition-[color,box-shadow] overflow-hidden border-transparent [a&amp;]:hover:bg-primary/90
                                    bg-gradient-to-r from-blue-400 to-purple-500 text-white border-0 shadow-lg px-3 py-1 rounded-full text-xs
                                    font-semibold uppercase tracking-wide"
                    >
                      Lecture Slides
                    </span>
                  </div>
                </div>
                <div className="[&amp;:last-child]:pb-6 flex-grow p-5 space-y-3">
                  <h3 className="font-bold text-lg leading-snug line-clamp-2">
                    Introduction to Algorithms - Complete Lecture Notes
                  </h3>
                  <p class="text-sm text-muted-foreground">MIT</p>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center justify-center border font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 
                                    gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                                    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow]
                                    overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground text-xs px-2.5 py-0.5 rounded-full
                                    bg-muted/50"
                    >
                      Algorithms
                    </span>
                    <span
                      className="inline-flex items-center justify-center border font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1
                                     [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                                     aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow]
                                     overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground text-xs px-2.5 py-0.5 rounded-full
                                     bg-muted/50"
                    >
                      Data Structures
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiPicksForm;
