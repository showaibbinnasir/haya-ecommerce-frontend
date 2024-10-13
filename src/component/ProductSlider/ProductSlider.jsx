import classNames from 'embla-carousel-class-names'
import autoPlay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselButtons,
    CarouselControl,
    CarouselIndicators,
    CarouselItem,
    CarouselNextButton,
    CarouselPrevButton,
    CarouselSlides,
} from 'keep-react'
import bannerOne from "../../assets/banner.png"
import bannerTwo from "../../assets/haya_banner.png"
const ProductSlider = () => {
    const slideImage = [bannerOne, bannerTwo, bannerOne, bannerTwo]
    return (
        <div className='mx-2 lg:mx-[75px] pt-10'>
            <Carousel options={{ loop: true }} plugins={[classNames()]}>
                <CarouselSlides  options={{ loop: true }} plugins={[autoPlay()]}>
                    {slideImage.map((slide,i) => (
                        <CarouselItem key={i} className="flex-[0_0_80%] [&:not(.is-snapped)]:opacity-[0.16]">
                            <img className="rounded-xl h-[150px] lg:h-[550px] w-full object-cover" src={slide} alt="Carousel Item" />
                        </CarouselItem>
                    ))}
                </CarouselSlides>
                <CarouselControl className='flex justify-center scale-50'>
                    
                    <CarouselIndicators />
                </CarouselControl>
            </Carousel>
        </div>
    );
};

export default ProductSlider;