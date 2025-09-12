import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Heart, Reply, Send, ThumbsUp } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
  tags?: string[];
}

interface MonasteryCommentsProps {
  monasteryId: string;
  monasteryName: string;
}

const MonasteryComments = ({
  monasteryId,
  monasteryName,
}: MonasteryCommentsProps) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [displayedComments, setDisplayedComments] = useState<number>(2); // Initially show 2 comments

  const loadCommentsFromStorage = useCallback(() => {
    const storageKey = `comments_${monasteryId}`;
    const savedComments = localStorage.getItem(storageKey);

    if (savedComments) {
      const parsedComments: Comment[] = JSON.parse(savedComments).map(
        (
          comment: Comment & {
            timestamp: string;
            replies?: (Comment & { timestamp: string })[];
          },
        ) => ({
          ...comment,
          timestamp: new Date(comment.timestamp),
          replies:
            comment.replies?.map((reply: Comment & { timestamp: string }) => ({
              ...reply,
              timestamp: new Date(reply.timestamp),
            })) || [],
        }),
      );
      setComments(parsedComments);
    } else {
      // Initialize with mock data
      const mockComments: Comment[] = [
        {
          id: "1",
          userId: "user1",
          userName: "Tenzin Norbu",
          content:
            "Absolutely breathtaking monastery! The morning prayers were a spiritual experience I'll never forget. The monks were incredibly welcoming and shared fascinating insights about Buddhist philosophy.",
          timestamp: new Date(2024, 3, 15, 10, 30),
          likes: 12,
          isLiked: false,
          tags: ["spiritual", "peaceful"],
          replies: [
            {
              id: "1-1",
              userId: "user2",
              userName: "Sarah Chen",
              content:
                "I had the same experience! The chanting during morning prayers was mesmerizing.",
              timestamp: new Date(2024, 3, 15, 14, 20),
              likes: 3,
              isLiked: false,
            },
          ],
        },
        {
          id: "2",
          userId: "user3",
          userName: "Michael Rodriguez",
          content:
            "Visited during the autumn festival - what an incredible celebration! The masked dances were spectacular and the community spirit was heartwarming. Don't miss this if you're visiting in October!",
          timestamp: new Date(2024, 3, 22, 16, 45),
          likes: 8,
          isLiked: true,
          tags: ["festival", "culture"],
        },
        {
          id: "3",
          userId: "user4",
          userName: "Pema Lhamo",
          content:
            "As a local, I've been coming here since childhood. It's wonderful to see how well-preserved everything is and how respectfully visitors behave. The 3D virtual tour is a great addition!",
          timestamp: new Date(2024, 4, 5, 9, 15),
          likes: 15,
          isLiked: false,
          tags: ["local", "heritage"],
        },
        {
          id: "4",
          userId: "user5",
          userName: "Jennifer Smith",
          content:
            "The trek here was challenging but so worth it! Amazing views and the monastery itself is like stepping back in time. Bring warm clothes - it gets cold even in summer!",
          timestamp: new Date(2024, 4, 18, 11, 30),
          likes: 6,
          isLiked: false,
          tags: ["trekking", "adventure"],
        },
        {
          id: "5",
          userId: "user6",
          userName: "David Kim",
          content:
            "The monastery library has an incredible collection of ancient texts. Spent hours there learning about Buddhist philosophy. A must-visit for anyone interested in spiritual studies.",
          timestamp: new Date(2024, 4, 25, 14, 10),
          likes: 9,
          isLiked: false,
          tags: ["books", "philosophy"],
        },
        {
          id: "6",
          userId: "user7",
          userName: "Maria Santos",
          content:
            "Visited during sunset - the golden light on the monastery walls was absolutely magical! Perfect timing for photography. The evening prayers added to the serene atmosphere.",
          timestamp: new Date(2024, 5, 2, 18, 45),
          likes: 22,
          isLiked: true,
          tags: ["photography", "sunset"],
        },
        {
          id: "7",
          userId: "user8",
          userName: "Lobsang Tashi",
          content:
            "Being a monk here for 15 years, I'm grateful to see how visitors appreciate our traditions. Your respectful behavior and genuine interest in our practices brings us joy.",
          timestamp: new Date(2024, 5, 10, 8, 30),
          likes: 35,
          isLiked: false,
          tags: ["monk", "gratitude", "tradition"],
        },
        {
          id: "8",
          userId: "user9",
          userName: "Emma Johnson",
          content:
            "The meditation session was life-changing. I've never experienced such inner peace before. Planning to come back next year for a longer retreat.",
          timestamp: new Date(2024, 5, 18, 11, 20),
          likes: 18,
          isLiked: false,
          tags: ["meditation", "peace"],
        },
      ];
      setComments(mockComments);
      localStorage.setItem(storageKey, JSON.stringify(mockComments));
    }
  }, [monasteryId]);

  useEffect(() => {
    loadCommentsFromStorage();
  }, [loadCommentsFromStorage]);

  const saveCommentsToStorage = (updatedComments: Comment[]) => {
    const storageKey = `comments_${monasteryId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
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
        "Alex Kumar",
        "Sam Patel",
        "Jordan Thompson",
        "Casey Martinez",
        "Riley Singh",
        "Avery Lee",
      ];
      userName = names[Math.floor(Math.random() * names.length)];
      localStorage.setItem("currentUserName", userName);
    }
    return userName;
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: getCurrentUserId(),
      userName: getCurrentUserName(),
      content: newComment.trim(),
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: [],
      tags: [],
    };

    const updatedComments = [newCommentObj, ...comments];
    setComments(updatedComments);
    saveCommentsToStorage(updatedComments);
    setNewComment("");
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const newReply: Comment = {
      id: `${parentId}_reply_${Date.now()}`,
      userId: getCurrentUserId(),
      userName: getCurrentUserName(),
      content: replyContent.trim(),
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    saveCommentsToStorage(updatedComments);
    setReplyContent("");
    setReplyTo(null);
  };

  const toggleLike = (
    commentId: string,
    isReply: boolean = false,
    parentId?: string,
  ) => {
    const updatedComments = comments.map((comment) => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies:
            comment.replies?.map((reply) =>
              reply.id === commentId
                ? {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  }
                : reply,
            ) || [],
        };
      } else if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
        };
      }
      return comment;
    });

    setComments(updatedComments);
    saveCommentsToStorage(updatedComments);
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return timestamp.toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLoadMoreComments = () => {
    setDisplayedComments((prev) => Math.min(prev + 3, comments.length));
  };

  const visibleComments = comments.slice(0, displayedComments);
  const hasMoreComments = displayedComments < comments.length;

  return (
    <Card className="soft-shadow">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-monastery-red" />
          Visitor Experiences
          <Badge variant="secondary">{comments.length} comments</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Comment */}
        <div className="space-y-3">
          <Textarea
            placeholder={`Share your experience at ${monasteryName}...`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Share your spiritual journey, travel tips, or memorable moments
            </p>
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              size="sm"
            >
              <Send className="h-4 w-4 mr-1" />
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {visibleComments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              {/* Main Comment */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="text-xs bg-monastery-red/10 text-monastery-red">
                    {getInitials(comment.userName)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">
                      {comment.userName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                    {comment.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-3 text-xs">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(comment.id)}
                      className={`h-auto p-1 ${comment.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                    >
                      <ThumbsUp
                        className={`h-3 w-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`}
                      />
                      {comment.likes}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setReplyTo(replyTo === comment.id ? null : comment.id)
                      }
                      className="h-auto p-1 text-muted-foreground"
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>

                  {/* Reply Form */}
                  {replyTo === comment.id && (
                    <div className="mt-3 space-y-2">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={!replyContent.trim()}
                        >
                          Reply
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setReplyTo(null);
                            setReplyContent("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 space-y-3 pl-4 border-l-2 border-muted">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2">
                          <Avatar className="h-6 w-6 flex-shrink-0">
                            <AvatarFallback className="text-xs bg-mountain-blue/10 text-mountain-blue">
                              {getInitials(reply.userName)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-xs">
                                {reply.userName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(reply.timestamp)}
                              </span>
                            </div>

                            <p className="text-xs text-muted-foreground">
                              {reply.content}
                            </p>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                toggleLike(reply.id, true, comment.id)
                              }
                              className={`h-auto p-1 text-xs ${reply.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                            >
                              <ThumbsUp
                                className={`h-3 w-3 mr-1 ${reply.isLiked ? "fill-current" : ""}`}
                              />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No comments yet. Be the first to share your experience!
            </p>
          </div>
        )}

        {/* Load More Comments */}
        {hasMoreComments && (
          <div className="text-center pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadMoreComments}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Load More Comments ({comments.length - displayedComments}{" "}
              remaining)
            </Button>
          </div>
        )}

        {/* Show total when all comments are displayed */}
        {!hasMoreComments && comments.length > 2 && (
          <div className="text-center pt-4 text-sm text-muted-foreground">
            Showing all {comments.length} comments
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonasteryComments;
