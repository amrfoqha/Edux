import React, { useEffect, useState } from "react";
import { getAllFavoritesByUserId } from "../API/FavoriteResourceAPI";
import { useAuth } from "../Hooks/useAuth";
import { ResourceCard } from "./shared/ResourceCard";
import { useNavigate } from "react-router-dom";

const FavoriteForm = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await getAllFavoritesByUserId(user._id);
        console.log(res);
        setFavorites(res);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [user._id]);
  return (
    <section className="container mx-auto px-6 mt-10 mb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Favorite Resources
          </h2>
          <p className="text-gray-500 text-sm">Your saved collection</p>
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="pb-6 p-16 text-center">
            <div className="bg-linear-to-br from-secondary to-accent p-6 rounded-3xl inline-flex mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart h-16 w-16 text-white"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">No favorites yet</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Start exploring and save your favorite resources
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md has-[&gt;svg]:px-4 px-8"
            >
              Browse Resources
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites?.map((favorite) => {
            return (
              <ResourceCard
                key={favorite._id}
                resource={favorite.resource}
                onClick={() => navigate(`/resources/${favorite.resource._id}`)}
                className=""
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FavoriteForm;
