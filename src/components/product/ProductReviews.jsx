import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  FiCheckCircle,
  FiThumbsUp,
  FiStar,
  FiEdit3,
  FiCamera,
  FiX,
  FiFilter,
  FiSearch,
  FiSmile,
  FiCheck,
} from 'react-icons/fi';
import Rating from '../common/Rating';
import Modal from '../common/Modal';
import { generateReviews } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ProductReviews = ({ productId, initialRating = 4.8, initialReviewCount = 120 }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState(() => {
    const base = generateReviews(productId, 6);
    // Add photos & recommendation metadata
    return base.map((rev, index) => ({
      ...rev,
      recommends: index % 4 !== 0,
      helpfulVotes: rev.helpful || Math.floor(Math.random() * 15),
      tags: index % 2 === 0 ? ['Great Quality', 'True to Size'] : ['Fast Shipping', 'Excellent Value'],
      photos: index === 0 ? ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'] : [],
    }));
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'highest', 'lowest', 'helpful'
  const [searchQuery, setSearchQuery] = useState('');
  const [votedHelpful, setVotedHelpful] = useState({});

  // Review Form States
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState(user?.name || '');
  const [recommends, setRecommends] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);

  const availableTags = [
    'Great Quality',
    'True to Size',
    'Comfortable',
    'Premium Feel',
    'Fast Shipping',
    'Excellent Value',
    'Highly Recommended',
  ];

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSimulatePhotoUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhotos((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index) => {
    setPreviewPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim() || !newName.trim()) {
      toast.error('Please complete all required fields.');
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
      helpfulVotes: 0,
      verified: true,
      recommends,
      tags: selectedTags,
      photos: previewPhotos,
    };

    setReviews([review, ...reviews]);
    toast.success('Your review has been published!');
    setIsModalOpen(false);
    setNewTitle('');
    setNewComment('');
    setNewRating(5);
    setPreviewPhotos([]);
    setSelectedTags([]);
  };

  const handleToggleHelpful = (reviewId) => {
    if (votedHelpful[reviewId]) {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, helpfulVotes: Math.max(0, r.helpfulVotes - 1) } : r))
      );
      setVotedHelpful((prev) => ({ ...prev, [reviewId]: false }));
      toast('Vote removed');
    } else {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, helpfulVotes: r.helpfulVotes + 1 } : r))
      );
      setVotedHelpful((prev) => ({ ...prev, [reviewId]: true }));
      toast.success('Thank you for your feedback!');
    }
  };

  // Filter & Sort
  const processedReviews = useMemo(() => {
    let result = [...reviews];

    if (ratingFilter > 0) {
      result = result.filter((r) => r.rating === ratingFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q) ||
          r.reviewer.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      if (sortBy === 'helpful') return b.helpfulVotes - a.helpfulVotes;
      return new Date(b.date) - new Date(a.date);
    });

    return result;
  }, [reviews, ratingFilter, searchQuery, sortBy]);

  return (
    <div className="border-t border-gray-100 dark:border-gray-800 pt-12 mt-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            Customer Reviews ({reviews.length})
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real feedback and verified buyer experiences
          </p>
        </div>
        <button
          onClick={() => {
            if (isAuthenticated && user?.name && !newName) {
              setNewName(user.name);
            }
            setIsModalOpen(true);
          }}
          className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2 shadow-sm"
        >
          <FiEdit3 className="w-4 h-4" /> Write a Review
        </button>
      </div>

      {/* Ratings Breakdown Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 mb-8">
        <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-6 md:pb-0">
          <span className="text-5xl font-black font-display text-gray-900 dark:text-white">
            {initialRating}
          </span>
          <div className="my-2">
            <Rating rating={initialRating} size="lg" showCount={false} />
          </div>
          <span className="text-xs text-gray-400">
            Based on {initialReviewCount + reviews.length - 6} verified reviews
          </span>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full">
            <FiCheckCircle className="w-3.5 h-3.5" /> 94% Recommended
          </div>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = stars === 5 ? 75 : stars === 4 ? 18 : stars === 3 ? 5 : 2;
            const isSelected = ratingFilter === stars;
            return (
              <div
                key={stars}
                onClick={() => setRatingFilter(isSelected ? 0 : stars)}
                className={`flex items-center gap-3 text-xs cursor-pointer p-1 rounded-lg transition-colors ${
                  isSelected ? 'bg-amber-100/60 dark:bg-amber-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-750'
                }`}
              >
                <span className="w-14 text-gray-600 dark:text-gray-300 font-semibold flex items-center gap-1">
                  {stars} <FiStar className="fill-amber-400 text-amber-400 w-3 h-3" />
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-2 rounded-full transition-all"
                    style={{ width: `${count}%` }}
                  />
                </div>
                <span className="w-10 text-right text-gray-400">{count}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews by keyword..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
          {ratingFilter > 0 && (
            <button
              onClick={() => setRatingFilter(0)}
              className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1.5 rounded-lg font-medium"
            >
              <span>{ratingFilter} Stars Only</span>
              <FiX className="w-3 h-3" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Stream */}
      {processedReviews.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500">No reviews found matching your search criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setRatingFilter(0);
            }}
            className="mt-3 text-xs text-amber-600 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {processedReviews.map((rev) => {
            const hasVoted = !!votedHelpful[rev.id];
            return (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      {rev.reviewer?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-gray-900 dark:text-white">
                          {rev.reviewer}
                        </span>
                        {rev.verified && (
                          <span className="badge badge-success text-[10px] flex items-center gap-1">
                            <FiCheckCircle size={10} /> Verified Buyer
                          </span>
                        )}
                        {rev.recommends && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                            <FiSmile className="w-3 h-3" /> Recommends this
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(rev.date)}</span>
                    </div>
                  </div>
                  <Rating rating={rev.rating} size="sm" showCount={false} />
                </div>

                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1.5">
                  {rev.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                  {rev.comment}
                </p>

                {/* Tags */}
                {rev.tags && rev.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    {rev.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Photos */}
                {rev.photos && rev.photos.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    {rev.photos.map((photo, i) => (
                      <img
                        key={i}
                        src={photo}
                        alt="Customer upload"
                        className="w-16 h-16 object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs cursor-pointer hover:opacity-90"
                      />
                    ))}
                  </div>
                )}

                {/* Helpful Voting */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-750/50">
                  <button
                    onClick={() => handleToggleHelpful(rev.id)}
                    className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                      hasVoted
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 font-semibold'
                        : 'text-gray-500 hover:text-amber-600 hover:bg-gray-50 dark:hover:bg-gray-750'
                    }`}
                  >
                    <FiThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : ''}`} />
                    <span>Helpful ({rev.helpfulVotes})</span>
                  </button>

                  <span className="text-[11px] text-gray-400">Verified Purchase</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Write a Customer Review"
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          {/* Star selector */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              Overall Rating
            </label>
            <div className="flex items-center gap-2 text-2xl text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewRating(s)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <FiStar
                    className={
                      s <= (hoverRating || newRating)
                        ? 'fill-current text-amber-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }
                  />
                </button>
              ))}
              <span className="text-xs font-semibold text-gray-500 ml-2">
                {newRating === 5
                  ? 'Excellent'
                  : newRating === 4
                  ? 'Very Good'
                  : newRating === 3
                  ? 'Average'
                  : newRating === 2
                  ? 'Poor'
                  : 'Terrible'}
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="input-field text-sm"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              Review Headline
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Exceeded expectations! Beautiful craftsmanship"
              className="input-field text-sm"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              Detailed Feedback
            </label>
            <textarea
              rows={4}
              required
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What did you love most? How was the fit, material, or daily usage?"
              className="input-field text-sm"
            />
          </div>

          {/* Recommends Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Would you recommend this product to a friend?
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRecommends(true)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  recommends ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setRecommends(false)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  !recommends ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Tags Selection */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">
              Highlight Tags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Attachment */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">
              Attach Photos (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-amber-500 hover:text-amber-600 transition-colors">
                <FiCamera className="w-4 h-4" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSimulatePhotoUpload}
                  className="hidden"
                />
              </label>

              {previewPhotos.map((photo, i) => (
                <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                  <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(i)}
                    className="absolute top-0 right-0 p-0.5 bg-red-500 text-white rounded-bl"
                  >
                    <FiX className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
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
