import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import './Login.scss'
import { toast } from 'react-toastify';
import { VITE_SERVER_URL } from '../../env/env.prod';

const Login = () => {

  const navigate = useNavigate();

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

  const login = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/users/login`
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    };

    try{
      const response = await fetch(url, requestOptions)
      
      const data = await response.json()

      if (response.status === 200 && data.access_token){
          setLoading(false)
          localStorage.setItem('authorization', data.access_token);
          navigate("/clubs")
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

  return ( 
    <Row >
      <Col xs={12} sm={7} lg={6} className='login-container center'>
        <img className='center' src='/gameMindLogo.svg' alt='GameMind' />
        <small className='center text-center mt-3'>
          Admin Dashboard
        </small>
        <Form className='mt-5'>
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

          <Button className='end' variant='link' onClick={() => navigate('/forgot/password')}>
            ¿Olvidaste tu contraseña?
          </Button>

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
      </Col>
      <Col sm={5} lg={6} className='login-img-wrap'>
        <h2>
          Desbloquea<br/>el juego
        </h2>
      </Col>
    </Row>
  )
}

export default Login