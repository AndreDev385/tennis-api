import { Outlet, useLocation, useNavigate } from "react-router";

import "./index.scss";
import { faBaseballBall, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TournamentsSideBar() {
	const navigate = useNavigate();

	const navigateTo = (value: string) => {
		return navigate(`/dashboard/tournaments/${value}`);
	};

	const location = useLocation();

	//const selectedSection = (path: string) => {
	//	return location.pathname.includes(path) ? "menu-selected" : "";
	//};

	return (
		<div className="dashboard-container">
			<div className="menu-wrap">
				<div
					className={`${location.pathname === "/dashboard/tournaments/" && "menu-selected"} wrap-option`}
					onMouseDown={() => navigateTo("")}
				>
					<FontAwesomeIcon icon={faTrophy} />
					<span>Torneos</span>
				</div>
				<div
					className={`${location.pathname === "/dashboard/tournaments/matches" && "menu-selected"} wrap-option`}
					onMouseDown={() => navigateTo("matches")}
				>
					<FontAwesomeIcon icon={faBaseballBall} />
					<span>Partidos</span>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
