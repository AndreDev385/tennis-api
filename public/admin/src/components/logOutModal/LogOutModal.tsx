import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import "./LogOutModal.scss"

interface LogOutProps {
    dismiss: () => void;
}

const LogOutModal = ({dismiss}: LogOutProps) => {

    const navigate = useNavigate();

    const logOut = (): void => {
        navigate("/")
    }

    return (
        <div className="modal show wrap-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Cerrar Sesión
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>¿Estás seguro que deseas cerrar sesión?</p>
                </Modal.Body>

                <Modal.Footer onClick={dismiss}>
                    <Button variant="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={logOut} variant="primary">
                        Cerrar sesión
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default LogOutModal