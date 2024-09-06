import './CategorySection.css'
import men from "../../assets/Mens.png"
import women from "../../assets/women.png"
import kid from "../../assets/kids.png"
import hoodie from "../../assets/hoodie.png"
import { useNavigate } from 'react-router-dom'
const CategorySection = () => {
    const navigate = useNavigate()
    return (
        <div className='my-5'>
            <div className='flex justify-center'>
                <div className='flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-5 bg-[#CAAFAF] p-5 rounded-lg'>
                    <div>
                        <div onClick={()=>navigate(`/productList/Man's Product`)} className=' relative'>
                            <div>
                                <img src={men} alt="" />
                            </div>
                            <div className=' absolute bottom-0 w-[254px] p-5 bg-white'>
                                <h1 className='text-xl text-center'>Man's Product</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div onClick={()=>navigate(`/productList/Woman's Product`)} className=' relative'>
                            <div>
                                <img src={women} alt="" />
                            </div>
                            <div className=' absolute bottom-0 w-[254px] p-5 bg-white'>
                                <h1 className='text-xl text-center'>Woman's Product</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div onClick={()=>navigate(`/productList/Kid's Product`)} className=' relative'>
                            <div>
                                <img src={kid} alt="" />
                            </div>
                            <div className=' absolute bottom-0 w-[254px] p-5 bg-white'>
                                <h1 className='text-xl text-center'>Kid's Product</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div onClick={()=>navigate(`/allCategory/Hoodie`)} className=' relative'>
                            <div>
                                <img src={hoodie} alt="" />
                            </div>
                            <div className=' absolute bottom-0 w-[254px] p-5 bg-white'>
                                <h1 className='text-xl text-center'>Hoodies</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySection;