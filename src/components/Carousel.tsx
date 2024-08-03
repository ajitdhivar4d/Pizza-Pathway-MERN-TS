import { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import img1 from "../assets/pizza-slide-1.jpg";
import img2 from "../assets/pizza-slide-2.jpg";
import img3 from "../assets/pizza-slide-3.jpg";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setSearch } from "../redux/reducers/misc";

const Carousel = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.misc.search);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
          onChange={searchHandler}
        />
      </div>
    </div>
  );
};

export default Carousel;
