import { Badge, Spinner, toast } from "keep-react";
import { Lock, LockSimpleOpen } from "phosphor-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const AllUsers = () => {
    // const [userList, setUserList] = useState("")
    // useEffect(() => {
    //     fetch("http://localhost:5000/users")
    //         .then(res => res.json())
    //         .then(data => setUserList(data))
    // }, [])
    const { data: userList = [], refetch, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`)
            const data = await res.json();
            return data;
        }
    })
    document.title = "Haya | All users"
    const [blockLoading, setBlockLoading] = useState(false)
    const handleBlockUser = id => {
        setBlockLoading(true)
        const isBlocked = false;
        const verify = { isBlocked };
        fetch(`http://localhost:5000/allUser/blockUser/update/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(verify)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(`${id} blocked successfully.`)
                setBlockLoading(false)
                refetch()
            })
    }
    const [unblockLoading, setUnblockLoading] = useState(false)
    const handleUnblock = id => {
        setUnblockLoading(true)
        const isBlocked = true;
        const verify = { isBlocked };
        fetch(`http://localhost:5000/allUser/unblockUser/update/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(verify)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(`${id} unblocked successfully.`)
                setUnblockLoading(false)
                refetch()
            })
    }


    document.title = "Haya | Users"
    return (
        <div>
            <div>
                <h1 className="text-2xl text-center my-5 font-semibold">Total User: {userList.length}</h1>
            </div>
            <div className="mx-5">
                {
                    userList &&
                    userList.map((user, i) => <div key={i}>
                        <div className="flex justify-center">
                            <div className="mt-5 bg-[#CEA2A2] hover:bg-gray-500 rounded-lg w-[450px]">
                                <div className="flex gap-3 justify-between items-center text-white p-3">
                                    <div>
                                        <h1 className="font-semibold">{user.userName}</h1>
                                        <h1>{user.userEmail}</h1>
                                        <div className="flex gap-2">
                                            <div>
                                                {
                                                    user?.isAdmin ?
                                                        <Badge color="warning">Admin</Badge> :
                                                        <Badge color="success">Consumer</Badge>
                                                }
                                            </div>
                                            <div>
                                                {
                                                    user?.access ? 
                                                    <Badge color="success">Authorized</Badge>
                                                    : <Badge color="error">Blocked</Badge>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        user?.isAdmin ?
                                            <h1></h1> :
                                            <div>
                                                {
                                                    user?.access ?
                                                        <div onClick={() => handleBlockUser(user?._id)} className="bg-red-400 p-2 rounded-lg cursor-pointer">
                                                            {
                                                                blockLoading ?
                                                                    <Spinner color="info" size="lg" /> :
                                                                    <Lock size={32} color="#fdfcfc" />
                                                            }


                                                        </div> :
                                                        <div onClick={() => handleUnblock(user?._id)} className="bg-green-400 p-2 rounded-lg cursor-pointer">
                                                            {
                                                                unblockLoading ?
                                                                    <Spinner color="info" size="lg" /> :
                                                                    <LockSimpleOpen size={32} color="#fdfcfc" />
                                                            }


                                                        </div>
                                                }
                                            </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllUsers;