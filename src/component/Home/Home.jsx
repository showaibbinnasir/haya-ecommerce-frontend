import banner from "../../assets/banner.png"
import CategorySection from "../CategorySection/CategorySection";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import Footer from "../Footer/Footer";
import LatestProducts from "../LatestProducts/LatestProducts";
const Home = () => {
    document.title = "Haya | Fashion & LifeStyle | 2024"
    return (
        <div className="bg-[#E0C6CB]">
            <div>
                <img className="" src={banner} alt="" />
            </div>
            <FeaturedProducts></FeaturedProducts>
            <LatestProducts></LatestProducts>
            <CategorySection></CategorySection>
            <Footer></Footer>
        </div>
    );
};

export default Home;