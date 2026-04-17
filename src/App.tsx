import './App.css'
import Layout from "./layout/Layout.tsx";
import Home from "./pages/Home.tsx";
import ThemeSwitcher from "./components/header/ThemeSwitcher.tsx";
import Error from "./components/common/Error.tsx";
import {useState} from "react";
import {BookStoreThemeProvider, ThemeContext} from "./context/themeContext.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Signup from "./pages/Signup.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Login from "./pages/Login.tsx";
import Books from "./pages/Books.tsx";
import BookDetail from "./components/books/BookDetail.tsx";
import Cart from "./pages/Cart.tsx";
import Order from "./pages/Order.tsx";
import OrderList from "./pages/OrderList.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient.ts";
import ToastContainer from "@/components/common/toast/ToastContainer.tsx";


const routeList = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/books",
        element: <Books/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/reset",
        element: <ResetPassword/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/book/:bookId",
        element: <BookDetail/>
    },
    {
        path: "/carts",
        element: <Cart/>
    },
    {
        path: "/order",
        element: <Order/>
    },
    {
        path: "/orderlist",
        element: <OrderList/>
    }
]

const newRouteList = routeList.map((item) => {
    return {
        ...item,
        element: <Layout>{item.element}</Layout>,
        errorElement: <Error/>
    }
})

const router = createBrowserRouter(newRouteList)

function App() {
    const [themeName, setThemeName] = useState(ThemeContext)

  return (
      <QueryClientProvider client={queryClient}>
          <BookStoreThemeProvider>
              <ThemeSwitcher />
              <RouterProvider router={router}/>
              <ToastContainer/>
          </BookStoreThemeProvider>
      </QueryClientProvider>
  )
}

export default App
