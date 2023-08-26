import { Outlet, useLocation } from "react-router-dom"
import "./Menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faAddressBook, faAddressCard, faCalendar, faChartBar, faNewspaper, faTableTennis } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
    const location = useLocation();
    console.log(location.pathname)

    const clubsClassName = location.pathname === "/clubs"? "wrap-option menu-selected": "wrap-option"
    const seasonsClassName = location.pathname === "/seasons"? "wrap-option menu-selected": "wrap-option"
    const newsClassName = location.pathname === "/news"? "wrap-option menu-selected": "wrap-option"
    const adsClassName = location.pathname === "/ads"? "wrap-option menu-selected": "wrap-option"
    const measurersClassName = location.pathname === "/measurers"? "wrap-option menu-selected": "wrap-option"
    const statsClassName = location.pathname === "/stats"? "wrap-option menu-selected": "wrap-option"
    const adminsClassName = location.pathname === "/admins"? "wrap-option menu-selected": "wrap-option"

    return (
        <div className="dashboard-container">
            <div className="menu-wrap">
                <img 
                    className='center' 
                    src='/logoIcon.svg' 
                    alt='GameMind' 
                />
                
                <div className={clubsClassName}>
                    <FontAwesomeIcon icon={faTableTennis} />
                    <span>
                        Clubes
                    </span>
                </div>

                <div className={seasonsClassName}>
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>
                        Temporadas
                    </span>
                </div>

                <div className={newsClassName}>
                    <FontAwesomeIcon icon={faNewspaper} />
                    <span>
                        Novedades
                    </span>
                </div>

                <div className={adsClassName}>
                    <FontAwesomeIcon icon={faAd} />
                    <span>
                        Ads
                    </span>
                </div>

                <div className={measurersClassName}>
                    <FontAwesomeIcon icon={faAddressBook} />
                    <span>
                        Medidores
                    </span>
                </div>

                <div className={statsClassName}>
                    <FontAwesomeIcon icon={faChartBar} />
                    <span>
                        Estadísticas
                    </span>
                </div>

                <div className={adminsClassName}>
                    <FontAwesomeIcon icon={faAddressCard} />
                    <span>
                        Administradores
                    </span>
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default Menu