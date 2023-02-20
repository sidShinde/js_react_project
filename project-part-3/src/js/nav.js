import { Outlet, Link, useLocation } from "react-router-dom";
import "../css/nav.css";

const Nav = () => {
  const currentRoute = useLocation().pathname.toLowerCase();

  return (
    <>
      <nav>
        <table className="nav-bar">
          <thead>
            <tr>
              <td
                className={`border-right ${
                  currentRoute.includes("chat") ? "active-tab" : "tab"
                }`}
              >
                <Link className={`nav-link`} to="/chat">
                  Group Chat
                </Link>
              </td>
              <td
                className={`border-right ${
                  currentRoute.includes("users") ? "active-tab" : "tab"
                }`}
              >
                <Link className={`nav-link`} to="/users">
                  Manage Users
                </Link>
              </td>
              <td
                className={`border-right ${
                  currentRoute.includes("documents") ? "active-tab" : "tab"
                }`}
              >
                <Link className={`nav-link`} to="/documents">
                  Manage Documents
                </Link>
              </td>
              <td>
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </td>
            </tr>
          </thead>
        </table>
      </nav>

      <Outlet />
    </>
  );
};

export default Nav;
