import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react"
import { Button, Form } from "react-bootstrap"
import validator from "validator";
import './EmailForm.scss'
import { toast } from "react-toastify";
import { VITE_SERVER_URL } from "../../../env/env.prod";

interface IEmailFormProps {
    onSubmit: () => void;
    email: string,
    setEmail: Dispatch<SetStateAction<string>>;
}

const EmailForm = ( { onSubmit, email, setEmail }: IEmailFormProps ) => {
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
            setLoading(true)
            sendVerificationCode()
        }
    }

    const sendVerificationCode = async () => {
        const url = `${VITE_SERVER_URL}/api/v1/users/forget-password`
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email: email})
        };
    
        try{
          const response = await fetch(url, requestOptions)
          
          const data = await response.json()
    
          if (response.status === 200){
            if(data.message) toast.success(data.message)
            setLoading(false)
            onSubmit()
          } else {
            if(data.message) toast.error(data.message)
            setLoading(false)
          }
        } catch (error) {
            toast.error('Ha ocurrido un error, intente nuevamente')
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <div className="forgot-pwd-container">
            <img src="/src/assets/img/forgot-password-person.svg" />
            
            <div>
                <h2>
                    ¿Olvidaste tu contraseña?
                </h2>
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