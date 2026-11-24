import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import HeroSlider from '../components/home/HeroSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import FlashDeals from '../components/home/FlashDeals';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  const allProducts = useSelector((state) => state.products.items);

  const featured = allProducts.filter((p) => p.isFeatured).slice(0, 8);
  const bestSellers = allProducts.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = allProducts.filter((p) => p.isNew).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>LuxeCart — Premium Online Shopping & Lifestyle</title>
        <meta
          name="description"
          content="Explore exclusive designer clothing, luxury electronics, athletic footwear, and home decor at LuxeCart."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSlider />
        <CategoryGrid />
        <FeaturedProducts
          title="Trending & Featured"
          subtitle="Top recommended items carefully selected by our editors"
          products={featured}
        />
        <FlashDeals />
        <FeaturedProducts
          title="All-Time Best Sellers"
          subtitle="Our most loved, highest-rated customer favorites"
          products={bestSellers}
        />
        {newArrivals.length > 0 && (
          <FeaturedProducts
            title="Fresh Off The Press ✨"
            subtitle="Explore our newest arrivals from top world brands"
            products={newArrivals}
          />
        )}
        <Newsletter />
      </div>
    </>
  );
};

export default HomePage;
