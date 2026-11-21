// Format price
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
};

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

// Format relative time
export const formatRelativeTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Generate star array for rating
export const getStarArray = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
};

// Validate email
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validate password (min 8 chars, 1 upper, 1 lower, 1 number)
export const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

// Debounce
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Generate pagination range
export const getPaginationRange = (current, total, siblings = 1) => {
  const totalNumbers = siblings * 2 + 5;
  if (totalNumbers >= total) return Array.from({ length: total }, (_, i) => i + 1);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 2;

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 3 + 2 * siblings }, (_, i) => i + 1);
    return [...leftRange, '...', total];
  }
  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from({ length: 3 + 2 * siblings }, (_, i) => total - (3 + 2 * siblings) + i + 1);
    return [1, '...', ...rightRange];
  }
  const middleRange = Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i);
  return [1, '...', ...middleRange, '...', total];
};

// Countdown timer
export const getCountdown = (endTime) => {
  const diff = new Date(endTime) - new Date();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
};

// Coupon validator
export const validateCoupon = (code, subtotal, couponsData) => {
  const coupon = couponsData.find((c) => c.code === code.toUpperCase() && c.active);
  if (!coupon) return { valid: false, message: 'Invalid coupon code' };
  if (new Date(coupon.expiresAt) < new Date()) return { valid: false, message: 'Coupon has expired' };
  if (subtotal < coupon.minOrder) return { valid: false, message: `Minimum order of ${formatPrice(coupon.minOrder)} required` };

  let discount = 0;
  if (coupon.type === 'percentage') discount = Math.min(subtotal * (coupon.discount / 100), coupon.maxDiscount);
  else if (coupon.type === 'fixed') discount = coupon.discount;

  return { valid: true, discount, message: coupon.description, coupon };
};

// Class name merge helper
export const cn = (...classes) => classes.filter(Boolean).join(' ');
