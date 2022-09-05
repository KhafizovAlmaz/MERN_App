import React, { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export const NavBar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const handleLogout = (event) => {
       event.preventDefault()
       auth.logout()
       navigate("/", { replace: true });
    }

    return (
        <nav>
    <div class="nav-wrapper blue lighten-1" style={{padding: "0 2rem"}}>
      <span class="brand-logo">Сокращение ссылок</span>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><NavLink to="/create">Создать</NavLink></li>
        <li><NavLink to="/links">Ссылки</NavLink></li>
        <li><a href="/" onClick={handleLogout}>Выйти</a></li>
      </ul>
    </div>
  </nav>
    )
}