import { useState } from 'react'
import '../App.css'
import Modal from '../components/Modal/DeleteModal'
export default function PopUpPage() {
    const [isOpen, setIsOpen] = useState(false)
    const Button_Wrapper_Styles = {
        position: 'relative',
        zIndex: 1
    }

    const Other_Content_Styles = {
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'red',
        padding: '10px'
    }
    return (
        <>
            <div style={Button_Wrapper_Styles}>
                <button onClick={() => setIsOpen(true)}>Open Modal</button>
            </div>
            <Modal open={isOpen} onClose={()=>setIsOpen(false)} >Fancy Modal
            </Modal>
            <div style={Other_Content_Styles}>
                Other Content

            </div>
        </>
    )
}