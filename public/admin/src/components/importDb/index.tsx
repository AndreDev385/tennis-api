import { Button } from "react-bootstrap"
import { importDb } from "../../services/importDb"
import { toast } from "react-toastify";

export const ImportDb = () => {

    const handleImportDb = async () => {
        const result = await importDb();
        if (result.isFailure) {
            toast.error(result.getErrorValue());
        }

        const blob = result.getValue();
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "display: none";
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = "db.zip";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <Button variant="primary" onClick={handleImportDb}>
                Importar base de datos
            </Button>
        </div>
    )
}
