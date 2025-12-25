const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-3">
          <img src="/images/edx.webp" alt="EduX Logo" className="h-10 w-10" />

          <span className="text-2xl font-bold text-purple-600">EduX</span>
        </div>

        <nav className="flex items-center space-x-6">
          <a Link href="/" className="text-gray-700 hover:text-purple-600">
            Home
          </a>
          <a href="/browse" className="text-gray-700 hover:text-purple-600">
            Browse
          </a>
          <a href="/about" className="text-gray-700 hover:text-purple-600">
            About
          </a>
          <a
            href="/auth/login"
            className="px-4 py-1 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            Login
          </a>
          <a
            href="/auth/register"
            className="px-4 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Register
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
