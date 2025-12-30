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
                        EDUx is a student-driven platform revolutionizing how
                        university students access, share, and collaborate on educational
                        resources.
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
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <img
                        src={"https://images.unsplash.com/photo-1764079833254-a14555e35d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"}
                        alt="Our Mission"
                        className="rounded-3xl shadow-lg"
                    />

                    <div>
                        <h2 className="text-3xl font-bold text-purple-600 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We believe that education should be accessible to everyone.
                            EDUx was founded by students, for students, with a vision
                            to create a collaborative learning environment where knowledge
                            flows freely and everyone has the opportunity to excel.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our platform leverages cutting-edge AI technology to provide
                            personalized recommendations, making it easier than ever to find
                            the resources you need to succeed in your academic journey.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gray-50 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-4">
                        Why Choose EDUx?
                    </h2>
                    <p className="text-gray-500 mb-12">
                        Experience a modern approach to academic resource sharing
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Feature
                            title="Vast Resource Library"
                            desc="Access thousands of textbooks, lecture slides, video courses, and past exams shared by students worldwide."
                        />
                        <Feature
                            title="AI-Powered Recommendations"
                            desc="Get personalized resource suggestions based on your study patterns and academic interests."
                        />
                        <Feature
                            title="Real-Time Collaboration"
                            desc="Connect with peers through our integrated chat system and collaborate on difficult subjects."
                        />
                        <Feature
                            title="Verified Content"
                            desc="All resources are verified by our community and rated for quality and accuracy."
                        />
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                    <p className="text-gray-500 mb-12">
                        The principles that guide everything we do
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        <Value title="Innovation" desc="Constantly evolving our platform with cutting-edge technology to enhance learning experiences." />
                        <Value title="Community" desc="Building a supportive academic community where everyone helps each other succeed." />
                        <Value title="Excellence" desc="Maintaining the highest standards of quality in every resource shared on our platform." />
                        <Value title="Growth" desc="Encouraging continuous personal and academic growth for each student." />
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 py-20 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Transform Your Learning?
                </h2>
                <p className="mb-8">
                    Join thousands of students who are already benefiting from our
                    collaborative learning platform.
                </p>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
                    Join EDUx Today
                </button>
            </section>

            <Footer />
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
