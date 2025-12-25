import Header from '../Components/Header';
import Footer from '../Components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-grow">
        <section className="relative bg-gradient-to-br from-purple-50 via-white to-orange-50 py-16 md:py-24">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-8 text-left">
              <span className="inline-block px-4 py-1 bg-white shadow-sm rounded-full text-purple-600 font-medium text-sm border border-purple-100">
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Share <span className="text-purple-600">Knowledge</span>, <br /> 
                Excel Together
              </h1>
              <p className="text-gray-500 text-lg max-w-lg">
                Join thousands of students sharing textbooks, lecture slides, video courses, and exam materials. Learn smarter with AI-powered recommendations.
              </p>
              <div className="flex space-x-4">
                <button className="px-8 py-3 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-200 hover:bg-purple-700 transition">Get Started Free ✨</button>
                <button className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition">Browse Resources</button>
              </div>
              <div className="flex space-x-12 pt-8">
                <div><h3 className="text-2xl font-bold text-purple-600">50K+</h3><p className="text-gray-500 text-sm">Active Students</p></div>
                <div><h3 className="text-2xl font-bold text-pink-500">100K+</h3><p className="text-gray-500 text-sm">Resources</p></div>
                <div><h3 className="text-2xl font-bold text-orange-500">500+</h3><p className="text-gray-500 text-sm">Universities</p></div>
              </div>
            </div>

            <div className="md:w-1/2 mt-12 md:mt-0 relative">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                    <img src="/images/hero-students.jpg" alt="Students studying" className="w-full object-cover" />
                </div>

                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center space-x-3">
                    <div className="bg-pink-100 p-2 rounded-lg text-pink-600">📚</div>
                    <div><p className="text-xs text-gray-400">New Resources</p><p className="font-bold text-gray-800">1,234</p></div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600">👤</div>
                    <div><p className="text-xs text-gray-400">Active Now</p><p className="font-bold text-gray-800">5,876 Students</p></div>
                </div>
            </div>
          </div>

          <div className="container mx-auto px-6 mt-16">
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-wrap items-center gap-4">
               <div className="flex-grow flex items-center bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-gray-400 mr-2">🔍</span>
                  <input type="text" placeholder="Search resources..." className="bg-transparent outline-none w-full text-sm" />
               </div>
               <select className="bg-gray-50 p-3 rounded-xl text-sm text-gray-500 outline-none"><option>University</option></select>
               <select className="bg-gray-50 p-3 rounded-xl text-sm text-gray-500 outline-none"><option>Type</option></select>
               <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-3 rounded-xl font-bold hover:opacity-90 transition">Search</button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <FeatureCard icon="✨" title="AI Recommendations" desc="Personalized suggestions based on your courses" />
               <FeatureCard icon="👥" title="Real-Time Collaboration" desc="Chat with peers and form study groups" />
               <FeatureCard icon="🛡️" title="Verified Quality" desc="Peer-reviewed and community-rated content" />
               <FeatureCard icon="⚡" title="Instant Access" desc="Download resources immediately, anytime" />
            </div>

            <div className="flex flex-col md:flex-row items-center mt-24 gap-12">
                <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-lg">
                    <img src="/images/library.jpg" alt="Library" className="w-full h-80 object-cover" />
                </div>
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-4xl font-bold text-slate-900">Everything You Need <br/> To Excel Academically</h2>
                    <p className="text-gray-500">From textbooks to video courses, lecture slides to past exams - find all your study materials in one place.</p>
                    <ul className="space-y-3">
                        {['Smart Search & Filters', 'Instant Downloads', 'Quality Ratings', 'Study Groups'].map((item, i) => (
                            <li key={i} className="flex items-center text-gray-700 font-medium italic">
                                <span className="text-purple-500 mr-3 italic">⚡</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Trending Resources</h2>
                    <p className="text-gray-500">Most popular resources this week</p>
                </div>
                <button className="text-purple-600 font-semibold border border-purple-100 bg-white px-6 py-2 rounded-lg hover:bg-purple-50 transition">View All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ResourceCard tag="LECTURE NOTES" title="Introduction to Algorithms" school="MIT" rating="4.8" downloads="1,234" color="bg-purple-600" />
                <ResourceCard tag="VIDEO COURSE" title="Machine Learning Full Series" school="Stanford" rating="4.9" downloads="2,156" color="bg-pink-500" />
                <ResourceCard tag="PAST EXAM" title="Calculus I - Past Papers" school="Harvard" rating="4.6" downloads="892" color="bg-orange-500" />
                <ResourceCard tag="TEXTBOOK" title="Data Structures - 5th Edition" school="UC Berkeley" rating="4.7" downloads="1,567" color="bg-blue-500" />
            </div>
          </div>
        </section>

        <section className="mx-6 md:mx-auto container mb-20">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-[3rem] py-16 px-6 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
                    <p className="opacity-90 mb-10 max-w-xl mx-auto">Join thousands of students already sharing and learning together on EduX.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition">Create Free Account ✨</button>
                        <button className="bg-transparent border border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition">Explore Resources</button>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};


const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{desc}</p>
    </div>
);

const ResourceCard = ({ tag, title, school, rating, downloads, color }) => (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition group">
        <div className="h-40 bg-gray-200 relative overflow-hidden">
             <div className={`absolute top-3 left-3 ${color} text-white text-[10px] font-bold px-2 py-1 rounded-md z-10`}>
                {tag}
             </div>
             <div className="w-full h-full bg-slate-100 flex items-center justify-center text-4xl group-hover:scale-110 transition duration-500">📄</div>
        </div>
        <div className="p-5 space-y-3">
            <h3 className="font-bold text-gray-900 leading-tight h-10 overflow-hidden">{title}</h3>
            <p className="text-xs text-gray-400 font-medium">{school}</p>
            <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                <div className="flex items-center text-xs font-bold text-gray-700">
                    <span className="text-yellow-400 mr-1">⭐</span> {rating}
                </div>
                <div className="flex items-center text-xs text-gray-400">
                    <span className="mr-1">📥</span> {downloads}
                </div>
            </div>
        </div>
    </div>
);

export default HomePage;