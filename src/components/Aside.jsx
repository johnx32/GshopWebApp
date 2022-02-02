import { Link } from "react-router-dom";

export default function Aside(props) {
    return (<>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
                {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} /> */}
                <span className="brand-text font-weight-light">Gshop Admin</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="https://cdn-icons-png.flaticon.com/512/64/64572.png" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Alexander Pierce</a>
                    </div>
                </div>
                {/* SidebarSearch Form */}
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                        
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                {/* <i className="nav-icon fas fa-th"></i> */}
                                <i className="nav-icon fas fa-home"></i>
                                <p>
                                    Home
                                    {/* <span className="right badge badge-danger">New</span> */}
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/usuarios" className="nav-link">
                                {/* <i className="nav-icon fas fa-th"></i> */}
                                <i className="nav-icon fas fa-users"></i>
                                <p>
                                    Usuarios
                                    {/* <span className="right badge badge-danger">New</span> */}
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/productos" className="nav-link">
                                {/* <i className="nav-icon fas fa-th"></i> */}
                                <i className="nav-icon fas fa-box"></i>
                                <p>
                                    Productos
                                    {/* <span className="right badge badge-danger">New</span> */}
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/categorias" className="nav-link">
                                {/* <i className="nav-icon fas fa-th"></i> */}
                                <i className="nav-icon fas fa-cubes"></i>
                                <p>
                                    Categorias
                                    {/* <span className="right badge badge-danger">New</span> */}
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                {/* <i className="nav-icon fas fa-th"></i> */}
                                <i className="nav-icon fas fa-question-circle"></i>
                                <p>
                                    About
                                    {/* <span className="right badge badge-danger">New</span> */}
                                </p>
                            </Link>
                        </li>


                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    </>)
}