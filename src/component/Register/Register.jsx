import { Envelope, Lock, Phone, } from 'phosphor-react'
import { Button, InputIcon, Input, Label, Spinner, toast } from 'keep-react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { authContext } from "../../contextApi/AuthProvider";

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const { createUser, updateUser } = useContext(authContext)
    const [isLoading, setIsLoading] = useState(false)
    document.title = "Haya | Registration"
    const handleForm = e => {
        e.preventDefault()
        const form = e.target
        setIsLoading(true)
        const email = form.email.value
        const password = form.password.value
        const name = form.name.value
        const phoneNumber = form.phoneNumber.value
        const isAdmin = false;
        const access = true;
        createUser(email, password)
            .then(data => {
                console.log(data);
                setIsLoading(false);
                handleUpdate(name)
                saveUser(email, name, isAdmin, phoneNumber, access)
                navigate(from, { replace: true })
            })
            .catch(err => {
                toast(err.message)
                setIsLoading(false)
            })
        console.log(phoneNumber);
    }
    const saveUser = (userEmail, userName, isAdmin, phoneNumber,access) => {
        const userInfo = { userEmail, userName, isAdmin, phoneNumber, access }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged == true) {
                    toast.success("Account created successfully!")

                } else {
                    toast.error("Sorry! Something went wrong.")

                }
            })
    }
    const handleUpdate = (name) => {
        const profile = {
            displayName: name,
        }
        updateUser(profile)
            .then(data => console.log(data))
            .catch(err => console.log(err))

    }

    return (
        <div>
            <div className=' h-[550px] lg:h-[750px] flex items-center justify-center'>
                <div>
                    <div>
                        <h1 className='text-3xl text-center my-5 font-semibold'>Please register first!</h1>
                    </div>
                    <form onSubmit={handleForm} className=" w-[300px] lg:w-[450px] space-y-2 rounded-lg border p-8 shadow-md">
                        <fieldset className="space-y-1">
                            <Label htmlFor="name">Email</Label>
                            <div className="relative">
                                <Input placeholder="Enter email" className="ps-11" name='email' />
                                <InputIcon>
                                    <Envelope size={19} color="#AFBACA" />
                                </InputIcon>
                            </div>
                        </fieldset>
                        <fieldset className="space-y-1">
                            <Label htmlFor="name">User name</Label>
                            <div className="relative">
                                <Input placeholder="Enter name" className="ps-11" name='name' />
                                <InputIcon>
                                    <Envelope size={19} color="#AFBACA" />
                                </InputIcon>
                            </div>
                        </fieldset>
                        <fieldset className="space-y-1">
                            <Label htmlFor="name">Phone Number</Label>
                            <div className="relative">
                                <Input placeholder="Enter your phone number" className="ps-11" name='phoneNumber' />
                                <InputIcon>
                                    <Phone size={19} color="#AFBACA" />
                                </InputIcon>
                            </div>
                        </fieldset>
                        
                        <fieldset className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input id="password" name='password' placeholder="Enter password" type="password" className="ps-11" />
                                <InputIcon>
                                    <Lock size={19} color="#AFBACA" />
                                </InputIcon>
                            </div>
                        </fieldset>

                        <div>
                            <h1>Already have an account? Please <span><Link to="/login" className='text-blue-500 font-semibold'>Sign in</Link></span> now.</h1>
                        </div>
                        <Button size="sm" color="secondary" type="submit">
                            {
                                isLoading ?
                                    <Spinner color="info" size="lg" /> :
                                    <span>Sign Up</span>
                            }
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;