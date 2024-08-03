import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/pizza-slide-1.jpg";
import img2 from "../assets/pizza-slide-2.jpg";
import img3 from "../assets/pizza-slide-3.jpg";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

const Carousel = () => {
  const [search, setSearch] = useState<string>("");
  console.log(search);

  var settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    prevArrow: null,
    nextArrow: null,
  };
  return (
    <div className="carousel-container">
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={img1} alt="pizza" />
          </div>
          <div>
            <img src={img2} alt="pizza" />
          </div>
          <div>
            <img src={img3} alt="pizza" />
          </div>
        </Slider>
      </div>
      <div className="input-container">
        <div className="search-icon">
          <BiSearch />
        </div>
        <input
          type="text"
          value={search}
          placeholder="Search here.."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Carousel;
