import { Empty, EmptyDescription, EmptyImage, EmptyTitle, buttonVariants } from "keep-react";
import { Image } from "phosphor-react";
import { Link } from "react-router-dom";

const ErrorComp = () => {
    return (
        <div>
            <Empty>
                <EmptyImage>
                    <Image
                        src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
                        height={234}
                        width={350}
                        alt="404"
                    />
                </EmptyImage>
                <EmptyTitle className="mb-[14px] mt-5">Sorry, No result found!</EmptyTitle>
                <EmptyDescription className="mb-8">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
                </EmptyDescription>
                <Link href="/" className={buttonVariants({ color: 'primary' })}>
                    Go to home
                </Link>
            </Empty>
        </div>
    );
};

export default ErrorComp;