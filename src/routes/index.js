import { Suspense } from "react";
import Home from "../pages/home";
import { publicRoutes } from "./router"
import { Route, Routes } from 'react-router-dom'
import PublicLayout from "../layout/PublicLayout";

const Routing = ({ ...props }) => {
    return (
        <Suspense fallback={<div>Loading...</div>} >
            <Routes>
                <Route path='/' element={<PublicLayout />} >
                    {publicRoutes(true).map(({ id, ...otherProps }) => <Route index key={id} {...otherProps} />)}
                </Route>
            </Routes>
        </Suspense>
    )
}
export default Routing;