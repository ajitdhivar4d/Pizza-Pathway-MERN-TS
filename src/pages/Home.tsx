import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Carousel />
      <Card />
      <Footer />
    </div>
  );
};

export default Home;
