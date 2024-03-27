import axios from "axios"
import './CreateMenu.css'
import { useEffect,useState } from "react"
import { useCategory, useMenu } from "../../../layouts/BaseLayout"
import { useParams } from "react-router-dom"
import AdminNavbar from "../../../components/Admin/AdminNavbar"

export default function EditMenu() {
    const { id } = useParams()
    console.log(id)
    const menu = useMenu()
    const category = useCategory()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: ""
    })

    useEffect(() => {
        if (menu) {
            const menuItem = menu.find(m => m.Id == id);
            if (menuItem) {
                setFormData({
                    name: menuItem.name,
                    description: menuItem.description,
                    price: menuItem.price,
                    category: menuItem.category,
                    image: menuItem.image
                });
            }
        }
    }, [menu, id]); 

    console.log("FormData",formData)

    const handleChange = (e) => {
        const value = e.target.value
        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const price = parseFloat(formData.price);

        const menuData = {
            name: formData.name,
            description: formData.description,
            price: price, // Send price as float instead of string
            category: formData.category,
            image: formData.image
        };
        try {
            const token = window.localStorage.getItem('token')
            axios.put(
                `https://bubble-tea-cafe-api-production.up.railway.app/api/menu/${id}`,
                menuData, {
                headers: {
                    Authorization: `${token}`
                }
            }
            ).then((response) => {
                window.location.href = '/dashboard/menu'
                console.log(response)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <AdminNavbar/>
            <div className="create-menu-container">
                <h2 className="create-menu-h2">Create Menu Item</h2>
                <form className="create-menu-form" id="menuForm" method="post" onSubmit={handleSubmit}>
                    <label className="create-menu-label" htmlFor="name">Name:</label>
                    <input className="create-menu-input" type="text" id="name" name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required />

                    <label className="create-menu-label" htmlFor="description">Description:</label>
                    <textarea id="description" className="create-menu-input" name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4" required></textarea>

                    <label className="create-menu-label" htmlFor="price">Price:</label>
                    <input className="create-menu-input" type="number" id="price" name="price" min="0" step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        required />

                    <label className="create-menu-label" htmlFor="category">Category:</label>
                    <select id="category" className="create-menu-input" name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required>
                        <option value="">Select Category</option>
                        {category ? (category.map((c) => <option key={`${c.Id}`} value={`${c.name}`}>{c.name}</option>)) : ("")}
                    </select>

                    <label className="create-menu-label" htmlFor="imageURL">Image URL:</label>
                    <input
                        type="url"
                        className="create-menu-input"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        required
                    />

                    <button className="create-menu-button" type="submit">Add Menu Item</button>
                </form>
            </div >
        </>
    )
}