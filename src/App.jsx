import "./i18n.jsx";
import React, { Children } from 'react';
import LayOut from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Proudcts from './Component/Product/Products';
import Brand from './Component/Brand/Brand';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Notfound from './Component/Notfound/Notfound';
import SignIn from './Component/SignIn/Signin';
import SignUp from './Component/SignUp/SignUp';
import Profile from "./Component/Profile/profile";
import Wishlist from "./Component/Wishlist/Wishlist";
import { WishlistProvider } from './Context/WishlistContext';


import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const route = createBrowserRouter([
  {path:"",element:<LayOut/>, children:[
    {index:true, element:<Home/>},
    {path:"products", element:<Proudcts/>},
    {path:"productDetails/:id", element:<ProductDetails/>},
    {path:"brand", element:<Brand/>},
    {path:"*", element:<Notfound/>},
    {path:"signIn", element:<SignIn/>},
    {path:"signUp", element:<SignUp/>},
    { path: "Profile", element: <Profile /> },
    {path:"wishlist", element:<Wishlist/>},
  ]},
])


export default function App() {
  return (
  <WishlistProvider>
      <RouterProvider router={route}/>  
    </WishlistProvider>
  )
}
