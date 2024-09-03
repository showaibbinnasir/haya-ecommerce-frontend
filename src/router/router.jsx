import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout/Layout";
import Home from "../component/Home/Home";
import ProductDetails from "../component/ProductDetails/ProductDetails";
import Login from "../component/Login/Login";
import Register from "../component/Register/Register";
import PrivateRouter from "../component/PrivateRouter/PrivateRouter";
import Account from "../component/Account/Account";
import AllUsers from "../component/AllUsers/AllUsers";
import AllProducts from "../component/AllProducts/AllProducts";
import ProductsList from "../component/ProductsList/ProductsList";
import Cart from "../component/Cart/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path : "/products/:id",
                element: <ProductDetails></ProductDetails>,
                loader : ({params}) => fetch(`https://hayaecommerce-backend.vercel.app/products/${params.id}`)
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path : "/register",
                element: <Register></Register>
            }, {
                path : "/account",
                element : <PrivateRouter><Account></Account></PrivateRouter>
            }, {
                path : "/users",
                element: <PrivateRouter><AllUsers></AllUsers></PrivateRouter>
            },{
                path : "/allProducts",
                element: <PrivateRouter><AllProducts></AllProducts></PrivateRouter>
            },{
                path : "/productList/:subcategory",
                element : <ProductsList></ProductsList>,
                loader : ({params}) => fetch(`https://hayaecommerce-backend.vercel.app/allProducts?subcategory=${params.subcategory}`)
            }, {
                path : "/searchresult/:searchitem",
                element : <ProductsList></ProductsList>,
                loader : ({params}) => fetch(`https://hayaecommerce-backend.vercel.app/searchresult?searchId=${params.searchitem}`)
            }, {
                path : "/allcategory/:category",
                element : <ProductsList></ProductsList>,
                loader :({params}) => fetch(`https://hayaecommerce-backend.vercel.app/allCategory?category=${params.category}`)
            }, {
                path : "/cart",
                element : <PrivateRouter><Cart></Cart></PrivateRouter>
            }
        ]
    }
])

export default router