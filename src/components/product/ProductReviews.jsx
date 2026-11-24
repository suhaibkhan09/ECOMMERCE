import React, { useState } from 'react';
import { FiCheckCircle, FiThumbsUp, FiStar, FiEdit3 } from 'react-icons/fi';
import Rating from '../common/Rating';
import Modal from '../common/Modal';
import { generateReviews } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ProductReviews = ({ productId, initialRating = 4.8, initialReviewCount = 120 }) => {
  const [reviews, setReviews] = useState(() => generateReviews(productId, 5));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);

  // Form states
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');

  const filteredReviews = ratingFilter === 0
    ? reviews
    : reviews.filter((r) => r.rating === ratingFilter);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim() || !newName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const review = {
      id: `rev-${Date.now()}`,
      productId,
      reviewer: newName,
      rating: newRating,
      title: newTitle,
      comment: newComment,
      date: new Date().toISOString(),
      helpful: 0,
      verified: true,
      images: [],
    };

    setReviews([review, ...reviews]);
    toast.success('Thank you! Your review has been submitted.');
    setIsModalOpen(false);
    setNewTitle('');
    setNewComment('');
    setNewName('');
    setNewRating(5);
  };

  const handleHelpful = (reviewId) => {
    setReviews(
      reviews.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    );
    toast.success('Thanks for your feedback!');
  };

  return (
    <div className="border-t border-gray-100 dark:border-gray-800 pt-12 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            Customer Reviews ({reviews.length})
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real feedback from verified purchasers
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2"
        >
          <FiEdit3 /> Write a Review
        </button>
      </div>

      {/* Ratings Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 mb-8">
        <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-6 md:pb-0">
          <span className="text-5xl font-black font-display text-gray-900 dark:text-white">
            {initialRating}
          </span>
          <div className="my-2">
            <Rating rating={initialRating} size="lg" showCount={false} />
          </div>
          <span className="text-xs text-gray-400">
            Based on {initialReviewCount} verified reviews
          </span>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = stars === 5 ? 75 : stars === 4 ? 18 : stars === 3 ? 5 : 2;
            return (
              <div
                key={stars}
                onClick={() => setRatingFilter(ratingFilter === stars ? 0 : stars)}
                className="flex items-center gap-3 text-xs cursor-pointer group"
              >
                <span className="w-12 text-gray-600 dark:text-gray-300 font-semibold group-hover:text-primary-600">
                  {stars} Stars
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-2 rounded-full transition-all group-hover:bg-primary-600"
                    style={{ width: `${count}%` }}
                  />
                </div>
                <span className="w-10 text-right text-gray-400">{count}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 font-bold flex items-center justify-center text-sm">
                  {rev.reviewer[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                      {rev.reviewer}
                    </span>
                    {rev.verified && (
                      <span className="badge badge-success text-[10px] flex items-center gap-1">
                        <FiCheckCircle size={10} /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(rev.date)}</span>
                </div>
              </div>
              <Rating rating={rev.rating} size="sm" showCount={false} />
            </div>

            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">
              {rev.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {rev.comment}
            </p>

            <button
              onClick={() => handleHelpful(rev.id)}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary-600 transition-colors"
            >
              <FiThumbsUp /> Helpful ({rev.helpful})
            </button>
          </div>
        ))}
      </div>

      {/* Review Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Write a Customer Review"
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              Your Rating
            </label>
            <div className="flex items-center gap-2 text-2xl text-amber-400 cursor-pointer">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setNewRating(s)}
                  className="focus:outline-none"
                >
                  <FiStar className={s <= newRating ? 'fill-current' : 'text-gray-300'} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. John Doe"
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              Review Title
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              Detailed Review
            </label>
            <textarea
              rows={4}
              required
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What did you like or dislike about this item?"
              className="input-field text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn-secondary text-xs py-2 px-4"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs py-2 px-5">
              Submit Review
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductReviews;
