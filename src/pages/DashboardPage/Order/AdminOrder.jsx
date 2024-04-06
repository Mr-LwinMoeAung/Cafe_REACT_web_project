import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function AdminOrder({ allUser, menu, getToppingName, order }) {
    const [formData, setFormData] = useState(null)
    const [sort, setSort] = useState('Latest')
    const token = window.localStorage.getItem('token')

    const handleSort = () => {
        //    todo 
    }

    const deleteOrder = async (orderItem) => {
        axios.delete(
            `https://bubble-tea-cafe-api-production.up.railway.app/api/order/${orderItem.Id}`,
            {
                headers: {
                    Authorization: `${token}`
                }
            }
        )
            .then((response) => {
                console.log("order_status", response)
            })
    }

    const handleSubmit = async (orderItem) => {
        setFormData({
            user_id: orderItem.user_id,
            menu_id: orderItem.menu_id,
            topping: orderItem.topping,
            quantity: orderItem.quantity,
            total: orderItem.total,
            status: "completed"
        })
        axios.put(
            `https://bubble-tea-cafe-api-production.up.railway.app/api/order/${orderItem.Id}`,
            formData,
            {
                headers: {
                    Authorization: `${token}`
                }
            }
        )
            .then((response) => {
                console.log("order_status", response)
            })
    }
    return (
        <>
            <div id="C4" class="item-order-part">
                <div className="item-order-header">
                    <h3>Pending Orders</h3>
                    <a onClick={() => handleSort()} className="item-sort-button" >Sort {sort}</a>
                </div>

                <div class="modify-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Menu</th>
                                <th>Toppings</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order ? (
                                    //todo split pending orders and completed orders
                                    order.map((o) =>
                                        (o.status == "pending")?.
                                            (
                                                <tr key={o.Id}>
                                                    <td>{allUser?.find(item => item.Id === o.user_id)?.username}</td>
                                                    <td>{menu?.find(item => item.Id === o.menu_id)?.name}</td>
                                                    <td>{getToppingName(o.topping)}</td>
                                                    <td>{o.quantity}</td>
                                                    <td>{o.total}</td>
                                                    <td>{o.status}</td>
                                                    <td>
                                                        <a className="update-order-btn" onClick={() => handleSubmit(o)}>Update</a>
                                                    </td>
                                                    <td>
                                                        <a className='delete-order-btn' onClick={() => deleteOrder(o)}>Delete</a>
                                                    </td>
                                                </tr>
                                            )
                                    )
                                ) : <tr>
                                    <td colSpan='8'>No Pending Order</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="C5" className="item-order-part">
                <div className="item-order-header">
                    <h3>Completed Orders</h3>
                    <a onClick={() => handleSort()} className="item-sort-button">Sort {sort}</a>
                </div>
                <div className="modify-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Menu</th>
                                <th>Toppings</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order ? (
                                    order.map((o) =>
                                        (o.status == "completed") ?
                                            (
                                                <tr key={o.Id}>
                                                    <td>{allUser?.find(item => item.Id === o.user_id)?.username}</td>
                                                    <td>{menu?.find(item => item.Id === o.menu_id)?.name}</td>
                                                    <td>{getToppingName(o.topping)}</td>
                                                    <td>{o.quantity}</td>
                                                    <td>{o.total}</td>
                                                    <td>{o.status}</td>
                                                    <td>
                                                        <a className='delete-order-btn' onClick={() => deleteOrder(o)}>Delete</a>
                                                    </td>
                                                </tr>
                                            ) : ('')
                                    )
                                ) : <tr>
                                    <td colSpan='7'>No Completed Order</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
