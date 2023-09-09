import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";

interface ILoginProps {
    setVerified: Dispatch<SetStateAction<boolean>>;
    setToken: Dispatch<SetStateAction<string>>;
}

const Login = ({setVerified, setToken}: ILoginProps) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = (event: any) => {
      setSubmitted(true)
      if(validEmail && validPassword){
        setLoading(true)
        login()
      }
      event.preventDefault();
      event.stopPropagation();
    };
  
  
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValidEmail(validator.isEmail(event.target.value))
      setForm((prev) => ({
        ...prev,
        email: event.target.value
      }))
    }
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValidPassword(event.target.value.length > 0)
      setForm((prev) => ({
        ...prev,
        password: event.target.value
      }))
    }

    const login = async () => {
        try{
            const url = "https://gamemind-app-7ce0a0ff4c64.herokuapp.com/api/v1/users/login"
            
            const response = await fetch(url,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            
            const data = await response.json()

            if (response.status === 200 && data.access_token){
                setToken(data.access_token)
                setLoading(false)
                setVerified(true)
            } else {
                if(data.message) toast.error(data.message)
                setLoading(false)
            }
            
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <div className="m-3">
            <h1 className="mb-3">
                Eliminar mi cuenta
            </h1>
            <h6>
                Primero debemos verificar tu identidad.
            </h6>
            <span>
                Por favor inicia sesión con tu correo electrónico y contraseña
            </span>

            <Form className='m-3'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>
                    Correo electrónico
                    </Form.Label>

                    <Form.Control 
                    required 
                    value={form.email}
                    type='email'
                    placeholder='Correo electrónico' 
                    onChange={handleEmailChange}
                    />
                    {submitted && !validEmail && <span className='text-error'>
                    Correo electrónico inválido
                    </span>}
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>
                    Contraseña
                    </Form.Label>

                    <Form.Control 
                    required 
                    value={form.password}
                    type='password' 
                    placeholder='Contraseña'
                    onChange={handlePasswordChange}
                    />

                    {submitted && !validPassword && <span className='text-error'>
                    Contraseña requerida
                    </span>}
                </Form.Group>

                <Button 
                    disabled={loading} 
                    className='center mt-3 primary' 
                    variant='primary' 
                    onClick={handleSubmit}
                >
                    {loading?
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                    :
                    'Iniciar sesión'
                    }
                </Button>
            </Form>
            
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
        </div>
    )
}

export default Login