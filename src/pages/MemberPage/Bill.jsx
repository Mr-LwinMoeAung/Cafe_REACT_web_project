import axios from "axios"
import { useEffect, useState } from "react"

export default function Bill({ menu, handleResponse, topping, setHandleResponse }) {
    const [menuNames, setMenuNames] = useState([])
    const [price, setPrice] = useState([])
    const [toppingPrice, setToppingPrice] = useState([])
    const [imageUrl, setImageUrl] = useState([])
    const [toppingNames, setToppingNames] = useState([])
    const [totalItemCost, setTotalItemCost] = useState(0)
    const [taxCost, setTaxCost] = useState(0)
    const [totalToppingPrice, setTotalToppingPrice] = useState(0)
    const [total, setTotal] = useState(0)

    const deleteAllItem = async () => {
        try {
            const token = window.localStorage.getItem('token')
            axios.delete(
                `https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-all-from-cart`,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            ).then((response) => {
                setHandleResponse([])
                setTaxCost(0)
                setTotalItemCost(0)
                console.log("response", response)
            })
        }
        catch (error) {
            console.log(error)
        }
    };

    const deleteItem = async (id) => {
        try {
            const token = window.localStorage.getItem('token')
            axios.delete(
                `https://bubble-tea-cafe-api-production.up.railway.app/api/auth/remove-from-cart/${id}`,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            ).then(() => {
                //window.location.href = '/member'
                if (Array.isArray(handleResponse)) {
                    setHandleResponse(handleResponse.filter((hr) => hr.Id !== id));
                  }
                console.log("response = ", id)
                console.log("handleResponse", handleResponse)
            })
        }
        catch (error) {
            console.log(error)
        }
    };

    const postOrder = async (handleResponse) => {
        try {
            // Iterate over each item in the cart
            for (const item of handleResponse) {
                // Create the payload object for the POST request
                const payload = {
                    user_id: item.user_id,
                    menu_id: item.menu_id,
                    quantity: item.quantity,
                    total: total,
                    topping: item.topping,
                    comment: item.comment,
                    status: "pending"
                };

                // Make the POST request to the API endpoint
                const token = window.localStorage.getItem('token')
                const result = await axios.post('https://bubble-tea-cafe-api-production.up.railway.app/api/order', payload,
                    {
                        headers: {
                            Authorization: `${token}`
                        }
                    }
                )
            }
            await deleteAllItem()
            console.log('Item posted successfully:', result.data);
            window.location.href = "/member"
        }
        catch (error) {
            // Handle any errors
            console.error('Error posting Order items:', error);
        }
    };

    let removeCartRendered = false
    useEffect(() => {
        console.log("Response changed")
    }, [handleResponse])

    useEffect(() => {
        const menuNameMap = {}
        const toppingNameMap = {}
        const toppingPriceMap = {}
        const priceNameMap = {}
        const imageNameMap = {}
        menu ? (menu.forEach((menuItem) => {
            menuNameMap[menuItem.Id] = menuItem.name
            priceNameMap[menuItem.Id] = menuItem.price
            imageNameMap[menuItem.Id] = menuItem.image
        }
        )) : ("")

        topping ? (topping.forEach((toppingItem) => {
            toppingNameMap[toppingItem.Id] = toppingItem.name
            toppingPriceMap[toppingItem.Id] = toppingItem.price
        })) : ("")

        setMenuNames(menuNameMap)
        setToppingNames(toppingNameMap)
        setToppingPrice(toppingPriceMap)
        setImageUrl(imageNameMap)
        setPrice(priceNameMap)
    }, [menu])

    useEffect(() => {
        console.log(handleResponse)
        let value = 0
        let tvalue = 0
        handleResponse? (handleResponse.map((r) => {
            let itemPrice = price[r.menu_id] * r.quantity
            r.topping ? (r.topping.map((tp) => {
                tvalue =tvalue+ toppingPrice[tp] * r.quantity
            })) : ('')
            value = value + itemPrice 
        })) : ('')
        setTotalItemCost(value)
        setTaxCost(totalItemCost * 0.1)
        setTotalToppingPrice(tvalue)
        setTotal(totalItemCost + taxCost+totalToppingPrice)
    }, [handleResponse])

    return (
        <div className="bills-part">
            <h3 className="bills-header">Bills</h3>
            {
                handleResponse? (handleResponse.map((r) => (
                    <div className="bills-coffee" key={r.Id}>
                        <img
                            className="bills-coffee-img"
                            src={`${imageUrl[r.menu_id]}`}
                        />
                        <div className="bills-coffee-texts">
                            <h1>{menuNames[r.menu_id]}</h1>
                            <p className="bills-quantity-price">
                                <small className="bills-quantity"><b>x{r.quantity}</b></small>
                                {
                                    r.topping ? (r.topping.map((rt) => (
                                        <span className="bills-note" key={rt}>{toppingNames[rt]}</span>
                                    ))
                                    ) : ('')
                                }
                                {
                                    removeCartRendered = true
                                }
                                <small>${price[r.menu_id] * r.quantity}</small>
                            </p>
                        </div>
                        <div className="bills-delete-item">
                            <button onClick={() => deleteItem(r.Id)}>X</button>
                        </div>
                    </div>

                ))) : ('')
            }

            {
                removeCartRendered && handleResponse? (
                    <div className="bills-cart">
                        <a href="#" className="remove-cart" onClick={() => deleteAllItem()}>Remove Cart</a>
                    </div>
                ) : ('')
            }

            <div className="bills-total">
                <div className="bills-text"><p>Total Topping Price</p><span className="subtotal">${totalToppingPrice.toFixed(2)}</span></div>
                <div className="bills-text"><p>SubTotal</p><span className="subtotal">${totalItemCost.toFixed(2)}</span></div>
                <div className="bills-text"><p>Tax(10%)</p> <span className="tax">${taxCost.toFixed(2)}</span></div>
                <hr />
                <div className="bills-text"><p>Total</p><span className="total">${(totalItemCost + taxCost+totalToppingPrice).toFixed(2)}</span></div>
            </div>

            <div className="payment">
                {/* <h1>Payment Method</h1>
                <div className="payment-methods">
                    <div className="payment-cash">
                        <a className="payment-a" href="#">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/10529/10529540.png"
                            />
                            <p>cash</p>
                        </a>
                    </div>
                    <div className="payment-cash">
                        <a className="payment-a" href="#">
                            <img
                                src="https://cdn-icons-png.freepik.com/512/9361/9361196.png"
                            />
                            <p>Card</p>
                        </a>
                    </div>
                    <div className="payment-cash">
                        <a className="payment-a" href="#">
                            <img
                                src="https://cdn-icons-png.freepik.com/512/8312/8312969.png"
                            />
                            <p>E-Wallet</p>
                        </a>
                    </div>
                </div> */}
                <a className="add-t-b-a" onClick={() => postOrder(handleResponse)}>
                    <p className="add-to-billing">Order Now</p>
                </a>
            </div>
        </div>
    )
}