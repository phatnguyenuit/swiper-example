import { useState } from 'react';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import SwiperCore, { Thumbs, Navigation, Controller } from 'swiper';

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
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <img alt={`Slide ${index}`} src={photo} />
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
              <img alt={`Thumbnail ${index}`} src={photo} />
            </SwiperSlide>
          ))}
        </SwiperReact>
      </div>
    </div>
  );
}

export default App;
