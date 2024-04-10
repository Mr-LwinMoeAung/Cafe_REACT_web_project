import './UpperNavbar.css'
export default function UpperNavbar() {
    return (
        <>
            <div className="upper-nav">
                <div className="upper-nav-inside">

                    <h1>Admin Dashboard</h1>
                    <a className="user-profile-link" href="#">
                        <img
                            className="user-profile-img"
                            src="https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4382.jpg"
                        />
                    </a>
                </div>
            </div>
        </>
    )
}