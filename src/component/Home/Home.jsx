import CategorySection from "../CategorySection/CategorySection";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import Footer from "../Footer/Footer";
import LatestProducts from "../LatestProducts/LatestProducts";
import ProductSlider from "../ProductSlider/ProductSlider";
const Home = () => {
    document.title = "Haya | Fashion & LifeStyle | 2024"
    return (
        <div className="bg-[#E0C6CB]">
            <ProductSlider></ProductSlider>
            <FeaturedProducts></FeaturedProducts>
            <LatestProducts></LatestProducts>
            <CategorySection></CategorySection>
            <Footer></Footer>
        </div>
    );
};

export default Home;