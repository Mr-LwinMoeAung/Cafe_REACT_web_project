import axios from "axios"
import { useEffect, useState } from 'react'
export default function MainMenu({ menu, topping, category, handleResponse, setHandleResponse }) {

    const [selectedCategory, setSelectedCategory] = useState("")
    const [count, setCount] = useState([])
    const [selectedTopping, setSelectedTopping] = useState([])
    useEffect(() => {
        if (menu) {
            const initialCounts = {};
            menu.forEach((m) => {
                initialCounts[m.Id] = 1;
            });
            setCount(initialCounts);
        }
    }, [menu]);

    const handlePositiveChange = (menuId) => {
        setCount(prevCount => ({
            ...prevCount,
            [menuId]: prevCount[menuId] + 1
        }));
    };

    const handleNegativeChange = (menuId, newCount) => {
        if (newCount > 1) {
            setCount(prevCount => (
                {
                    ...prevCount,
                    [menuId]: prevCount[menuId] - 1
                }));
        }
    };

    const handleTopping = (toppingId, menuItemId) => {
        const newSelectedTopping = [...selectedTopping];
        console.log(newSelectedTopping)
        const index = newSelectedTopping.findIndex((item) => item.menuItemId === menuItemId);
        if (index !== -1) {
            if (newSelectedTopping[index].toppingIds.includes(toppingId)) {
                newSelectedTopping[index].toppingIds = newSelectedTopping[index].toppingIds.filter((id) => id !== toppingId);
            } else {
                newSelectedTopping[index].toppingIds.push(toppingId);
            }
        } else {
            newSelectedTopping.push({
                menuItemId: menuItemId,
                toppingIds: [toppingId],
            });
        }
        setSelectedTopping(newSelectedTopping);
    };

    const postCartToAPI = async (menuId) => {
        try {
            const index = [...selectedTopping].findIndex((item) => item.menuItemId === menuId);
            const newItem = {
                menu_id: menuId,
                quantity: count[menuId],
                topping: selectedTopping?.[index]?.['toppingIds'] || [],
                comment: ""
            }
            // Make the POST request to the API endpoint
            const token = window.localStorage.getItem('token')
            await axios.post('https://bubble-tea-cafe-api-production.up.railway.app/api/auth/add-to-cart', newItem,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            ).then((response) => {
                console.log('Item posted successfully:', response.data.data);
                setHandleResponse(prevHandleResponse => [...prevHandleResponse, response.data.data])
                console.log(handleResponse)
            });


        } catch (error) {
            console.error('Error posting cart items:', error);
        }

    };

    return (
        <section className="main-category">
            <h1>Choose Category</h1>

            <div className="item-category">
                <a href="#" onClick={() => setSelectedCategory("All")}>
                    <div className="item-menu-list">
                        <p>All</p>
                    </div>
                </a>
                {
                    category ? (category.map((c) =>
                        <a href="#" key={c.Id} onClick={() => setSelectedCategory(c.name)}>
                            <div className="item-menu-list">
                                <p>{c.name}</p>
                            </div>
                        </a>
                    )) : ("No Category")
                }
            </div>

            {/* <!-- coffee menu --> */}
            <div className="coffee-menu">
                <h3>Coffee Menu</h3>
                <div className="coffee-container">
                    {
                        menu ? (
                            menu.map((m) =>
                                (!selectedCategory || selectedCategory === "All" || selectedCategory === m.category) ? (
                                    <div className="coffee-container1" key={m.Id}>
                                        <div className="coffee-img-text">
                                            <img
                                                className="lattle-box"
                                                src={`${m.image}`}
                                            />
                                            <div className="inside-text">
                                                <p className="header-menu"><b>{m.name}</b></p>
                                                <p className="coffee-des">
                                                    {m.description}
                                                </p>

                                                <p className="coffee-price">
                                                    <b>
                                                        price: <small><sup>$</sup></small>
                                                        {m.price}
                                                    </b>
                                                </p>
                                            </div>
                                            <div className="coffee-mood-size-sugar-ice">
                                                <div className="mood">
                                                    <p><b>Quantity</b></p>
                                                    <div className="type-select type-select-emoji">
                                                        <button className='add-button' onClick={() => handlePositiveChange(m.Id)}>+</button>
                                                        <p className='count'>{count[m.Id]}</p>
                                                        <button className='minus-button' onClick={() => handleNegativeChange(m.Id, count[m.Id])}>-</button>
                                                    </div>
                                                </div>

                                                <div className="mood">
                                                    <p><b>Toppings</b></p>
                                                    <div className="type-select">
                                                        {topping ? (
                                                            topping.map((t) => (
                                                                <div key={t.Id}>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={t.Id}
                                                                        value={t.name}
                                                                        checked={selectedTopping[m.Id]?.includes(t.Id)}
                                                                        onChange={() => handleTopping(t.Id, m.Id)}
                                                                    />
                                                                    <label htmlFor={t.Id}>{t.name}</label>
                                                                </div>
                                                            ))
                                                        ) : ("")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a className="add-t-b-a" href="#" onClick={() => postCartToAPI(m.Id)}>
                                            <p className="add-to-billing">Add to Cart</p>
                                        </a>
                                    </div>
                                ) : (
                                    ""
                                )
                            )
                        ) : (
                            "No menu"
                        )

                    }
                </div>
            </div>
        </section>
    )
}