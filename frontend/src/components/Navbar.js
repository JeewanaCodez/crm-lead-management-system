import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("isLoggedIn");

        navigate("/");

    };

    return (

        <nav className="navbar">

            <h2>CRM Pro</h2>

            <div>

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/leads">
                    Leads
                </Link>

                <Link to="/create-lead">
                    Create Lead
                </Link>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;