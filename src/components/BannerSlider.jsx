import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './BannerSlider.css';

const banners = [
  '/Banners/Mobile_banner_for_a_cafe_202606180058.webp',
  '/Banners/Mobile_banner_for_a_cafe_202606180102.webp',
  '/Banners/Mobile_banner_for_a_cafe_202606180116.webp'
];

const BannerSlider = ({ onNavigate }) => {
  return (
    <section className="banner-section paper-edge">
      <div className="banner-container">
        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="banner-swiper"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div 
                className="slide-content" 
                onClick={() => onNavigate('menu')}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={banner} 
                  alt={`Cafe Banner ${index + 1}`} 
                  className="banner-image" 
                  fetchpriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BannerSlider;
