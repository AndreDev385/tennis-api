import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.scss'
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

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
      console.log(form)
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

  return ( 
    <Row >
      <Col xs={12} sm={7} lg={6} className='login-container center'>
        <img className='center' src='/GameMind.svg' alt='GameMind' />
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
        <h1>
          Desbloquea<br/>el juego
        </h1>
      </Col>
    </Row>
  )
}

export default Login