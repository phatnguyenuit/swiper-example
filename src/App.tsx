import { useState, useCallback } from 'react';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import SwiperCore, { Thumbs, Navigation, Controller } from 'swiper';

import { classnames } from './utils';

import classes from './App.module.css';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Controller, Thumbs]);

const thumbnails = Array(10)
  .fill('')
  .map((_, index) => `https://picsum.photos/id/${index + 1}/100`);
const photos = Array(10)
  .fill('')
  .map((_, index) => `https://picsum.photos/id/${index + 1}/600`);

function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleChangeActiveIndex = useCallback((swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
  }, []);
  const isActive = useCallback(
    (index: number) => {
      return index === activeIndex;
    },
    [activeIndex],
  );
  return (
    <div>
      <div style={{ width: 600, padding: 24 }}>
        <h1 style={{ marginBottom: 16 }}>My Photo Gallery</h1>
        {/* Photo Gallery */}
        <SwiperReact
          id="main"
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={0}
          slidesPerView={1}
          onActiveIndexChange={handleChangeActiveIndex}
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <div className={classes.slide}>
                <img
                  className={classes.photo}
                  alt={`Slide ${index}`}
                  src={photo}
                />
              </div>
            </SwiperSlide>
          ))}
        </SwiperReact>
        {/* Photo Thumbnails */}
        <SwiperReact
          id="thumbs"
          navigation
          watchSlidesVisibility
          watchSlidesProgress
          slidesPerView={5}
          spaceBetween={10}
          onSwiper={setThumbsSwiper}
        >
          {thumbnails.map((photo, index) => (
            <SwiperSlide key={`thumb-${index}`}>
              <img
                className={classnames(classes.photo, classes.thumbnail, {
                  [classes.active]: isActive(index),
                })}
                alt={`Thumbnail ${index}`}
                src={photo}
              />
            </SwiperSlide>
          ))}
        </SwiperReact>
      </div>
    </div>
  );
}

export default App;
