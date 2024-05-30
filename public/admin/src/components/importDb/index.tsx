import { Button } from "react-bootstrap"
import { importDb } from "../../services/importDb"

export const ImportDb = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <Button variant="primary" onClick={() => importDb()}>
                Importar base de datos
            </Button>
        </div>
    )
}
