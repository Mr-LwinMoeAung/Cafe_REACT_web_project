import { Link } from "react-router-dom";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import { useTopping } from "../../../layouts/BaseLayout";
import './Topping.css'
import UpperNavbar from "../../../components/Admin/UpperNavbar";
import axios from "axios";

export default function Topping() {
    const toppings = useTopping()
    const deleteItem = async (id) => {
        try {
            const token = window.localStorage.getItem('token')
            axios.delete(
                `https://bubble-tea-cafe-api-production.up.railway.app/api/topping/${id}`,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            ).then((response) => {
                console.log(response)
            })
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="topping-table">
                <AdminNavbar />
                <section className="main-category">
                    <UpperNavbar />
                    <div className="item-topping-part">
                        <h3>Toppings</h3>
                        <div className="modify-table">
                            <table>
                                <thead>
                                    <tr>
                                        {/* <th>Id</th> */}
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        toppings ? (
                                            toppings.map((t) =>
                                            (
                                                <tr key={t.Id}>
                                                    <td>{t.name}</td>
                                                    <td>{t.price}</td>
                                                    <td>
                                                        <Link className='table-btn edit-topping-btn' to={`/dashboard/topping/editTopping/${t.Id}`}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <a className="table-btn delete-topping-btn" onClick={() => deleteItem(t.Id)}>Delete</a>
                                                    </td>
                                                </tr>
                                            )
                                            )) : <tr>
                                            <td colSpan="4">
                                                No Topping
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="table-create-topping">
                            <Link className='table-btn create-topping-btn' to={`/dashboard/topping/createTopping`}>Create Topping</Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}