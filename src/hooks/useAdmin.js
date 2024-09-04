import { useEffect, useState } from "react";

const useAdmin = (email) => {
    const [isAdmin ,setIsAdmin] = useState(false)
    useEffect(()=>{
        fetch(`https://hayaecommerce-backend.vercel.app/users?email=${email}`)
        .then(res => res.json())
        .then(data => {
            if(data[0]?.isAdmin === true){
                setIsAdmin(true)
            }
        })
    },[email])
    return [isAdmin]
};

export default useAdmin;