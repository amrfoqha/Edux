import Header from "../Components/Header";
import Footer from "../Components/Footer";

const UserProfile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      <main className="flex-grow">
        {/* Top Profile Section */}
        <section className="container mx-auto px-6 mt-8">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-3xl p-8 shadow-xl text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                  U
                </div>
                <span className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></span>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold">Student Name</h1>
                <p className="opacity-90 text-sm">user@email.com</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge text="University Name" />
                  <Badge text="Faculty" />
                  <Badge text="Department" />
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-4">
                <StatCard label="Uploads" value="0" />
                <StatCard label="Favorites" value="0" />
                <StatCard label="Downloads" value="128" highlight />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="container mx-auto px-6 mt-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex gap-3">
            <Tab active text="My Uploads" icon="⬆️" />
            <Tab text="Favorites" icon="❤️" />
            <Tab text="Chat" icon="💬" />
            <Tab text="AI Picks" icon="✨" />
          </div>
        </section>

        {/* ===== Content ===== */}
        <section className="container mx-auto px-6 mt-10 mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Uploads</h2>
              <p className="text-gray-500 text-sm">
                Manage your shared resources
              </p>
            </div>

            <button className="bg-purple-600 text-white px-5 py-2 rounded-xl shadow hover:bg-purple-700 transition">
              Upload New
            </button>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl mb-6">
              ⬆️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No uploads yet
            </h3>
            <p className="text-gray-500 mb-6">
              Share your first resource with the community
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition">
              Upload Resource
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};


/* Reusable Components  */

const Badge = ({ text }) => (
  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
    {text}
  </span>
);

const StatCard = ({ label, value, highlight }) => (
  <div
    className={`w-24 h-20 rounded-2xl flex flex-col items-center justify-center text-center ${
      highlight
        ? "bg-white text-orange-500"
        : "bg-white/20 text-white"
    }`}
  >
    <span className="text-2xl font-bold">{value}</span>
    <span className="text-xs">{label}</span>
  </div>
);

const Tab = ({ text, icon, active }) => (
  <button
    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition ${
      active
        ? "bg-purple-600 text-white shadow"
        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
    }`}
  >
    <span>{icon}</span>
    {text}
  </button>
);

export default UserProfile;
