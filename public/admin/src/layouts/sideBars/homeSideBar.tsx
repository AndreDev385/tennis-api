import { faAddressBook, faAddressCard, faDatabase, faSignOutAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useLocation, useNavigate } from "react-router";

import "./index.scss";
import { useState } from "react";
import ModalQuestion from "../../components/modalQuestion/ModalQuestion";

export function HomeSideBar() {

  const [logOutModal, setLogOutModal] = useState({
    visible: false,
  })

  const dismissModal = (): void => {
    setLogOutModal({ visible: false });
  }

  const logOut = (): void => {
    localStorage.clear()
    navigate("/")
  }

  const navigate = useNavigate();

  const navigateTo = (value: string) => {
    return navigate(`/dashboard/home/${value}`);
  }

  const location = useLocation();
  const selectedSection = (path: string) => {
    return location.pathname.includes(path) ? "menu-selected" : "";
  }

  return (
    <>
      {logOutModal.visible &&
        <ModalQuestion
          title="Cerrar sesión"
          question="¿Estás seguro que quieres cerrar sesión?"
          dismiss={dismissModal}
          accept={logOut}
        />}
      <div className="dashboard-container">
        <div className="menu-wrap">

          <div className={`${selectedSection("users")} wrap-option`}
            onClick={() => navigateTo("users")}>
            <FontAwesomeIcon icon={faUsers} />
            <span>
              Usuarios
            </span>
          </div>

          <div className={`${selectedSection("trackers")} wrap-option`}
            onClick={() => navigateTo("trackers")}>
            <FontAwesomeIcon icon={faAddressBook} />
            <span>
              Medidores
            </span>
          </div>

          <div className={`${selectedSection("admins")} wrap-option`}
            onClick={() => navigateTo("admins")}>
            <FontAwesomeIcon icon={faAddressCard} />
            <span>
              Administradores
            </span>
          </div>

          <div className="wrap-option"
            onClick={() => navigateTo("/database")}>
            <FontAwesomeIcon icon={faDatabase} />
            <span>
              Base de Datos
            </span>
          </div>

          <div className="wrap-logout"
            onClick={() => setLogOutModal({ visible: true })}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>
              Cerrar sesión
            </span>
          </div>

        </div>
        <Outlet />
      </div>
    </>
  )
}
