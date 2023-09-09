import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import validator from "validator";
import './EmailForm.scss'

interface IEmailFormProps {
    onSubmit: () => void;
}

const EmailForm = ( { onSubmit }: IEmailFormProps ) => {
    const [ email, setEmail ] = useState('')
    const [ submitted, setSubmitted ] = useState(false)
    const [ validEmail, setValidEmail ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValidEmail(validator.isEmail(event.target.value))
        setEmail(event.target.value)
    } 

    const handleSubmit = () => {
        setSubmitted(true)
        if(validEmail){
            //send code
            setLoading(true)
            onSubmit()
        }
    }

    return (
        <div className="forgot-pwd-container">
            <img src="/src/assets/img/forgot-password-person.svg" />
            
            <div>
                <h1>
                    ¿Olvidaste tu contraseña?
                </h1>
                <h6>
                    Te enviaremos un código de verificación a tu correo electrónico para verificar tu identidad
                </h6>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>
                        Correo electrónico
                    </Form.Label>

                    <Form.Control 
                        required 
                        value={email}
                        type='email'
                        placeholder='Correo electrónico' 
                        onChange={handleEmailChange}
                    />
                    {submitted && !validEmail && 
                        <span className='text-error'>
                            Correo electrónico inválido
                        </span>
                    }
                </Form.Group>
                
                <Button 
                    disabled={loading} 
                    className='center mt-4 primary' 
                    variant='primary' 
                    onClick={handleSubmit}
                >
                    {loading?
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                        :
                        'Enviar código'
                    }
                </Button>
            </div>    
        </div>
    )
}

export default EmailForm