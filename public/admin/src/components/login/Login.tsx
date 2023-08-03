import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.scss'
import { Row, Col } from 'react-bootstrap';

const Login = () => {

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

            <Form.Control type='email' placeholder='Correo electrónico' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>
              Contraseña
            </Form.Label>

            <Form.Control type='password' placeholder='Contraseña' />
          </Form.Group>

          <Button className='end' variant='link'>
            ¿Olvidaste tu contraseña?
          </Button>

          <Button className='center mt-3' variant='primary' type='submit'>
            Iniciar sesión
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