import facebok from "../../assets/facebook.png"
import group from "../../assets/group.png"
import insta from "../../assets/insta.png"
import whatsapp from "../../assets/whatsapp.png"
import haya from "../../assets/haya.png"

const Footer = () => {
    return (
        <div>
            <div className="bg-white p-5">
                <div className="flex justify-center">
                    <div className="flex items-center gap-5">
                        <img src={facebok} alt="" />
                        <img src={insta} alt="" />
                        <img src={whatsapp} alt="" />
                        <img src={group} alt="" />
                    </div>
                </div>
            </div>
            <div className="bg-black flex justify-center p-5">
                <div className="flex flex-col lg:flex-row items-center gap-9">
                    <div>
                        <div className="mb-3">
                            <img className=" w-[100px] lg:w-[150px]" src={haya} alt="" />
                        </div>
                        <div className="w-[350px] lg:w-[450px]">
                            <h1 className="text-white text-justify">Assalamu Alaikum. We do not believe in quantity,
                                we believe in quality. We will be able to reach the
                                top list of your choice with quality complete
                                products In Sha_Allah</h1>
                        </div>
                    </div>
                    <div>
                        <div className="mb-3">
                            <h1 className="text-2xl text-white">Address</h1>
                        </div>
                        <div className="text-white w-[350px] lg:w-[450px]">
                            <h1>Office-display Center:</h1>
                            <h1>House-32, 2nd floor, Road- 08, Block- H, Mirpur 2,
                                Dhaka,1216 ,Bangladesh. 01799837336 ,
                                01812630083</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center bg-black p-2 text-white">
                <h1>© Haya 2024 | DreamWeave Stations</h1>
            </div>
        </div>
    );
};

export default Footer;