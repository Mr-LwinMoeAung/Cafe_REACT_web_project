import { Link } from "react-router-dom";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import { useCategory } from "../../../layouts/BaseLayout";
import './Category.css'
import UpperNavbar from "../../../components/Admin/UpperNavbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Category() {
    const [categories,setCategories] = useCategory()
    const deleteItem = async (id) => {
        try {
            const token = window.localStorage.getItem('token')
            axios.delete(
                `https://bubble-tea-cafe-api-production.up.railway.app/api/category/${id}`,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            ).then((response) => {
                console.log(response)
                if (response.status === 200) {
                    setCategories(prevMenu => prevMenu.filter(item => item.Id !== id));
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="category-table">
                <AdminNavbar />
                <section className="main-category">
                    <UpperNavbar />
                    <div className="item-category-part">
                        <h3>Categories</h3>
                        <div className="modify-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories ? (
                                            categories.map((c) =>
                                            (
                                                <tr key={c.Id}>
                                                    <td>{c.name}</td>
                                                    <td>
                                                        <Link className='table-btn edit-category-btn' to={`/dashboard/category/editCategory/${c.Id}`}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <a className="table-btn delete-category-btn" onClick={() => deleteItem(c.Id)}>Delete</a>
                                                    </td>
                                                </tr>
                                            )
                                            )) : (<tr>
                                            <td colSpan="3">
                                                No Category
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="table-create-category">
                            <Link className='table-btn create-category-btn' to={`/dashboard/category/createCategory`}>Create Category</Link>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}