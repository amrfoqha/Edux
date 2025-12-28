import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getResource } from "../API/ResouceAPI";
import Footer from "../Components/Footer";

const ResourceDetailsPage = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      const data = await getResource(id);
      setResource(data);
    };
    fetchResource();
  }, [id]);

  if (!resource) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="bg-white rounded-3xl shadow p-8">
          <span className="inline-block mb-3 px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
            {resource.type}
          </span>

          <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>

          <p className="text-gray-500 mb-4">
            {resource.university} • {resource.department}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            ⭐ {resource.rating || "4.9"} ({resource.reviewsCount || 0} reviews)
            <span>•</span>
            📥 {resource.downloads || 0} downloads
          </div>

          <div className="flex gap-3 mt-6">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700">
              Download Resource
            </button>
            <button className="border px-6 py-2 rounded-xl">Save</button>
            <button className="border px-6 py-2 rounded-xl">Share</button>
          </div>
        </div>

        <section className="bg-white rounded-3xl shadow p-8 mt-8">
          <h2 className="text-xl font-bold mb-3">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {resource.description || "No description provided."}
          </p>

          <div className="flex gap-2 mt-4 flex-wrap">
            {resource.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-gray-100 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow p-8 mt-8">
          <h2 className="text-xl font-bold mb-6">Reviews & Ratings</h2>

          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600">4.9</p>
            <p className="text-sm text-gray-500">Based on student reviews</p>
          </div>

          <div className="mt-6 text-center text-gray-400">
            Reviews system coming soon 🚀
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow p-8 mt-8">
          <h2 className="text-xl font-bold mb-4">Related Resources</h2>
          <p className="text-gray-500 text-sm">
            Suggested resources based on this content
          </p>

          <div className="mt-4 space-y-3">
            <div className="border rounded-xl p-4">
              Introduction to Algorithms – Lecture Notes
            </div>
            <div className="border rounded-xl p-4">
              Data Structures – Exam Papers
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow p-8 mt-8 mb-20">
          <h2 className="text-xl font-bold mb-4">Need Help?</h2>
          <button className="border px-4 py-2 rounded-xl mr-3">
            Message uploader
          </button>
          <button className="border px-4 py-2 rounded-xl">Report issue</button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ResourceDetailsPage;
