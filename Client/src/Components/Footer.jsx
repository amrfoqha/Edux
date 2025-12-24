const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 mt-12">
            <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                    <img
                        src="/images/edx.webp"
                        alt="EduX Logo"
                        className="h-10 w-10"
                    />
                    <p>Empowering students through collaborative learning and resource sharing.</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-1">
                        <li><a href="/" className="hover:text-purple-600">Home</a></li>
                        <li><a href="/browse" className="hover:text-purple-600">Browse Resources</a></li>
                        <li><a href="/how-it-works" className="hover:text-purple-600">How It Works</a></li>
                        <li><a href="/pricing" className="hover:text-purple-600">Pricing</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Support</h4>
                    <ul className="space-y-1">
                        <li><a href="/help-center" className="hover:text-purple-600">Help Center</a></li>
                        <li><a href="/terms" className="hover:text-purple-600">Terms of Service</a></li>
                        <li><a href="/privacy" className="hover:text-purple-600">Privacy Policy</a></li>
                        <li><a href="/contact" className="hover:text-purple-600">Contact Us</a></li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h4 className="font-semibold mb-2">Connect With Us</h4>
                    <div className="flex space-x-3">
                        <a href="#" className="hover:text-purple-600">Facebook</a>
                        <a href="#" className="hover:text-purple-600">Twitter</a>
                        <a href="#" className="hover:text-purple-600">Instagram</a>
                        <a href="#" className="hover:text-purple-600">LinkedIn</a>
                    </div>
                    <p className="text-sm">support@edux.edu</p>
                </div>
            </div>
            <div className="text-center py-4 border-t border-gray-300 text-sm">
                © 2025 EduX. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
