import React from 'react'

class Sidebar extends React.Component {
    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Master</span>
                        <a className="d-flex align-items-center text-muted" href="#"></a>
                    </h5>

                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard"> List Company </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/employee"> List Employee </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/menu"> List Menu </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/product"> List Product </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/role"> List Role </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/unit"> List Unit </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user"> List User </a>
                        </li>
                    </ul>

                    <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Transaction</span>
                        <a className="d-flex align-items-center text-muted" href="#"></a>
                    </h5>

                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="/event"> Transaction event Request </a>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }

}

export default Sidebar
