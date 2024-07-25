import { Link } from "react-router-dom";
import logo from "../assets/react.svg";

function Header() {
  return (
    <>
      <header className="p-4 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom bg-light shadow-sm">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <Link to={"/main/"} className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <p>Car Store</p>
              </Link>
            </div>
            <div className="col-md-6 text-end">
              <Link to={"/"} className="text-dark">
                <button className="btn btn-primary me-2">Войти</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
