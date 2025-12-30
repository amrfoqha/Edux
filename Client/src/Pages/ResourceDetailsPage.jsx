import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getResource,
  downloadAll,
  updateResourceAverageRating,
} from "../API/ResouceAPI";
import Footer from "../Components/Footer";
import { Button } from "../Components/ui/button";
import { ArrowLeft, Download, Flag, Heart, Share2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { addToFavoriteResource } from "../API/FavoriteResourceAPI";
import { useAuth } from "../Hooks/useAuth";
import { getAllFavoritesByUserId } from "../API/FavoriteResourceAPI";
import { removeFromFavoriteResource } from "../API/FavoriteResourceAPI";
import { addReview, getReviewsByResourceId } from "../API/ReviewAPI";
import { Link } from "react-router-dom";
import { Progress } from "../components/ui/Progress";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Textarea } from "../Components/ui/TextArea";

const ResourceDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState([
    { stars: 1, count: 0, percentage: 0 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 4, count: 0, percentage: 0 },
    { stars: 5, count: 0, percentage: 0 },
  ]);

  const calculateRatingAvg = (reviews) => {
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    setAvgRating(
      totalReviews ? Number(totalRating / totalReviews).toFixed(1) : 0
    );
  };

  const handleSubmitReview = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const reviewData = {
      user: user._id,
      resource: id,
      rating,
      comment,
    };

    try {
      const result = await addReview(reviewData);
      setReviews([...reviews, result]);
      calculateRatingDistribution(reviews);
      await updateResourceAverageRating(id, avgRating);
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  };

  const calculateRatingDistribution = (reviews) => {
    const totalReviews = reviews?.length || 0;

    const distribution = [1, 2, 3, 4, 5].map((star) => {
      const count = reviews.filter((r) => r.rating === star).length;
      return {
        stars: star,
        count,
        percentage: totalReviews ? (count / totalReviews) * 100 : 0,
      };
    });

    setRatingDistribution(distribution);
  };

  useEffect(() => {
    calculateRatingDistribution(reviews);
    calculateRatingAvg(reviews);
  }, [reviews]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByResourceId(id);
        setReviews(data);
        calculateRatingDistribution(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getAllFavoritesByUserId(user?._id);
        const isFavorite = favorites.some(
          (favorite) => favorite.resource._id === id
        );
        setIsFavorite(isFavorite);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [user?._id]);

  const addToFavorite = async (resourceId) => {
    if (isFavorite) {
      console.log(resourceId);
      setIsFavorite(false);
      try {
        const data = {
          resourceId,
          userId: user?._id,
        };
        await removeFromFavoriteResource(data);
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
      return;
    }
    try {
      await addToFavoriteResource(resourceId, user._id);
      console.log("Favorite added successfully");
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const data = await getResource(id);
        setResource(data);
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    };
    fetchResource();
  }, [id]);

  if (!resource) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className=" min-h-screen bg-gray-50">
      <div className="container mx-auto flex items-center justify-start">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigate("/browse")}
          className="ml-38 w-48 hover:bg-primary/20 mt-5"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Browse
        </Button>
      </div>
      <main className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="bg-white rounded-3xl shadow p-8">
          <span className="inline-block mb-3 px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
            {resource.type}
          </span>

          <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>

          <p className="text-gray-500 mb-4">
            {resource.university} • {resource.faculty} • {resource.department}
          </p>
          <p className="text-gray-500 mb-4">
            {resource.createdAt.toString().split("T")[0]}
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            ⭐ {avgRating} ({reviews.length} reviews)
            <span>•</span>
            📥 {resource.downloads || 0} downloads
          </div>
          <div className="space-y-4 border-t-2 pt-4 mt-4">
            <h3 className="text-2xl font-semibold">Description</h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              {resource.description}
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-2xl font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {resource.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-sm px-4 py-2"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 p-6 bg-muted/50 rounded-xl">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary text-white text-xl">
                {resource.uploader.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">
                Uploaded by {resource.uploader.name}
              </p>
              <p className="text-muted-foreground">Verified Contributor</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="px-8 py-6 text-base"
              onClick={() => downloadAll(resource._id, resource.title)}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Resource
            </Button>
            {/* 
            <Link
              to={`http://localhost:8000/api/resources/${resource._id}/download-all`}
              target="_blank"
              className="px-8 py-6 text-base"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Resource{" "}
            </Link> */}

            <Button
              size="lg"
              variant={isFavorite ? "secondary" : "outline"}
              onClick={() => {
                if(!user)navigate("/login");
                addToFavorite(resource._id);
              }}
              className="px-8 py-6 text-base"
            >
              <Heart
                className={`h-5 w-5 mr-2 ${isFavorite ? "fill-current" : ""}`}
              />
              {isFavorite ? "Saved" : "Save"}
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-base">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="mb-16 mt-10">
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-8 md:p-12">
              <CardTitle className="text-3xl">Reviews & Ratings</CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-12 space-y-12">
              {/* Rating Overview */}
              <div className="space-y-8">
                <div className="text-center py-8">
                  <div className="text-6xl font-bold mb-4">{avgRating}</div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          star <= avgRating
                            ? "fill-accent text-accent"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-lg">
                    {reviews.length} reviews
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  {ratingDistribution.map(({ stars, count, percentage }) => (
                    <div key={stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-16">
                        <span className="font-medium">{stars}</span>
                        <Star className="h-4 w-4 fill-accent text-accent" />
                      </div>
                      <Progress value={percentage} className="flex-grow" />
                      <span className="text-muted-foreground w-12 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Review */}
              <div className="border-t pt-12 space-y-8">
                <h4 className="text-2xl font-semibold">Write a Review</h4>

                <div className="space-y-3">
                  <label className="text-muted-foreground">Your Rating</label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? "fill-accent text-accent"
                              : "text-muted"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-muted-foreground">Your Review</label>
                  <Textarea
                    placeholder="Share your thoughts about this resource..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    className="text-base"
                  />
                </div>

                <Button
                  onClick={handleSubmitReview}
                  disabled={rating === 0}
                  size="lg"
                  className="px-8"
                >
                  Submit Review
                </Button>
              </div>

              {/* Review List */}
              <div className="border-t pt-12 space-y-8">
                <h4 className="text-2xl font-semibold mb-8">Student Reviews</h4>
                {reviews.map((review) => (
                  <div key={review._id} className="pb-8 border-b last:border-0">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {review.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-lg">
                            {review.user.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {review.createdAt.toString().split("T")[0]}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= review.rating
                                  ? "fill-accent text-accent"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResourceDetailsPage;
