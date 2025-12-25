import React from "react";

const ChatForm = () => {
  return (
    <section className="container mx-auto px-6 mt-10 mb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
          <p className="text-gray-500 text-sm">Connect with other students</p>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
        <div
          data-slot="card-content"
          class="[&amp;:last-child]:pb-6 p-16 text-center"
          data-fg-cyo8130="1.44:11.7560:/src/app/pages/DashboardPage.tsx:295:17:13192:665:e:CardContent:::::s:BJcl:1"
          data-fg-elfm5="0.19:0.1988:/src/app/components/ui/card.tsx:66:5:1513:119:e:div::1"
        >
          <div
            class="bg-linear-to-br from-accent to-primary p-6 rounded-3xl inline-flex mb-6"
            data-fg-cyo8131="1.44:11.7560:/src/app/pages/DashboardPage.tsx:296:19:13253:187:e:div"
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
              class="lucide lucide-message-circle h-16 w-16 text-white"
              data-fg-cyo8132="1.44:11.7560:/src/app/pages/DashboardPage.tsx:297:21:13365:50:e:MessageCircle::::::esy"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
            </svg>
          </div>
          <h3
            class="text-2xl font-bold mb-3"
            data-fg-cyo8133="1.44:11.7560:/src/app/pages/DashboardPage.tsx:299:19:13459:65:e:h3"
          >
            Start a conversation
          </h3>
          <p
            class="text-muted-foreground mb-6 text-lg"
            data-fg-cyo8135="1.44:11.7560:/src/app/pages/DashboardPage.tsx:300:19:13543:136:e:p"
          >
            Connect with other students to collaborate
          </p>
          <button
            data-slot="button"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md has-[&gt;svg]:px-4 px-8"
            data-fg-cyo8137="1.44:11.7560:/src/app/pages/DashboardPage.tsx:303:19:13698:128:e:Button:::::s:BNeg:1"
            data-fg-csem0="0.17:5.211:/src/app/components/ui/button.tsx:47:5:1987:137:e:Comp"
          >
            Open Chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatForm;
