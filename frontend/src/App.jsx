import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
useSelector
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.js";
import RootPage from "./pages/RootPage.jsx";
import ErrorPage from "./UI/ErrorPage.jsx";
import LoginPage from "./pages/AuthenticationPages/LoginPage.jsx";
import SignupPage from "./pages/AuthenticationPages/SignupPage.jsx";
import PrivateRoute from "./pages/AuthenticationPages/PrivateRoute.jsx";
import UserPage from "./pages/UserPage.jsx";
// import Home from './components/Home/Home';
import HomePage from "./pages/HomePage.jsx";
import DiscountPage from "./pages/DiscountPage.jsx";
import TestimonialPage from "./pages/TestimonialPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ShopDesPage, { loader as shopLoader } from "./pages/ShopDesPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import Wishlist from "./components/wishlist/Wishlist.jsx";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "user", // This is the protected route
        element: (
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: "discount",
        element: <DiscountPage />,
      },
      {
        path: "testimonial",
        element: <TestimonialPage />,
      },
      {
        path: "shop",

        children: [
          {
            index: true, // This is the default route for "/shop"
            element: <ShopPage />,
          },
          {
            path: "cart",
            element: <CartPage />,

          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
          {
            path: ":id", // Dynamic segment for shop description
            id: 'shop-details',
            element: <ShopDesPage />,
            loader: shopLoader,

          }

        ]
      },


      // other routes...
    ],
  },
  // {
  //   path: 'discount',

  //   errorElement: <ErrorPage />,
  //   children : [
  //     {
  //       path: '',
  //       element: <HomePage />
  //     }
  //   ]
  // }
]);


function App() {
  // const darkMode = useSelector((state) => state.theme.darkMode);
  // console.log('darkModeAppppp:', darkMode);
  return (
    // <div className={darkMode ? 'dark-theme' : ''}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    // </div>
  );
}

export default App;