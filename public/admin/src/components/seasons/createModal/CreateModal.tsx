import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'

interface CreateModalProps {
    dismiss: (event: boolean) => void;
}

const CreateModal = ({dismiss}: CreateModalProps ) => {

    const [ form, setForm ] = useState({ name: "" })
    const [ validName, setValidName ] = useState(false)
    const [ submitted, setSubmitted ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length > 0 ) setValidName(true)
        else setValidName(false)
        setForm((prev) => ({
          ...prev,
          name: value
        }))
    }

    const handleSubmit = (): void =>{
        setSubmitted(true)
        if (!validName) return;
        // TODO create season
        setLoading(true)
        dismiss(true)
    }

    return (
        <>
            <div className="overlay" />

            <div className="modal show wrap-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>
                            Crear temporada
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>
                                    Nombre
                                </Form.Label>

                                <Form.Control 
                                    required 
                                    value={form.name}
                                    type='text'
                                    placeholder='Nombre' 
                                    onChange={handleNameChange}
                                />
                                { submitted && !validName &&
                                    <span className='ms-2 text-error'>
                                        Nombre requerido
                                    </span>
                                }
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
                                    <FontAwesomeIcon className='me-1' icon={faPlus} />
                                    Crear temporada
                                </span>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default CreateModal