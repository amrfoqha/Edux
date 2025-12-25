export default function AuthLayout({ branding, children }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {branding}
                {children}
            </div>
        </div>
    );
}
