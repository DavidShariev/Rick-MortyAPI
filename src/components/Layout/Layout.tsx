import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'



const Layout = () => {
    return (
        <div>
            <Sidebar/>

            <Outlet />

        </div>
    )
}

export default Layout;