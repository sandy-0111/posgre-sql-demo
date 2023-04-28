import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'

const PublicLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default PublicLayout