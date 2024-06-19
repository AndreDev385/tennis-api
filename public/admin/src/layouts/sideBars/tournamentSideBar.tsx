import { Outlet, useLocation, useNavigate } from "react-router";

import "./index.scss";
import { faPoll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TournamentsSideBar() {

  const navigate = useNavigate();

  const navigateTo = (value: string) => {
    return navigate(`/dashboard/league/${value}`);
  }

  const location = useLocation();
  const selectedSection = (path: string) => {
    return location.pathname.includes(path) ? "menu-selected" : "";
  }

  return (
    <div className="dashboard-container">
      <div className="menu-wrap">

        <div className={`${selectedSection("list")} wrap-option`}
          onClick={() => navigateTo("list")}>
          <FontAwesomeIcon icon={faPoll} />
          <span>
            Torneos
          </span>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
