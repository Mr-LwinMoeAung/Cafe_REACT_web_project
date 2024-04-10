import Card from '../components/Card/Card'
import '../App.css'
import { useMenu } from '../layouts/BaseLayout'
export default function MenuPage() {
    const [menu] =  useMenu()
    return (
        <>
            <div className="container">
                <div id='menu' className="special-menu">
                    <div className="title">Special Menu <span>for you</span></div>
                    <div className="cards">
                        {menu ?
                        (menu.map((m) => <Card key={m.Id} rating={"4.9"} name={m.name} price={m.price} img={m.image} description={m.description} /> ))
                        :("No item in the menu list")} 
                    </div>
                </div>
            </div>
        </>
    )
}