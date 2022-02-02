import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Navbar(props) {

    const {setUsuario} = useContext(UserContext);

    function cerrarSesion(){
        setUsuario(null);
    }

    return (<>
        {/* Preloader */}
        <div className="preloader flex-column justify-content-center align-items-center">
          <img className="animation__shake" src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
        </div>
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
            </li>
            
          </ul>

          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Navbar Search */}
            <li className="nav-item">
              <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                <i className="fas fa-search" />
              </a>
              <div className="navbar-search-block">
                <form className="form-inline">
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search" />
                      </button>
                      <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            
            {/* Messages Dropdown Menu */}
            
            {/* Notifications Dropdown Menu */}
            

            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                <i className="fas fa-th-large" />
              </a>
            </li>
            <li className="nav-item dropdown" onClick={cerrarSesion}>
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="fas fa-sign-out-alt"></i>
                        </a>
                    </li>
          </ul>
        </nav>
        {/* /.navbar */}
    </>)
}