export function ErrorMessage(msg: string) {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <h3 style={{ color: "red" }}>{msg}</h3>
        </div>
    );
}
