import BannerImage from "./BannerImage";

import { Carousel } from 'react-bootstrap';

// https://react-bootstrap.netlify.app/docs/components/carousel
// banners should be an array of images + alt text ([{img: url, alt: text}, ...])
function BannerCarousel({banners}) {
  let images = banners.map((banner) => {
    return (
      <Carousel.Item key={banner.key}>
        <BannerImage img={banner.img} alt={banner.alt} />
      </Carousel.Item>
    );
  });
  return <Carousel className="mb-2">{images}</Carousel>;
}

export default BannerCarousel;