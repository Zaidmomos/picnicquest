
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";

function Reviews() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    setReviews(savedReviews);
  }, []);

  const handleSubmitReview = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!newReview.trim()) {
      toast({
        title: "Error",
        description: "Please write a review before submitting",
        variant: "destructive",
      });
      return;
    }

    const review = {
      id: Date.now(),
      name: user.name,
      rating,
      comment: newReview,
      date: new Date().toLocaleDateString("en-US", { 
        year: "numeric",
        month: "long"
      })
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    
    setNewReview("");
    setRating(5);

    toast({
      title: "Success",
      description: "Your review has been posted successfully!",
    });
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  return (
    <div className="py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        What Our Visitors Say
      </motion.h1>

      {/* Review Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mb-12 bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Your Review</label>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Share your experience..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary min-h-[100px]"
          />
        </div>

        <Button
          onClick={handleSubmitReview}
          className="w-full flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Post Review
        </Button>
      </motion.div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {review.name[0]}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">{review.name}</h3>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-2">{review.comment}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </motion.div>
        ))}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            {isLogin ? (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onToggleForm={() => setIsLogin(false)}
              />
            ) : (
              <SignupForm
                onSuccess={handleAuthSuccess}
                onToggleForm={() => setIsLogin(true)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;
