import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { VITE_SERVER_URL } from '../../../env/env.prod';

interface ICreateModalProps {
    dismiss: (event: boolean) => void;
}

const CreateModal = ({dismiss}: ICreateModalProps ) => {

    const [ form, setForm ] = useState({ name: "" })
    const [ validName, setValidName ] = useState(false)
    const [ submitted, setSubmitted ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const token: string = localStorage.getItem('authorization') || '';
    
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
        setLoading(true)
        createSeason()
    }

    const createSeason = async () => {
        const url = `${VITE_SERVER_URL}/api/v1/season/`
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(form)
        };
    
        try{
          const response = await fetch(url, requestOptions);
          
          const data = await response.json();
    
          if (response.status === 200){
            if(data.message) toast.success(data.message);
            setLoading(false);
            dismiss(true);
          } else {
            setLoading(false);
            if(data.message) toast.error(data.message);
          }
        } catch (error) {
            setLoading(false);
        }
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
                                    Nombre de la temporada
                                </Form.Label>

                                <Form.Control 
                                    required 
                                    value={form.name}
                                    type='text'
                                    placeholder='Nombre de la temporada' 
                                    onChange={handleNameChange}
                                />
                                { submitted && !validName &&
                                    <span className='ms-2 text-error'>
                                        Nombre de la temporada requerido
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