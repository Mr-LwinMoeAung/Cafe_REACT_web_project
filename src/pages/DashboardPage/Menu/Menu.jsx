import { Link } from "react-router-dom"
import { useMenu } from "../../../layouts/BaseLayout"
import AdminNavbar from "../../../components/Admin/AdminNavbar"
import './Menu.css'
import UpperNavbar from "../../../components/Admin/UpperNavbar"
import axios from "axios"
import { useEffect, useState } from "react"
import DeleteModal from "../../../components/Modal/DeleteModal"

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false)
    const [isDelete,setIsDelete] = useState(false)
    const [menuId,setMenuId] = useState(null)
    const [menu, setMenu] = useMenu()
    const deleteItem = async (id) => {
        try {
            const token = window.localStorage.getItem('token')
            axios.delete(
                `https://bubble-tea-cafe-api-production.up.railway.app/api/menu/${id}`,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            ).then((response) => {
                if (response.status === 200) {
                    setMenu(prevMenu => prevMenu.filter(item => item.Id !== id));
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{
        if(isDelete){
            deleteItem(menuId)
        }
    },[isDelete])
    return (
        <>
            <DeleteModal open={isOpen} setIsOpen={setIsOpen} setIsDelete={setIsDelete} />
            <div className="menu-table">
                <AdminNavbar />
                <section className="main-category">
                    <UpperNavbar />
                    <div className="item-menu-part">
                        <h3>Menu</h3>
                        <div className="modify-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        menu ? (
                                            menu.map((m) =>
                                            (
                                                <tr key={m.Id}>
                                                    <td>{m.name}</td>
                                                    <td className="row-data-image-block">
                                                        <img className="row-data-image" src={`${m.image}`} alt={`${m.name}`} />
                                                    </td>
                                                    <td>{m.description}</td>
                                                    <td>{m.category}</td>
                                                    <td>{m.price}</td>
                                                    <td>
                                                        <Link className='table-btn edit-menu-btn' to={`/dashboard/menu/editMenu/${m.Id}`}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <a className="table-btn delete-menu-btn" onClick={() => {
                                                            setIsOpen(true)
                                                            setMenuId(m.Id)
                                                        }}>Delete</a>
                                                    </td>
                                                </tr>
                                            )
                                            )) : <tr>
                                            <td colSpan='7'>
                                                No Menu
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="table-create-menu">
                            <Link className='table-btn create-menu-btn' to={`/dashboard/menu/createMenu`}>Create Menu</Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}