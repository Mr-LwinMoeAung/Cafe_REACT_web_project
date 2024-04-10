import { handleLogout } from "../Navbar/Navbar";
import './AdminNavbar.css'

export default function AdminNavbar() {
    return (
        <nav className="main-nav">
            <div className="logo">
                <a className="logo-link" href="/">
                    <img
                        className="navimg"
                        src="https://clipart-library.com/img/1695731.png"
                    />
                </a>
            </div>
            <div className="nav-items">
                <a className="logo-link" href="/dashboard">
                    <img
                        className="navimg"
                        src="/src/assets/img/home.png"
                    />
                    <p>Home</p>
                </a>
            </div>
            <div className="nav-items">
                <a className="logo-link" href="/dashboard/menu">
                    <img
                        className="navimg"
                        src="/src/assets/img/clipboard.png"
                    />
                    <p>Menu</p>
                </a>
            </div>
            <div className="nav-items">
                <a className="logo-link" href="/dashboard/category">
                    <img
                        className="navimg"
                        src="/src/assets/img/category.png"
                    />
                    <p>Categories</p>
                </a>
            </div>
            <div className="nav-items">
                <a className="logo-link" href="/dashboard/topping">
                    <img
                        className="navimg"
                        src="/src/assets/img/topping.png"
                    />
                    <p>Toppings</p>
                </a>
            </div>
            <div className="nav-items">
                <a className="logo-link" href="/" onClick={handleLogout}>
                    <img
                        className="navimg"
                        src="/src/assets/img/logout.png"
                    />
                    <p>Logout</p>
                </a>
            </div>
        </nav>
    )
}