import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

export default function DeleteModal({ setIsOpen, open, children, setIsDelete }) {
    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: '#fff',
        padding: '50px',
        zIndex: 1000
    }
    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.7)',
        zIndex: 1000
    }

    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES} className='box'>
                <div className='modal-text'>Are you sure you want to delete this item?</div>
                <div className='buttons'>
                    <button className='button delete' onClick={() => {
                        setIsDelete(true)
                        setIsOpen(false)
                    }}>Delete</button>
                    <button className='button' onClick={() => setIsOpen(false)}>Cancel</button>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}
