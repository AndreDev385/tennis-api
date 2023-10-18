import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import validator from "validator";

interface ICreateAdminProps {
    dismiss: (event: boolean) => void;
}

const createAdmin = ({dismiss}: ICreateAdminProps) => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: ""
    })

    const [ submitted, setSubmitted ] = useState(false)
    const [ validEmail, setValidEmail] = useState(false);
    const [ validPassword, setValidPassword]  = useState(false);
    const [ validRepeatPassword, setValidRepeatPassword ] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const token: string = localStorage.getItem('authorization') || '';
    
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
    
        setValidPassword(validator.isStrongPassword(value, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        }))
    
        setForm((prev) => ({
          ...prev,
          password: value
        }))
    }

    const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setForm((prev) => ({
            ...prev,
            firstName: value
        }))
    }

    const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setForm((prev) => ({
            ...prev,
            lastName: value
        }))
    }
    
    const onChangeRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValidRepeatPassword(value === form.password)
        setForm((prev) => ({
            ...prev,
            repeatPassword: value
        }))
    }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValidEmail(validator.isEmail(event.target.value))
        setForm((prev) => ({
          ...prev,
          email: event.target.value
        }))
    }

    const handleSubmit = () => {
        setSubmitted(true);
        if (!form.firstName || !form.lastName || !validEmail || !validPassword || !validRepeatPassword) return;
        setLoading(true)
        createAdmin()
    }

    const createAdmin = async () => {
        const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/users/admin`
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
            console.error(error);
        }
    }

    return (
        <>
            <div className="overlay" />

            <div className="modal show wrap-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>
                            Crear administrador
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className='mb-3' controlId='formFirstName'>
                                <Form.Label>
                                    Nombre
                                </Form.Label>

                                <Form.Control 
                                    required 
                                    type="text"
                                    value={form.firstName}
                                    placeholder='Nombre' 
                                    onChange={onChangeFirstName}
                                />
                                { submitted && !form.firstName &&
                                    <span className='ms-2 text-error'>
                                        Nombre es requerido
                                    </span>
                                }
                            </Form.Group>
                            
                            <Form.Group className='mb-3' controlId='formLastName'>
                                <Form.Label>
                                    Apellido
                                </Form.Label>

                                <Form.Control 
                                    required 
                                    type="text"
                                    value={form.lastName}
                                    placeholder='Apellido' 
                                    onChange={onChangeLastName}
                                />
                                { submitted && !form.firstName &&
                                    <span className='ms-2 text-error'>
                                        Apellido es requerido
                                    </span>
                                }
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formEmail'>
                                <Form.Label>
                                    Correo electrónico
                                </Form.Label>

                                <Form.Control 
                                    required 
                                    type="text"
                                    value={form.email}
                                    placeholder='Correo electrónico' 
                                    onChange={onChangeEmail}
                                />
                                { submitted && !validEmail &&
                                    <span className='ms-2 text-error'>
                                        Correo electrónico inválido
                                    </span>
                                }
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formPassword'>
                                <Form.Label>
                                    Contraseña
                                </Form.Label>

                                <Form.Control 
                                    required 
                                    type="password"
                                    value={form.password}
                                    placeholder='Contraseña' 
                                    onChange={onChangePassword}
                                />
                                {submitted && !validPassword && 
                                <span className='text-error'>
                                    Debe tener un minimo de 8 caracteres, 1 letra minuscula, 1 letra mayuscula, 1 numero y 1 caracter especial.
                                </span>}
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formRepeatPassword'>
                                <Form.Label>
                                    Repetir contraseña
                                </Form.Label>

                                <Form.Control 
                                    required 
                                    type="password"
                                    value={form.repeatPassword}
                                    placeholder='Repetir contraseña' 
                                    onChange={onChangeRepeatPassword}
                                />
                                {submitted && !validRepeatPassword && 
                                <span className='text-error'>
                                    Contraseñas no coinciden
                                </span>}
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
                                    <FontAwesomeIcon className='me-2' icon={faPlus} />
                                    Crear medidor
                                </span>
                            }
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default createAdmin