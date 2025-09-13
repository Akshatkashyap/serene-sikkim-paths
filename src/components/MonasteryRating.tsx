import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface Rating {
  userId: string;
  userName: string;
  rating: number;
  timestamp: Date;
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

const MonasteryRating = ({ monasteryId, monasteryName }: MonasteryRatingProps) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [ratingBreakdown, setRatingBreakdown] = useState<RatingBreakdown>({
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    loadRatingsFromStorage();
  }, [monasteryId]);

  const loadRatingsFromStorage = () => {
    // Load all ratings for this monastery
    const allRatings = localStorage.getItem(`ratings_${monasteryId}`);
    if (allRatings) {
      const parsedRatings: Rating[] = JSON.parse(allRatings).map((r: any) => ({
        ...r,
        timestamp: new Date(r.timestamp)
      }));
      setRatings(parsedRatings);
      calculateRatingBreakdown(parsedRatings);
    } else {
      // Initialize with mock data
      const mockRatings: Rating[] = [
        { userId: "user1", userName: "Tenzin L.", rating: 5, timestamp: new Date(2024, 0, 15) },
        { userId: "user2", userName: "Sarah M.", rating: 4, timestamp: new Date(2024, 1, 3) },
        { userId: "user3", userName: "Karma D.", rating: 5, timestamp: new Date(2024, 1, 18) },
        { userId: "user4", userName: "Michael R.", rating: 5, timestamp: new Date(2024, 2, 5) },
        { userId: "user5", userName: "Pema S.", rating: 4, timestamp: new Date(2024, 2, 22) },
        { userId: "user6", userName: "Jennifer L.", rating: 5, timestamp: new Date(2024, 3, 8) },
        { userId: "user7", userName: "Norbu T.", rating: 4, timestamp: new Date(2024, 3, 25) },
        { userId: "user8", userName: "David W.", rating: 5, timestamp: new Date(2024, 4, 12) },
      ];
      setRatings(mockRatings);
      calculateRatingBreakdown(mockRatings);
      localStorage.setItem(`ratings_${monasteryId}`, JSON.stringify(mockRatings));
    }

    // Check if current user has already rated
    const currentUserId = getCurrentUserId();
    const userHasRated = localStorage.getItem(`user_rated_${monasteryId}_${currentUserId}`);
    if (userHasRated) {
      setHasRated(true);
      setUserRating(parseInt(userHasRated));
    }
  };

  const calculateRatingBreakdown = (ratings: Rating[]) => {
    const breakdown: RatingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach(rating => {
      breakdown[rating.rating as keyof RatingBreakdown]++;
    });
    setRatingBreakdown(breakdown);
  };

  const getCurrentUserId = () => {
    let userId = localStorage.getItem('currentUserId');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('currentUserId', userId);
    }
    return userId;
  };

  const getCurrentUserName = () => {
    let userName = localStorage.getItem('currentUserName');
    if (!userName) {
      const names = ['Alex K.', 'Sam P.', 'Jordan T.', 'Casey M.', 'Riley S.', 'Avery L.'];
      userName = names[Math.floor(Math.random() * names.length)];
      localStorage.setItem('currentUserName', userName);
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
      timestamp: new Date()
    };

    const updatedRatings = [...ratings, newRating];
    setRatings(updatedRatings);
    setUserRating(rating);
    setHasRated(true);
    calculateRatingBreakdown(updatedRatings);

    // Save to localStorage
    localStorage.setItem(`ratings_${monasteryId}`, JSON.stringify(updatedRatings));
    localStorage.setItem(`user_rated_${monasteryId}_${currentUserId}`, rating.toString());
  };

  const getAverageRating = () => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / ratings.length;
  };

  const getTotalRatings = () => ratings.length;

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
          onClick={interactive ? () => handleRatingSubmit(starNumber) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(starNumber) : undefined}
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
            Based on {totalRatings} {totalRatings === 1 ? 'review' : 'reviews'}
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
                value={totalRatings > 0 ? (ratingBreakdown[star as keyof RatingBreakdown] / totalRatings) * 100 : 0} 
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
              <p className="text-sm font-medium text-green-600">Thank you for your rating!</p>
              <div className="flex justify-center items-center gap-1">
                <span className="text-sm text-muted-foreground">Your rating:</span>
                {renderStars(userRating)}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-sm font-medium">Rate your experience:</p>
              <div className="flex justify-center items-center gap-1">
                {renderStars(0, true)}
              </div>
              <p className="text-xs text-muted-foreground">
                Click on stars to rate • {hoveredRating > 0 && `${hoveredRating} star${hoveredRating > 1 ? 's' : ''}`}
              </p>
            </div>
          )}
        </div>

        {/* Recent Ratings */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Recent Reviews</h4>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {ratings.slice(-3).reverse().map((rating, index) => (
              <div key={`${rating.userId}-${index}`} className="flex items-center justify-between text-sm">
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
          {totalRatings > 3 && (
            <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
              View All {totalRatings} Reviews
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonasteryRating;