import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarCollapseBtn,
    NavbarContainer,
    NavbarItem,
    NavbarList,
    toast,
} from 'keep-react'
import arrow from "../../assets/arrowdown.png"
import { Divider, Dropdown, DropdownAction, DropdownContent, DropdownItem, DropdownList, AvatarBadge } from 'keep-react'
import { Input } from 'keep-react'
import haya from "../../assets/haya.png"
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from "keep-react"
import { authContext } from '../../contextApi/AuthProvider'
import { useContext } from 'react'
import useAdmin from '../../hooks/useAdmin'
const NavigationBar = () => {
    const { user, logOut } = useContext(authContext)
    const signingOut = () => {
        logOut();
    }

    const handleAccount = () => {
        toast.warning("Please login first!")
    }
    const navigate = useNavigate()
    const handleSubCategory = (name) => {
        navigate(`/productList/${name}`)
    }

    return (
        <div className='sticky top-[-75px] lg:top-[-100px] z-50 shadow-md'>
            <div className='bg-[#CEA2A2] px-[15px] lg:px-[75px] pt-[20px]'>
                <div className='flex justify-between'>
                    <img className='w-[70px] lg:w-[150px]' src={haya} alt="" />
                    <div className='flex gap-2 items-center'>
                        <Input className='w-[150px] lg:w-[450px]' placeholder="Enter name" type="text" />
                        <Button className='bg-[black] hover:bg-white text-white hover:text-black'>Search</Button>
                    </div>
                </div>
            </div>
            <Navbar className='bg-[#CEA2A2] border-none'>
                <NavbarContainer>
                    <NavbarList className=' pl-[65px]'>
                        <NavbarItem className='text-white'><Link to="/">Home</Link></NavbarItem>

                        <Dropdown>
                            <DropdownAction asChild>
                                <div className='flex justify-center items-center gap-2'>
                                    <h1 className=' text-white font-medium'>Categories</h1>
                                    <img className='w-[15px]' src={arrow} alt="" />
                                </div>
                            </DropdownAction>
                            <DropdownContent className='bg-[#DADADA]'>
                                <DropdownList>
                                    <DropdownItem><Link to="/hello">T-shirt</Link></DropdownItem>
                                    <DropdownItem>Shirt</DropdownItem>
                                    <DropdownItem>Pant</DropdownItem>
                                    <Divider />
                                    <DropdownItem>Panjabi</DropdownItem>
                                    <DropdownItem>Hoodie</DropdownItem>
                                    <Divider />
                                    <DropdownItem>Joggers</DropdownItem>
                                </DropdownList>
                            </DropdownContent>
                        </Dropdown>
                        <NavbarItem className='text-white'><h1 onClick={() => handleSubCategory("Man's Product")}>Man's Product</h1></NavbarItem>
                        <NavbarItem className='text-white'><h1 onClick={() => handleSubCategory("Woman's Product")}>Woman's Product</h1></NavbarItem>

                        <NavbarItem className='text-white'><h1 onClick={() => handleSubCategory("Kid's Product")}>Kid's Product</h1></NavbarItem>
                        <NavbarItem className='text-white'>Contact</NavbarItem>
                    </NavbarList>
                    <div>
                        <NavbarBrand className='mx-5'>
                            <div className='flex items-center gap-2'>
                                {
                                    user ? <h1 className='text-white font-medium'>Hello {user.displayName}</h1>
                                        : <h1 className='text-white font-medium'>Hello...</h1>
                                }

                                <Dropdown>
                                    <DropdownAction asChild>
                                        {
                                            user ?
                                                <Avatar>
                                                    <AvatarImage />
                                                    <AvatarBadge />
                                                </Avatar>
                                                : <Avatar>
                                                    <AvatarImage />
                                                </Avatar>
                                        }
                                    </DropdownAction>
                                    <DropdownContent className='bg-[#DADADA]'>
                                        <DropdownList>
                                            <DropdownItem>Cart</DropdownItem>
                                            <Divider />
                                            {
                                                user ? <DropdownItem><Link to='/account'>My Account</Link></DropdownItem> : <DropdownItem><h1 onClick={handleAccount}>My Account</h1></DropdownItem>
                                            }
                                            <Divider />
                                            <DropdownItem>{
                                                user ? <Link onClick={signingOut}>Logout</Link> : <Link to="/login">Sign In/ Sign Up</Link>
                                            }</DropdownItem>
                                        </DropdownList>
                                    </DropdownContent>
                                </Dropdown>
                            </div>
                        </NavbarBrand>
                    </div>
                    <NavbarCollapseBtn className='bg-white p-2 rounded-md mx-5' />
                    <NavbarCollapse className='bg-[#DADADA] h-[450px]'>
                        <NavbarItem className='text-black'><Link to="/">Home</Link></NavbarItem>
                        <Dropdown>
                            <DropdownAction asChild>
                                <div className='flex justify-center items-center gap-2'>
                                    <h1 className=' text-black font-medium'>Categories</h1>
                                    <img className='w-[15px]' src={arrow} alt="" />
                                </div>
                            </DropdownAction>
                            <DropdownContent className='bg-white'>
                                <DropdownList className='z-50'>
                                    <DropdownItem><Link to="/hello">T-shirt</Link></DropdownItem>
                                    <DropdownItem>Shirt</DropdownItem>
                                    <DropdownItem>Pant</DropdownItem>
                                    <Divider />
                                    <DropdownItem>Panjabi</DropdownItem>
                                    <DropdownItem>Hoodie</DropdownItem>
                                    <Divider />
                                    <DropdownItem>Joggers</DropdownItem>
                                </DropdownList>
                            </DropdownContent>
                        </Dropdown>

                        <NavbarItem className='text-black'><h1 onClick={() => handleSubCategory("Man's Product")}>Man's Product</h1></NavbarItem>
                        <NavbarItem className='text-black'><h1 onClick={() => handleSubCategory("Woman's Product")}>Woman's Product</h1></NavbarItem>
                        <NavbarItem className='text-black'><h1 onClick={() => handleSubCategory("Kid's Product")}>Kid's Product</h1></NavbarItem>
                        <NavbarItem className='text-black'></NavbarItem>
                        <NavbarItem className='text-black'>Contact</NavbarItem>
                    </NavbarCollapse>
                </NavbarContainer>
            </Navbar>
        </div>
    );
};

export default NavigationBar;