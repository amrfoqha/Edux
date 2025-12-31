import Footer from "../Components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <section className="bg-gradient-to-b from-purple-50 to-pink-50 py-24 text-center">
        <div className="container mx-auto px-6">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full">
            About EDUx
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Empowering Students <br />
            Through{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Shared Knowledge
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600">
            EDUx is a student-driven platform revolutionizing how university
            students access, share, and collaborate on educational resources.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
              Get Started Free
            </button>
            <button className="bg-white border border-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Explore Resources
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat number="50K+" label="Active Students" />
            <Stat number="100K+" label="Resources Shared" />
            <Stat number="500+" label="Universities" />
            <Stat number="4.8/5" label="Average Rating" />
          </div>
        </div>

  );
};

const Stat = ({ number, label }) => (
  <div>
    <p className="text-3xl font-extrabold text-purple-600">{number}</p>
    <p className="text-gray-500 text-sm">{label}</p>
  </div>
);

const Feature = ({ title, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{desc}</p>
  </div>
);

const Value = ({ title, desc }) => (
  <div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{desc}</p>
  </div>
);

export default AboutUs;
