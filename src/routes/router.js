
import { lazy } from "react";

const Home = lazy(()=> import("../pages/home"))
const AboutUs = lazy(()=> import("../pages/about-us"))

export const router = [
    {
        id : 'home',
        path : '/',
        isPublic : true,
        element : <Home />
    },
    {
        id : 'about',
        path : '/about',
        isPublic : true,
        element : <AboutUs />
    }
]

export const publicRoutes = (isPublic)=> router.filter((item)=> item.isPublic===isPublic)

