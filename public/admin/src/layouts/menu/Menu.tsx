import { Outlet, useLocation, useNavigate } from "react-router-dom"
import "./Menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faAddressBook, faAddressCard, faCalendar, faChartBar, faNewspaper, faSignOutAlt, faTableTennis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LogOutModal from "../../components/logOutModal/LogOutModal";

const Menu = () => {
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();

    const clubsClassName = location.pathname === "/clubs"? "wrap-option menu-selected": "wrap-option"
    const seasonsClassName = location.pathname === "/seasons"? "wrap-option menu-selected": "wrap-option"
    const newsClassName = location.pathname === "/news"? "wrap-option menu-selected": "wrap-option"
    const adsClassName = location.pathname === "/ads"? "wrap-option menu-selected": "wrap-option"
    const measurersClassName = location.pathname === "/measurers"? "wrap-option menu-selected": "wrap-option"
    const statsClassName = location.pathname === "/stats"? "wrap-option menu-selected": "wrap-option"
    const adminsClassName = location.pathname === "/admins"? "wrap-option menu-selected": "wrap-option"
    
    const overlayClassName = showLogOutModal? "overlay": ""

    const navigateTo = (path: string): void => {
        navigate(path)
    }

    const handleModal = (): void => {
        setShowLogOutModal(!showLogOutModal)
    }

    return (
        <>
            <div className={overlayClassName} />
            
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

                    <div className={newsClassName}
                        onClick={() => navigateTo("/news")}>
                        <FontAwesomeIcon icon={faNewspaper} />
                        <span>
                            Novedades
                        </span>
                    </div>

                    <div className={adsClassName}
                        onClick={() => navigateTo("/ads")}>
                        <FontAwesomeIcon icon={faAd} />
                        <span>
                            Ads
                        </span>
                    </div>

                    <div className={measurersClassName}
                        onClick={() => navigateTo("/measurers")}>
                        <FontAwesomeIcon icon={faAddressBook} />
                        <span>
                            Medidores
                        </span>
                    </div>

                    <div className={statsClassName}
                        onClick={() => navigateTo("/stats")}>
                        <FontAwesomeIcon icon={faChartBar} />
                        <span>
                            Estadísticas
                        </span>
                    </div>

                    <div className={adminsClassName}
                        onClick={() => navigateTo("/admins")}>
                        <FontAwesomeIcon icon={faAddressCard} />
                        <span>
                            Administradores
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

            {showLogOutModal && <LogOutModal dismiss={handleModal} />}
        </>
    )
}

export default Menu