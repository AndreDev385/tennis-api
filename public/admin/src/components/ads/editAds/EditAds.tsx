import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IClub } from "../../clubs/Clubs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faPencil} from "@fortawesome/free-solid-svg-icons";
import'../Ads.scss';

interface IEditAdsProps {
    id: string;
    dismiss: (event: boolean) => void;
}

const EditAds = ({id, dismiss}: IEditAdsProps) => {
    const [ads, setAds] = useState({
        adId: "",
        clubId: "",
        link: "",
        image: ""
    })
    const [ submitted, setSubmitted ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ preview, setPreview ] = useState("")

    const clubs : IClub[] = [
        {
          id: "1",
          name: "Club A",
          code: "ABCDEF",
          isSubscribed: false
        },
        {
          id: "2",
          name: "Club B",
          code: "JFOXMX",
          isSubscribed: true
        },
        {
          id: "3",
          name: "Club C",
          code: "PWEOKD",
          isSubscribed: true
        },
      ]

    const handleChangeClub = (event: React.ChangeEvent<HTMLSelectElement>):void => {
        const value = event.target.value;
        setAds((prev) => ({
          ...prev,
          clubId: value
        }))
    }

    const handleChangeLink = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const value = event.target.value;
        setAds((prev) => ({
          ...prev,
          link: value
        }))
    }

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const files = event.target.files;
        if(files && files[0]){
            const value = files[0]
            const objectUrl = URL.createObjectURL(value)
            setAds((prev) => ({
              ...prev,
              image: event.target.value
            }))
            setPreview(objectUrl)
        }

    }

    const handleSubmit = () => {
        setSubmitted(true);
        if (!ads.clubId || !ads.link || !ads.image) return;
        setLoading(true)
        // TODO fetch data
        dismiss(true)
    }

    return (
        <>
            <div className="overlay" />

            <div className="modal show wrap-modal edit-ads">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>
                            <FontAwesomeIcon className='me-2' icon={faPencil} />
                            Editar anuncio
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
                                    value={ads.clubId}
                                    placeholder='Club asociado' 
                                    onChange={handleChangeClub}
                                >
                                    <option disabled value="">Selecciona un club</option>
                                    {clubs.map(item => {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </Form.Select>
                                { submitted && !ads.clubId &&
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
                                    value={ads.link}
                                    placeholder='Link' 
                                    onChange={handleChangeLink}
                                />
                                { submitted && !ads.link &&
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
                                    value={ads.image}
                                    placeholder='Imagen' 
                                    onChange={handleChangeImage}
                                />
                                { submitted && !ads.image &&
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
                            {loading?
                                <FontAwesomeIcon icon={faCircleNotch} spin />:
                                <span>
                                    <FontAwesomeIcon className='me-2' icon={faPencil} />
                                    Editar anuncio
                                </span>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default EditAds