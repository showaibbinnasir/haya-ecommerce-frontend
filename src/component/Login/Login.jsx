import { Envelope, Lock } from 'phosphor-react'
import { Button, InputIcon, Input, Label, Spinner, toast } from 'keep-react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../../contextApi/AuthProvider';
import { useContext, useState } from 'react';

const Login = () => {
    const { loginUser } = useContext(authContext)
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    document.title = "Haya | Login"
    const handleForm = e => {
        e.preventDefault()
        const form = e.target
        setIsLoading(true)
        const email = form.email.value
        const password = form.password.value
        const data = { email, password }
        console.log(data);
        loginUser(email, password)
            .then(data => {
                console.log(data)
                setIsLoading(false)
                navigate(from, { replace: true })
            })
            .catch(err =>{
                toast.error(err.message)
                setIsLoading(false)
            })
    }
    return (
        <div className=' h-[550px] lg:h-[750px] flex items-center justify-center'>
            <div>
                <div>
                    <h1 className='text-3xl text-center my-5 font-semibold'>Please login first!</h1>
                </div>
                <form onSubmit={handleForm} className=" w-[300px] lg:w-[450px] space-y-2 rounded-lg border p-8 shadow-md">
                    <fieldset className="space-y-1">
                        <Label htmlFor="name">Email</Label>
                        <div className="relative">
                            <Input name='email' placeholder="Enter email" className="ps-11" />
                            <InputIcon>
                                <Envelope size={19} color="#AFBACA" />
                            </InputIcon>
                        </div>
                    </fieldset>
                    <fieldset className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input name='password' id="password" placeholder="Enter password" type="password" className="ps-11" />
                            <InputIcon>
                                <Lock size={19} color="#AFBACA" />
                            </InputIcon>
                        </div>
                    </fieldset>
                    <div>
                        <h1>Dont have any account? Please <span><Link to="/register" className='text-blue-500 font-semibold'>Sign Up</Link></span> first.</h1>
                    </div>
                    <Button size="sm" color="secondary" type="submit">
                        {
                            isLoading ? 
                            <Spinner color="info" size="lg" /> : 
                            <span>Sign In</span>
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;