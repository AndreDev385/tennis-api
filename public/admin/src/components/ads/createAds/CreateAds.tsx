import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { IAds, IClub } from "../../../types/interfaces";
import { VITE_SERVER_URL } from "../../../env/env.prod";

interface ICreateAdsProps {
    dismiss: (event: boolean) => void;
    clubs: IClub[];
}

const CreateAds = ({ clubs, dismiss }: ICreateAdsProps) => {
    const [form, setForm] = useState<IAds>({
        adId: "",
        clubId: "",
        link: "",
        image: ""
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState("")
    const token: string = localStorage.getItem('authorization') || '';

    const handleChangeClub = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value;
        setForm((prev) => ({
            ...prev,
            clubId: value
        }))
    }

    const handleChangeLink = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setForm((prev) => ({
            ...prev,
            link: value
        }))
    }

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files && files[0]) {
            const value = files[0]
            const objectUrl = URL.createObjectURL(value)
            setForm((prev) => ({
                ...prev,
                image: value
            }))
            setPreview(objectUrl)
        }
    }

    const handleSubmit = () => {
        setSubmitted(true);
        if (!form.clubId || !form.link || !form.image) return;
        setLoading(true)
        createAds()
    }

    const createAds = async () => {
        const url = `${VITE_SERVER_URL}/api/v1/ads`

        let formData = new FormData();
        formData.append("clubId", form.clubId)
        formData.append("link", form.link)
        formData.append("image", form.image)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: formData
        };

        try {
            const response = await fetch(url, requestOptions);

            const data = await response.json();

            if (response.status === 200) {
                if (data.message) toast.success(data.message);
                setLoading(false);
                dismiss(true);
            } else {
                setLoading(false);
                if (data.message) toast.error(data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    return (
        <>
            <div className="overlay" />

            <div className="modal show wrap-modal edit-ads">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>
                            Crear ads
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>
                                    Club asociado
                                </Form.Label>

                                <Form.Select
                                    required
                                    value={form.clubId}
                                    placeholder='Club asociado'
                                    onChange={handleChangeClub}
                                >
                                    <option disabled value="">Selecciona un club</option>
                                    {clubs.map(item => {
                                        return <option key={item.clubId} value={item.clubId}>{item.name}</option>
                                    })}
                                </Form.Select>
                                {submitted && !form.clubId &&
                                    <span className='ms-2 text-error'>
                                        Club requerido
                                    </span>
                                }
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formLink'>
                                <Form.Label>
                                    Link
                                </Form.Label>

                                <Form.Control
                                    required
                                    type="url"
                                    value={form.link}
                                    placeholder='Link'
                                    onChange={handleChangeLink}
                                />
                                {submitted && !form.link &&
                                    <span className='ms-2 text-error'>
                                        Link requerido
                                    </span>
                                }
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formImage'>
                                <Form.Label>
                                    Imagen
                                </Form.Label>

                                <Form.Control
                                    required
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    placeholder='Imagen'
                                    onChange={handleChangeImage}
                                />
                                {submitted && !form.image &&
                                    <span className='ms-2 text-error'>
                                        Imagen requerida
                                    </span>
                                }
                                <img src={preview} className="center" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => dismiss(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={() => handleSubmit()} variant="primary">
                            {loading ?
                                <FontAwesomeIcon icon={faCircleNotch} spin /> :
                                <span>
                                    <FontAwesomeIcon className='me-2' icon={faPlus} />
                                    Crear ads
                                </span>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default CreateAds
