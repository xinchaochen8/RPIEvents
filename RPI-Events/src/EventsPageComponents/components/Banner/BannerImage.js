import "./bannerImage.css";

function BannerImage({img, alt}) {
  return (
    <img className="banner-img" src={img} alt={alt} />
  );
}

export default BannerImage;