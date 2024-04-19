import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteModal from "../../../components/Modal/DeleteModal";
import UpdateModal from "../../../components/Modal/UpdateModal";

export default function AdminOrder({ allUser, menu, getToppingName, order, setOrder }) {
    const [sort, setSort] = useState('Latest')
    const [isOpen, setIsOpen] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [selectOrder,setSelectOrder] = useState(null)
    const token = window.localStorage.getItem('token')
    const handleSort = () => {
        //    todo 
    }

    const deleteOrder = async (orderItemId) => {
        axios.delete(
            `https://bubble-tea-cafe-api-production.up.railway.app/api/order/${orderItemId}`,
            {
                headers: {
                    Authorization: `${token}`
                }
            }
        )
            .then((response) => {
                console.log("order_status", response)
                if (response.status === 200) {
                    setOrder(prevMenu => prevMenu.filter(item => item.Id !== orderItemId));
                }
            })
    }

    const handleSubmit = async (orderItem) => {
        console.log("o =", orderItem)
        const formData = {
            user_id: orderItem.user_id,
            menu_id: orderItem.menu_id,
            topping: orderItem.topping,
            quantity: orderItem.quantity,
            total: orderItem.total,
            status: "completed"
        }
        console.log(formData)
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

    useEffect(() => {
        if (isDelete) {
            deleteOrder(orderId)
        }

        if(isUpdate){
            handleSubmit(selectOrder)
        }
    }, [isDelete,isUpdate])

    return (
        <>
            <DeleteModal open={isOpen} setIsOpen={setIsOpen} setIsDelete={setIsDelete} />
            <UpdateModal open= {isUpdateOpen} setIsOpen={setIsUpdateOpen} setIsUpdate={setIsUpdate} />
            <div id="C4" className="item-order-part">
                <div className="item-order-header">
                    <h3>Pending Orders</h3>
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
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order && order.some((o) => o.status == "pending") ? (
                                    //todo split pending orders and completed orders
                                    order.map((o) => (o.status == "pending") ?
                                        (
                                            <tr key={o.Id}>
                                                <td>{allUser?.find(item => item.Id === o.user_id)?.username}</td>
                                                <td>{menu?.find(item => item.Id === o.menu_id)?.name}</td>
                                                <td>{getToppingName(o.topping)}</td>
                                                <td>{o.quantity}</td>
                                                <td>{o.total}</td>
                                                <td>{o.status}</td>
                                                <td>
                                                    <a className="update-order-btn" onClick={() =>{ setIsUpdateOpen(true)
                                                    setSelectOrder(o)
                                                    }
                                                    }>Update</a>
                                                </td>
                                                <td>
                                                    <a className='delete-order-btn' onClick={() => {
                                                        setIsOpen(true)
                                                        setOrderId(o.Id)
                                                    }
                                                    }>Delete</a>
                                                </td>
                                            </tr>
                                        ) : null
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
                                order && order.some((o) => o.status == "completed") ? (
                                    order.map((o) => (o.status == "completed") ?
                                        (
                                            <tr key={o.Id}>
                                                <td>{allUser?.find(item => item.Id === o.user_id)?.username}</td>
                                                <td>{menu?.find(item => item.Id === o.menu_id)?.name}</td>
                                                <td>{getToppingName(o.topping)}</td>
                                                <td>{o.quantity}</td>
                                                <td>{o.total}</td>
                                                <td>{o.status}</td>
                                                <td>
                                                    <a className='delete-order-btn' onClick={() => {
                                                        setIsOpen(true)
                                                        setOrderId(o.Id)
                                                    }
                                                    }>Delete</a>
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
