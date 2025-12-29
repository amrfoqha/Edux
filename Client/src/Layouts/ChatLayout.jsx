export default function ChatLayout({ children }) {
    return (
        <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-secondary/5 to-background flex flex-col">
            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col bg-white shadow-2xl">
                {children}
            </div>
        </div>
    );
}
