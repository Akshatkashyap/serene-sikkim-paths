import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageCircle, ThumbsUp, Eye, X } from "lucide-react";

interface Rating {
  userId: string;
  userName: string;
  rating: number;
  timestamp: Date;
  review?: string;
  helpful: number;
  isHelpful: boolean;
}

interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

interface MonasteryRatingProps {
  monasteryId: string;
  monasteryName: string;
}

const MonasteryRating = ({
  monasteryId,
  monasteryName,
}: MonasteryRatingProps) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [ratingBreakdown, setRatingBreakdown] = useState<RatingBreakdown>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [userReview, setUserReview] = useState<string>("");
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [displayedReviews, setDisplayedReviews] = useState<number>(3);
  const [showReviewsModal, setShowReviewsModal] = useState<boolean>(false);

  const loadRatingsFromStorage = useCallback(() => {
    // Load all ratings for this monastery
    const allRatings = localStorage.getItem(`ratings_${monasteryId}`);
    if (allRatings) {
      const parsedRatings: Rating[] = JSON.parse(allRatings).map(
        (r: Rating & { timestamp: string }) => ({
          ...r,
          timestamp: new Date(r.timestamp),
        }),
      );
      setRatings(parsedRatings);
      calculateRatingBreakdown(parsedRatings);
    } else {
      // Initialize with mock data
      const mockRatings: Rating[] = [
        {
          userId: "user1",
          userName: "Tenzin Lhamo",
          rating: 5,
          timestamp: new Date(2024, 0, 15),
          review:
            "An absolutely transformative spiritual experience. The morning prayers filled my heart with peace, and the monks were incredibly welcoming. The architecture is breathtaking and the mountain views are divine.",
          helpful: 12,
          isHelpful: false,
        },
        {
          userId: "user2",
          userName: "Sarah Mitchell",
          rating: 4,
          timestamp: new Date(2024, 1, 3),
          review:
            "Beautiful monastery with rich history. The guided tour was informative and the meditation session was very calming. Only downside was the challenging trek to reach here.",
          helpful: 8,
          isHelpful: true,
        },
        {
          userId: "user3",
          userName: "Karma Dorje",
          rating: 5,
          timestamp: new Date(2024, 1, 18),
          review:
            "As a local, I've watched this monastery preserve our culture beautifully. The festival celebrations here are magical and the community spirit is strong.",
          helpful: 15,
          isHelpful: false,
        },
        {
          userId: "user4",
          userName: "Michael Rodriguez",
          rating: 5,
          timestamp: new Date(2024, 2, 5),
          review:
            "Incredible architecture and serene atmosphere. The monks shared fascinating insights about Buddhist philosophy. A must-visit for anyone seeking spiritual enlightenment.",
          helpful: 9,
          isHelpful: false,
        },
        {
          userId: "user5",
          userName: "Pema Sherpa",
          rating: 4,
          timestamp: new Date(2024, 2, 22),
          review:
            "The monastery is well-maintained and the prayer halls are magnificent. The butter tea served by the monks was delicious! Great place for photography too.",
          helpful: 6,
          isHelpful: false,
        },
        {
          userId: "user6",
          userName: "Jennifer Lee",
          rating: 5,
          timestamp: new Date(2024, 3, 8),
          review:
            "Life-changing experience! The meditation retreat here helped me find inner peace. The natural surroundings and spiritual energy are unmatched.",
          helpful: 11,
          isHelpful: false,
        },
        {
          userId: "user7",
          userName: "Norbu Tashi",
          rating: 4,
          timestamp: new Date(2024, 3, 25),
          review:
            "Rich cultural heritage preserved beautifully. The ancient artifacts and manuscripts in the library are fascinating. Highly recommended for history enthusiasts.",
          helpful: 7,
          isHelpful: false,
        },
        {
          userId: "user8",
          userName: "David Wilson",
          rating: 5,
          timestamp: new Date(2024, 4, 12),
          review:
            "The sunrise view from the monastery is absolutely stunning. Combined with the morning prayers, it creates an unforgettable spiritual moment. Will definitely return!",
          helpful: 10,
          isHelpful: false,
        },
      ];
      setRatings(mockRatings);
      calculateRatingBreakdown(mockRatings);
      localStorage.setItem(
        `ratings_${monasteryId}`,
        JSON.stringify(mockRatings),
      );
    }

    // Check if current user has already rated
    const currentUserId = getCurrentUserId();
    const userHasRated = localStorage.getItem(
      `user_rated_${monasteryId}_${currentUserId}`,
    );
    if (userHasRated) {
      setHasRated(true);
      setUserRating(parseInt(userHasRated));
    }
  }, [monasteryId]);

  // Load data from localStorage on component mount
  useEffect(() => {
    loadRatingsFromStorage();
  }, [loadRatingsFromStorage]);

  const calculateRatingBreakdown = (ratings: Rating[]) => {
    const breakdown: RatingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach((rating) => {
      breakdown[rating.rating as keyof RatingBreakdown]++;
    });
    setRatingBreakdown(breakdown);
  };

  const getCurrentUserId = () => {
    let userId = localStorage.getItem("currentUserId");
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("currentUserId", userId);
    }
    return userId;
  };

  const getCurrentUserName = () => {
    let userName = localStorage.getItem("currentUserName");
    if (!userName) {
      const names = [
        "Alex K.",
        "Sam P.",
        "Jordan T.",
        "Casey M.",
        "Riley S.",
        "Avery L.",
      ];
      userName = names[Math.floor(Math.random() * names.length)];
      localStorage.setItem("currentUserName", userName);
    }
    return userName;
  };

  const handleRatingSubmit = (rating: number) => {
    if (hasRated) return;

    const currentUserId = getCurrentUserId();
    const currentUserName = getCurrentUserName();

    const newRating: Rating = {
      userId: currentUserId,
      userName: currentUserName,
      rating,
      timestamp: new Date(),
      review: userReview.trim(),
      helpful: 0,
      isHelpful: false,
    };

    const updatedRatings = [...ratings, newRating];
    setRatings(updatedRatings);
    setUserRating(rating);
    setHasRated(true);
    setUserReview("");
    calculateRatingBreakdown(updatedRatings);

    // Save to localStorage
    localStorage.setItem(
      `ratings_${monasteryId}`,
      JSON.stringify(updatedRatings),
    );
    localStorage.setItem(
      `user_rated_${monasteryId}_${currentUserId}`,
      rating.toString(),
    );
  };

  const getAverageRating = () => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / ratings.length;
  };

  const getTotalRatings = () => ratings.length;

  const toggleHelpful = (ratingId: string) => {
    const updatedRatings = ratings.map((rating) =>
      rating.userId === ratingId
        ? {
            ...rating,
            isHelpful: !rating.isHelpful,
            helpful: rating.isHelpful ? rating.helpful - 1 : rating.helpful + 1,
          }
        : rating,
    );
    setRatings(updatedRatings);
    localStorage.setItem(
      `ratings_${monasteryId}`,
      JSON.stringify(updatedRatings),
    );
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLoadMoreReviews = () => {
    setDisplayedReviews((prev) =>
      Math.min(prev + 3, ratings.filter((r) => r.review).length),
    );
  };

  const reviewsWithText = ratings.filter(
    (rating) => rating.review && rating.review.trim().length > 0,
  );
  const visibleReviews = reviewsWithText.slice(0, displayedReviews);
  const hasMoreReviews = displayedReviews < reviewsWithText.length;

  const averageRating = getAverageRating();
  const totalRatings = getTotalRatings();

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isFilled = interactive
        ? (hoveredRating || userRating) >= starNumber
        : rating >= starNumber;

      return (
        <Star
          key={index}
          className={`h-5 w-5 cursor-pointer transition-colors duration-200 ${
            isFilled
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 hover:text-yellow-400"
          }`}
          onClick={
            interactive ? () => handleRatingSubmit(starNumber) : undefined
          }
          onMouseEnter={
            interactive ? () => setHoveredRating(starNumber) : undefined
          }
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        />
      );
    });
  };

  return (
    <Card className="soft-shadow">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          Visitor Ratings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating Display */}
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-foreground">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center items-center gap-1">
            {renderStars(averageRating)}
          </div>
          <p className="text-sm text-muted-foreground">
            Based on {totalRatings} {totalRatings === 1 ? "review" : "reviews"}
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm font-medium">{star}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
              <Progress
                value={
                  totalRatings > 0
                    ? (ratingBreakdown[star as keyof RatingBreakdown] /
                        totalRatings) *
                      100
                    : 0
                }
                className="flex-1 h-2"
              />
              <span className="text-xs text-muted-foreground w-8">
                {ratingBreakdown[star as keyof RatingBreakdown]}
              </span>
            </div>
          ))}
        </div>

        {/* User Rating Section */}
        <div className="border-t pt-4">
          {hasRated ? (
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-green-600">
                Thank you for your rating!
              </p>
              <div className="flex justify-center items-center gap-1">
                <span className="text-sm text-muted-foreground">
                  Your rating:
                </span>
                {renderStars(userRating)}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-center">
                Rate your experience:
              </p>
              <div className="flex justify-center items-center gap-1">
                {renderStars(0, true)}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Click on stars to rate •{" "}
                {hoveredRating > 0 &&
                  `${hoveredRating} star${hoveredRating > 1 ? "s" : ""}`}
              </p>
              {hoveredRating > 0 && (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Share your experience (optional)..."
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    className="min-h-[80px] text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Help other visitors by sharing what you enjoyed most about
                    your visit
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recent Ratings */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Recent Reviews</h4>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {ratings
              .slice(-3)
              .reverse()
              .map((rating, index) => (
                <div
                  key={`${rating.userId}-${index}`}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{rating.userName}</span>
                    <div className="flex gap-0.5">
                      {renderStars(rating.rating)}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {rating.timestamp.toLocaleDateString()}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* View All Reviews Section */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Visitor Reviews
              <Badge variant="secondary" className="text-xs">
                {reviewsWithText.length}
              </Badge>
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReviewsModal(true)}
              className="text-monastery-red hover:bg-monastery-red hover:text-white border-monastery-red"
            >
              <Eye className="h-4 w-4 mr-1" />
              View All Reviews ({reviewsWithText.length})
            </Button>

            {/* Reviews Modal */}
            {showReviewsModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="fixed inset-0 bg-black/50"
                  onClick={() => setShowReviewsModal(false)}
                />
                <div className="relative bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-lg">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">
                          All Reviews for {monasteryName}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {reviewsWithText.length} detailed visitor reviews
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowReviewsModal(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-[70vh] p-6 space-y-4">
                    {reviewsWithText.length > 0 ? (
                      reviewsWithText.map((rating) => (
                        <div
                          key={rating.userId}
                          className="border-b pb-4 last:border-b-0"
                        >
                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-monastery-red/10 text-monastery-red">
                                {getInitials(rating.userName)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">
                                  {rating.userName}
                                </span>
                                <div className="flex">
                                  {renderStars(rating.rating)}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(rating.timestamp)}
                                </span>
                              </div>
                              {rating.review && (
                                <p className="text-sm text-muted-foreground mb-2">
                                  {rating.review}
                                </p>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleHelpful(rating.userId)}
                                className="h-auto p-1 text-xs"
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Helpful ({rating.helpful})
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No reviews yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview of recent reviews */}
          {reviewsWithText.length > 0 ? (
            <div className="space-y-3">
              {reviewsWithText.slice(0, 2).map((rating) => (
                <div
                  key={rating.userId}
                  className="border rounded-lg p-3 bg-muted/30"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Avatar className="h-6 w-6 flex-shrink-0">
                      <AvatarFallback className="text-xs bg-monastery-red/10 text-monastery-red">
                        {getInitials(rating.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-xs">
                            {rating.userName}
                          </span>
                          <div className="flex items-center gap-1">
                            {renderStars(rating.rating)}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(rating.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {rating.review && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {rating.review.length > 120
                        ? `${rating.review.substring(0, 120)}...`
                        : rating.review}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No detailed reviews available yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonasteryRating;
