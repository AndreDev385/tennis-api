import { faCircleNotch, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { getClubsList } from "../../services/club/getClubList";
import { Loading } from "../shared/loading";
import { ErrorMessage } from "../shared/errorMessage";
import { IClub } from "../../types/interfaces";
import { sendNotifications } from "../../services/sendNotifications";
import { toast } from "react-toastify";

type State = {
    loading: boolean;
    error: string;
};

const Notifications = () => {
    const [state, setState] = useState<State>({
        loading: true,
        error: "",
    });

    const [clubs, setClubs] = useState<Array<IClub>>([]);

    async function getData() {
        const result = await getClubsList({ isSubscribed: true });

        if (result.isFailure) {
            setState({
                loading: false,
                error: result.getErrorValue()!,
            });
            return;
        }

        setClubs(result.getValue());

        setState({
            loading: false,
            error: "",
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setState((prev) => ({ ...prev, loading: true }));

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }

        const formData = {
            clubId: form.club.value,
            title: form.header.value,
            body: form.body.value,
        };

        const result = await sendNotifications(formData);

        setState((prev) => ({ ...prev, loading: false }));

        if (result.isFailure) {
            toast.error(result.getErrorValue());
            return
        }

        const value: { fails: number; successes: number } = result.getValue();

        if (value.fails > 0) {
            toast.warning(
                `Error al enviar ${value.fails} notificaci${value.fails > 1 ? "ones" : "ón"}`
            );
        }
        if (value.successes > 0) {
            toast.success(
                `Exito al enviar ${value.successes} notificaci${value.successes > 1 ? "ones" : "ón"}`
            );
        }
    };

    function renderState() {
        if (state.loading) {
            return Loading();
        }
        if (state.error.length > 0) {
            return ErrorMessage(state.error);
        }
        return (
            <Form onSubmit={handleSubmit}>
                <h2></h2>
                <Form.Group className="mb-3">
                    <Form.Label>Club asociado</Form.Label>
                    <Form.Select name="club" required>
                        <option disabled value="">
                            Selecciona un club
                        </option>
                        {clubs.map((item) => {
                            return (
                                <option key={item.clubId} value={item.clubId}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control name="header" required />
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control name="body" />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button type="submit">
                        {state.loading ? (
                            <FontAwesomeIcon icon={faCircleNotch} />
                        ) : (
                            "Enviar"
                        )}
                    </Button>
                </div>
            </Form>
        );
    }

    return (
        <div>
            <div>
                <h1>
                    <FontAwesomeIcon icon={faStickyNote} />
                    Notificaciones
                </h1>
            </div>
            <Card className="p-5">{renderState()}</Card>
        </div>
    );
};

export { Notifications };
