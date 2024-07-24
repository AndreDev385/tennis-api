import {
	faAd,
	faBaseballBall,
	faCalendar,
	faNewspaper,
	faPoll,
	faStickyNote,
	faTableTennis,
	faTrophy,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useLocation, useNavigate } from "react-router";

import "./index.scss";

export function LeagueSideBar() {
	const navigate = useNavigate();

	const navigateTo = (value: string) => {
		return navigate(`/dashboard/league/${value}`);
	};

	const location = useLocation();
	const selectedSection = (path: string) => {
		return location.pathname.includes(path) ? "menu-selected" : "";
	};

	return (
		<div className="dashboard-container">
			<div className="menu-wrap">
				<div
					className={`${selectedSection("clubs")} wrap-option`}
					onMouseDown={() => navigateTo("clubs")}
				>
					<FontAwesomeIcon icon={faTableTennis} />
					<span>Clubs</span>
				</div>

				<div
					className={`${selectedSection("seasons")} wrap-option`}
					onMouseDown={() => navigateTo("seasons")}
				>
					<FontAwesomeIcon icon={faCalendar} />
					<span>Temporadas</span>
				</div>

				<div
					className={`${selectedSection("news")} wrap-option`}
					onMouseDown={() => navigateTo("news")}
				>
					<FontAwesomeIcon icon={faNewspaper} />
					<span>Novedades de Club</span>
				</div>

				<div
					className={`${selectedSection("ads")} wrap-option`}
					onMouseDown={() => navigateTo("ads")}
				>
					<FontAwesomeIcon icon={faAd} />
					<span>Club ads</span>
				</div>

				<div
					className={`${selectedSection("teams")} wrap-option`}
					onMouseDown={() => navigateTo("teams")}
				>
					<FontAwesomeIcon icon={faUsers} />
					<span>Equipos</span>
				</div>

				<div
					className={`${selectedSection("results")} wrap-option`}
					onMouseDown={() => navigateTo("results")}
				>
					<FontAwesomeIcon icon={faPoll} />
					<span>Resultados</span>
				</div>

				<div
					className={`${selectedSection("players")} wrap-option`}
					onMouseDown={() => navigateTo("players")}
				>
					<FontAwesomeIcon icon={faBaseballBall} />
					<span>Jugadores</span>
				</div>

				<div
					className={`${selectedSection("notifications")} wrap-option`}
					onMouseDown={() => navigateTo("notifications")}
				>
					<FontAwesomeIcon icon={faStickyNote} />
					<span>Notificaciones</span>
				</div>

				<div
					className={`${selectedSection("ranking")} wrap-option`}
					onMouseDown={() => navigateTo("ranking")}
				>
					<FontAwesomeIcon icon={faTrophy} />
					<span>Ranking</span>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
