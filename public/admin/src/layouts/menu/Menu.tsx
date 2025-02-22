import { Outlet, useLocation, useNavigate } from "react-router-dom"
import "./Menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faAddressBook, faAddressCard, faBaseballBall, faCalendar, faDatabase, faNewspaper, faPoll, faSignOutAlt, faStickyNote, faTableTennis, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ModalQuestion from "../../components/modalQuestion/ModalQuestion";

const Menu = () => {
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const authorization = localStorage.getItem('authorization');
        if (!authorization) logOut();
    })

    const clubsClassName = location.pathname === "/clubs" ? "wrap-option menu-selected" : "wrap-option"
    const seasonsClassName = location.pathname === "/seasons" ? "wrap-option menu-selected" : "wrap-option"
    const teamsClassName = location.pathname === "/teams" ? "wrap-option menu-selected" : "wrap-option"
    const resultsClassName = location.pathname === "/results" ? "wrap-option menu-selected" : "wrap-option"
    const playersClassName = location.pathname === "/players" ? "wrap-option menu-selected" : "wrap-option"
    const trackersClassName = location.pathname === "/trackers" ? "wrap-option menu-selected" : "wrap-option"
    const adminsClassName = location.pathname === "/admins" ? "wrap-option menu-selected" : "wrap-option"
    const newsClassName = location.pathname === "/news" ? "wrap-option menu-selected" : "wrap-option"
    const adsClassName = location.pathname === "/ads" ? "wrap-option menu-selected" : "wrap-option"
    const rankingClassName = location.pathname === "/ranking" ? "wrap-option menu-selected" : "wrap-option"
    const notificationsClassName = location.pathname === "/notifications" ? "wrap-option menu-selected" : "wrap-option"
    const databaseClassName = location.pathname === "/database" ? "wrap-option menu-selected" : "wrap-option"

    const navigateTo = (path: string): void => {
        navigate(path)
    }

    const dismissModal = (): void => {
        setShowLogOutModal(false)
    }

    const logOut = (): void => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <>
            <div className="dashboard-container">
                <div className="menu-wrap">
                    <img className='center'
                        src='/logoIcon.svg'
                        alt='GameMind'
                    />

                    <div className={clubsClassName}
                        onClick={() => navigateTo("/clubs")}>
                        <FontAwesomeIcon icon={faTableTennis} />
                        <span>
                            Clubes
                        </span>
                    </div>

                    <div className={seasonsClassName}
                        onClick={() => navigateTo("/seasons")}>
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>
                            Temporadas
                        </span>
                    </div>

                    <div className={teamsClassName}
                        onClick={() => navigateTo("/teams")}>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>
                            Equipos
                        </span>
                    </div>

                    <div className={resultsClassName}
                        onClick={() => navigateTo("/results")}>
                        <FontAwesomeIcon icon={faPoll} />
                        <span>
                            Resultados
                        </span>
                    </div>

                    <div className={rankingClassName}
                        onClick={() => navigateTo("/ranking")}>
                        <FontAwesomeIcon icon={faTrophy} />
                        <span>
                            Ranking
                        </span>
                    </div>

                    <div className={playersClassName}
                        onClick={() => navigateTo("/players")}>
                        <FontAwesomeIcon icon={faBaseballBall} />
                        <span>
                            Jugadores
                        </span>
                    </div>

                    <div className={trackersClassName}
                        onClick={() => navigateTo("/trackers")}>
                        <FontAwesomeIcon icon={faAddressBook} />
                        <span>
                            Medidores
                        </span>
                    </div>

                    <div className={adminsClassName}
                        onClick={() => navigateTo("/admins")}>
                        <FontAwesomeIcon icon={faAddressCard} />
                        <span>
                            Administradores
                        </span>
                    </div>

                    <div className={newsClassName}
                        onClick={() => navigateTo("/news")}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>
                            Eventos
                        </span>
                    </div>

                    <div className={adsClassName}
                        onClick={() => navigateTo("/ads")}>
                        <FontAwesomeIcon icon={faAd} />
                        <span>
                            Ads
                        </span>
                    </div>

                    <div className={notificationsClassName}
                        onClick={() => navigateTo("/notifications")}>
                        <FontAwesomeIcon icon={faStickyNote} />
                        <span>
                            Notificaciones
                        </span>
                    </div>

                    <div className={databaseClassName}
                        onClick={() => navigateTo("/database")}>
                        <FontAwesomeIcon icon={faDatabase} />
                        <span>
                            Base de Datos
                        </span>
                    </div>
                    <div className="wrap-logout"
                        onClick={() => setShowLogOutModal(true)}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>
                            Cerrar sesión
                        </span>
                    </div>
                </div>

                <Outlet />
            </div>


            {showLogOutModal &&
                <ModalQuestion
                    title="Cerrar sesión"
                    question="¿Estás seguro que quieres cerrar sesión?"
                    dismiss={dismissModal}
                    accept={logOut}
                />}
        </>
    )
}

export default Menu
