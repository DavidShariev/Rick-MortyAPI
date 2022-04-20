import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Header: FC = () => {
    return (
        <header className="header">
            <NavLink to="/characters">characters</NavLink>
            <NavLink to="/locations">locations</NavLink>
            <NavLink to="/episodes">episodes</NavLink>
        </header>
    )
}

export default Header