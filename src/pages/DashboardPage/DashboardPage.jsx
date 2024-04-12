import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { useCategory, useMenu, useTopping, useUserProfile } from '../../layouts/BaseLayout'
import './DashboardPage.css'
import axios from 'axios';
import UpperNavbar from '../../components/Admin/UpperNavbar';
import AdminOrder from './Order/AdminOrder';
import DeleteModal from '../../components/Modal/DeleteModal';

export default function DashboardPage() {
    const [menu] = useMenu()
    const [category] = useCategory()
    const [topping] = useTopping()
    const [user] = useUserProfile()
    const [allUser, setAllUser] = useState([]) 
    const [order, setOrder] = useState(null)
    const getOrder = async () => {
        try {
            const token = window.localStorage.getItem('token')
            const response = await axios.get("https://bubble-tea-cafe-api-production.up.railway.app/api/order",
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            )
            setOrder(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllUser = async () => {
        try {
            const token = window.localStorage.getItem('token')
            const response = await axios.get("https://bubble-tea-cafe-api-production.up.railway.app/api/auth/users"
                , {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            )
            setAllUser(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getToppingName = (toppingIds) => {
        return (
            toppingIds ? (
                toppingIds.map((tID) =>
                    topping.find(item => item.Id === tID)?.name
                ).join(', ')
            ) : ('')
        )
    }

    useEffect(() => {
        getAllUser()
        getOrder()
    }, [user, order])

   

    return (
        <>
           
            <div className="lma-admin-main-container">
                <AdminNavbar />
                <section className="main-category">
                    <UpperNavbar />

                    <div className="item-category">
                        <a href="/dashboard/menu">
                            <div className="item-menu-list">
                                <img
                                    className="img-category"
                                    src="/src/assets/img/checklist.png"
                                />
                                <p4
                                >{menu ? menu.length : 0} items<br />
                                    <span className="item-menu-watertext">Menu</span></p4
                                >
                            </div>
                        </a>
                        <a href="/dashboard/category">
                            <div className="item-menu-list">
                                <img
                                    className="img-category"
                                    src="/src/assets/img/categories.png"
                                />
                                <p4
                                >{category ? category.length : 0} Categories<br />
                                    <span className="item-menu-watertext">Category</span></p4
                                >
                            </div>
                        </a>
                        <a href="/dashboard">
                            <div className="item-menu-list">
                                <img
                                    className="img-category"
                                    src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/purchase_order-512.png"
                                />
                                <p4
                                >{order ? order.length : 0} Orders<br />
                                    <span className="item-menu-watertext">Orders</span></p4
                                >
                            </div>
                        </a>
                        <a href="/dashboard">
                            <div className="item-menu-list">
                                <img
                                    className="img-category"
                                    src="/src/assets/img/user.png"
                                />
                                <p4
                                >{allUser ? allUser.length : 0} <br />
                                    <span className="item-menu-watertext">Clients</span></p4
                                >
                            </div>
                        </a>
                    </div>
                    <AdminOrder allUser={allUser} menu={menu} getToppingName={getToppingName} order={order} setOrder={setOrder} />
                </section>
            </div>
        </>
    )
}