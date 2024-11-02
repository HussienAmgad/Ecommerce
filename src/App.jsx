import './App.css'; // استيراد ملف CSS الرئيسي

import Home from './components/Home/Home'; // استيراد مكون Home
import About from './components/About/About'; // استيراد مكون About
import Brands from './components/Brands/Brands'; // استيراد مكون Brands
import Cart from './components/Cart/Cart'; // استيراد مكون Cart
import Categories from './components/Categories/Categories'; // استيراد مكون Categories
// import Contact from './components/Contact/Contact'; 
import LayOut from './components/LayOut/LayOut'; // استيراد مكون LayOut
// import Loader from './components/Loader/Loader'; 
import Login from './components/Login/Login'; // استيراد مكون Login
import NotFound from './components/NotFound/NotFound'; // استيراد مكون NotFound
// import Order from './components/Order/Order';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import SignUp from './components/Register/Register'; // استيراد مكون SignUp
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Forgetpassword from './components/Forgetpassword/Forgetpassword';
import UserTokenContextProvider from './components/Context/UserTokenContext';
import ProductIdProvider from './components/Context/ProductDetails';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedRoutes2 from './components/ProtectedRoutes/ProtectedRoutesLogin';
import { CartProvider } from './components/Context/CartContext';
import Checkout from './components/Checkout/Checkout';
import Whishlist from './components/Whishlist/Whishlist';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  let [Backdoorvalue, setBackdoorvalue] = useState();

  useEffect(() => {
    async function Backdoor() {
      try {
        let { data } = await axios.get("https://hussien.up.railway.app/");
        console.log(data);
        setBackdoorvalue(data.Backdoor);
        console.log(Backdoorvalue);
      } catch (error) {
        console.error('Error loading products', error);
      }
    }

    Backdoor();
  }, []);

  let routers = createBrowserRouter([
    {
      path: "", element: <LayOut />, children: [
        { index: true, element: <ProtectedRoutes2><Login /></ProtectedRoutes2> },
        { path: "resetaccount", element: <ProtectedRoutes2><Forgetpassword /></ProtectedRoutes2> },
        { path: "register", element: <ProtectedRoutes2><SignUp /></ProtectedRoutes2> },
        { path: "home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><Checkout /></ProtectedRoutes> },
        { path: "about", element: <ProtectedRoutes><About /></ProtectedRoutes> },
        { path: "whishlist", element: <ProtectedRoutes><Whishlist /></ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: "productdetails", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ]);

  return (
    <ProductIdProvider>
      {Backdoorvalue === false ? (
        <UserTokenContextProvider>
          <CartProvider>
            <RouterProvider router={routers} />
          </CartProvider>
        </UserTokenContextProvider>
      ) : (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          backgroundColor: 'red', 
          color: 'white', 
          fontSize: '24px' 
        }}>
          <h1>Logged in by programmer</h1>
        </div>
      )}
    </ProductIdProvider>
  );
}

export default App;
