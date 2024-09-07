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
import Orders from "../component/Orders/Orders";
import AllOrders from "../component/AllOrders/AllOrders";
import AddProduct from "../component/AddProduct/AddProduct";
import EditProduct from "../component/EditProduct/EditProduct";
import Contact from "../component/Contact/Contact";
import ErrorComp from "../component/ErrorComp/ErrorComp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <ErrorComp></ErrorComp> ,
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
            }, {
                path : "/orders",
                element : <PrivateRouter><Orders></Orders></PrivateRouter>
            }, {
                path : '/allorders',
                element : <AllOrders></AllOrders>
            }, {
                path : "/addproduct",
                element : <PrivateRouter><AddProduct></AddProduct></PrivateRouter>
            }, {
                path : "/editpost/:id",
                element :<PrivateRouter><EditProduct></EditProduct></PrivateRouter>,
                loader : ({params}) => fetch(`https://hayaecommerce-backend.vercel.app/products/${params.id}`)
            }, {
                path : "/products",
                element : <ProductsList></ProductsList>,
                loader : () => fetch('https://hayaecommerce-backend.vercel.app/allProducts')
            }, {
                path : '/contact',
                element : <Contact></Contact>
            }
        ]
    }
])

export default router