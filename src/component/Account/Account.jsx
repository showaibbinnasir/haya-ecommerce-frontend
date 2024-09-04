import { useContext, useEffect, useState } from "react";
import { authContext } from "../../contextApi/AuthProvider";
import { Bag, FilePlus, ShoppingBag, SignOut, Users } from "phosphor-react";
import useAdmin from "../../hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { Alert, AlertContainer, AlertDescription, AlertIcon, AlertTitle } from "keep-react";

const Account = () => {
    const { user, logOut } = useContext(authContext)
    const signingOut = () => {
        logOut();
    }

    const [userInfo, setUserInfo] = useState("")
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setUserInfo(data))
    }, [user])
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/allProducts')
        location.reload()
    }
    const handleMyOrder = () => {
        navigate("/orders")
        location.reload()
    }
    const handleAllOrder = () => {
        navigate("/allorders")
        location.reload()
    }
    const [isAdmin] = useAdmin(user?.email)
    document.title = `Dashboard | ${user?.displayName}`
    return (
        <div className="p-5">
            <h1 className="text-4xl animate-zoomIn text-center font-semibold">Hello {user?.displayName}</h1>
            <div>{
                isAdmin ? <h1 className="text-center text-green-600">Welcome our respected admin!</h1> : <h1 className="text-center text-gray-400">welcome to your dashboard</h1>
            }</div>
            <h1 className="font-semibold text-center">Email: {user?.email}</h1>
            {
                userInfo[0]?.access ?
                    <h1></h1>
                    : <div className="flex justify-center my-5">
                        <div className="flex justify-center w-[450px]">
                            <Alert color="error">
                                <AlertContainer>
                                    <AlertIcon />
                                    <AlertTitle>Error Alert</AlertTitle>
                                    <AlertDescription>Your account is terminated. Please mail to <span>showaibnishad@gmail.com</span> with your credentials.</AlertDescription>
                                </AlertContainer>
                            </Alert>
                        </div>
                    </div>
            }
            {
                isAdmin ?
                    <div className="flex justify-center">
                        <div className="mt-5 bg-[#CEA2A2] hover:bg-gray-500 rounded-lg w-[450px]">
                            <div className="flex gap-3 items-center text-white p-3">
                                <Bag size={32} color="#fcfcfc" />
                                <h1 onClick={handleAllOrder} className="font-semibold">All Orders</h1>
                            </div>

                        </div>
                    </div> :
                    <div className="flex justify-center">
                        <div className="mt-5 bg-[#CEA2A2] hover:bg-gray-500 rounded-lg w-[450px]">
                            <div className="flex gap-3 items-center text-white p-3">
                                <Bag size={32} color="#fcfcfc" />
                                <h1 onClick={handleMyOrder} className="font-semibold">My Orders</h1>
                            </div>

                        </div>
                    </div>
            }
            {
                isAdmin && <div className="flex justify-center">
                    <div onClick={()=>navigate('/addproduct')} className="mt-5 bg-[#CEA2A2] hover:bg-gray-500 rounded-lg w-[450px]">
                        <div className="flex gap-3 items-center text-white p-3">
                            <FilePlus size={32} color="#e3e3e3" />
                            <h1 className="font-semibold">Add Products</h1>
                        </div>

                    </div>
                </div>
            }
            {
                isAdmin && <div className="flex justify-center">
                    <div className="mt-5 bg-[#CEA2A2] hover:bg-gray-500 rounded-lg w-[450px]">
                        <div onClick={handleNavigate} className="flex gap-3 items-center text-white p-3">
                            <ShoppingBag size={32} color="#e3e3e3" />
                            <h1 className="font-semibold">All Products</h1>
                        </div>

                    </div>
                </div>
            }
            {
                isAdmin && <div className="flex justify-center">
                    <div className="mt-5 bg-[#CEA2A2] hover:bg-gray-500 rounded-lg w-[450px]">
                        <div onClick={() => navigate('/users')} className="flex gap-3 items-center text-white p-3">
                            <Users size={32} color="#e3e3e3" />
                            <h1 className="font-semibold">All Users</h1>
                        </div>

                    </div>
                </div>
            }
            <div className="flex justify-center">
                <div onClick={signingOut} className="mt-5 bg-[#CEA2A2] hover:bg-gray-500 rounded-lg w-[450px]">
                    <div className="flex gap-3 items-center text-white p-3">
                        <SignOut size={32} color="#fcfcfc" />
                        <h1 className="font-semibold">Logout</h1>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Account;