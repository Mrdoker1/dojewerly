import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './FeaturedProductsSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../../app/reducers/productsSlice';
import ProductCard from '../../../components/Catalog/ProductCard/ProductCard';
import { AppDispatch, RootState } from '../../../app/store';

const FeaturedProductsSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.products);
  
    useEffect(() => {
        dispatch(fetchAllProducts({}));
    }, [dispatch]);

    return (
      <div className={styles.productSlider}>
        <div className={styles.sliderHeading}>
          <h2 className={styles.subsection}>Featured Products</h2>
          <div className={styles.productSliderSubheading}>Essential products, best values, lower prices</div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={6}
          loop={true} // Делает слайдер бесконечным
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 8,
                spaceBetween: 20,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product._id} className={styles.swiperSlide}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
};

export default FeaturedProductsSection;
