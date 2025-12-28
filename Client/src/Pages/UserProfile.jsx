import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UploadForm } from "../Components/UploadForm";
import FavoriteForm from "../Components/FavoriteForm";
import ChatForm from "../Components/ChatForm";
import AiPicksForm from "../Components/AiPicksForm";
import { useAuth } from "../Hooks/useAuth";
import { getCurrentUser } from "../API/UserAPI";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("uploads");
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [refresh]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <main className="grow">
        {/* Top Profile Section */}
        <section className="container mx-auto px-6 mt-8 flex flex-col">
          <div className="bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 relative rounded-t-3xl w-full h-[150px]">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 2px, transparent 2px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="rounded-3xl p-6 pl-8 shadow-xl text-white">
            <div className="flex flex-col md:flex-row items-center gap-8 relative">
              {/* Avatar */}
              <div className="absolute bottom-6 left-0 hover:scale-105 transition">
                <div
                  className="w-36 h-36 rounded-full bg-white/20 flex items-center justify-center 
                text-5xl font-semibold bg-linear-to-r from-purple-500 via-pink-500 to-orange-400  border-4 border-white shadow-[.5px_.5px_20px_0_gray] "
                >
                  U
                </div>
                <span className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white">
                  {/* for Active Status  */}
                </span>
              </div>

              {/* User Info */}
              <div className="flex-1 ml-42">
                <h1 className="text-5xl font-semibold bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  {user?.name}
                </h1>

                <div className="flex flex-wrap gap-2 mt-3  ">
                  <Badge
                    text={user?.university}
                    BackColor="bg-secondary"
                    color="text-white"
                  />
                  <Badge text={user?.faculty} />
                  <Badge text={user?.department} />
                </div>
                <p className="opacity-90 text-xl text-secondary mt-2">
                  {user?.email}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-4   ">
                <StatCard
                  label="Uploads"
                  value={user?.resources?.length}
                  highlight
                />
                <StatCard label="Favorites" value="0" highlight />
                <StatCard label="Downloads" value="128" highlight />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="container mx-auto px-6 mt-6 ">
          <div className=" bg-white rounded-2xl shadow-sm border border-gray-100 py-2 px-1  flex justify-evenly w-130 ">
            <Tab
              active={activeTab === "uploads"}
              text="My Uploads"
              icon="⬆️"
              onClick={() => setActiveTab("uploads")}
            />
            <Tab
              active={activeTab === "favorites"}
              text="Favorites"
              icon="❤️"
              onClick={() => setActiveTab("favorites")}
            />
            <Tab
              active={activeTab === "chat"}
              text="Chat"
              icon="💬"
              onClick={() => setActiveTab("chat")}
            />
            <Tab
              active={activeTab === "ai-picks"}
              text="AI Picks"
              icon="✨"
              onClick={() => setActiveTab("ai-picks")}
            />
          </div>
        </section>

        {/* ===== Content ===== */}
        <motion.section
          initial={{ opacity: 0, y: -20, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "uploads" && (
            <UploadForm refresh={refresh} setRefresh={setRefresh} />
          )}
          {activeTab === "favorites" && <FavoriteForm />}
          {activeTab === "chat" && <ChatForm />}
          {activeTab === "ai-picks" && <AiPicksForm />}
        </motion.section>
      </main>
    </div>
  );
};

const Badge = ({ text, BackColor = "bg-white/20", color = "text-black" }) => (
  <span
    className={`px-3 py-1 ${BackColor} rounded-full text-md font-semibold border border-gray-200 ${color}`}
  >
    {text}
  </span>
);

const StatCard = ({ label, value }) => (
  <div
    className={`flex flex-col w-26 items-center justify-center text-center bg-gradient-to-br from-accent/25 to-accent/10 p-4 rounded-2xl 
      hover:bg-accent/10 transition hover:scale-105`}
  >
    <span className="text-4xl font-semibold text-accent mb-1">{value}</span>
    <span className="text-sm text-muted-foreground font-medium">{label}</span>
  </div>
);

const Tab = ({ text, icon, active, onClick }) => (
  <button
    className={`flex items-center gap-2 px-3 py-2 rounded-md  text-lg font-semibold transition-all duration-300 ease-in-out ${
      active
        ? "bg-purple-600 text-white shadow"
        : "bg-white text-gray-600 hover:bg-gray-50"
    }`}
    onClick={onClick}
  >
    <span>{icon}</span>
    {text}
  </button>
);

export default UserProfile;
