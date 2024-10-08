import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

export default function UpdateModal({ setIsOpen, open, children, setIsUpdate }) {
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
                <div className='modal-text'>Are you sure you want to update status?</div>
                <div className='buttons'>
                    <button className='button update' onClick={() => {
                        setIsUpdate(true)
                        setIsOpen(false)
                    }}>Update</button>
                    <button className='button cancel' onClick={() => setIsOpen(false)}>Cancel</button>
                </div>

                {children}
            </div>
        </>,
        document.getElementById("portal")
    )
}
