import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import validator from 'validator';

interface IResetPasswordFormProps {
  code: string;
}

const ResetPasswordForm = ({code}: IResetPasswordFormProps) => {
  const navigate = useNavigate();
  const [ submitted, setSubmitted ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [validRepeatNewPassword, setValidRepeatNewPassword] = useState(false);
  const [form, setForm] = useState({
    newPassword: '',
    repeatNewPassword: ''
  });
  
  const onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValidNewPassword(validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    }))

    setForm((prev) => ({
      ...prev,
      newPassword: value
    }))
  }

  const onChangeRepeatNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    setValidRepeatNewPassword(value === form.newPassword)
    
    setForm((prev) => ({
      ...prev,
      repeatNewPassword: value
    }))
  }

  const onSubmit = (event: any): void => {
    setSubmitted(true)
    
    if(validNewPassword && validRepeatNewPassword){
      setLoading(true)
      changePassword()
    }

    event.preventDefault();
    event.stopPropagation();
  }

  const changePassword = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/users/change-forgotten-password`
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
        newPassword: form.newPassword
      })
    };

    try{
      const response = await fetch(url, requestOptions)
      
      const data = await response.json()

      if (response.status === 200){
        if(data.message) toast.success(data.message)
        setLoading(false)
        navigate('/')
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
      <img src="/resetPassword.svg" />
      <div>
        <h2>
            Cambiar contraseña
        </h2>

        <Form>
          <Form.Group 
            className="mb-3" 
            controlId="formNewPassword">

            <Form.Label>
              Nueva contraseña
            </Form.Label>

            <Form.Control 
              required
              value={form.newPassword}
              onChange={onChangeNewPassword}
              type="password" 
              placeholder="Nueva contraseña" 
            />

            {submitted && !validNewPassword && <span className='text-error'>
              Debe tener un minimo de 8 caracteres, 1 letra minuscula, 1 letra mayuscula, 1 numero y 1 caracter especial.
            </span>}
          </Form.Group>

          <Form.Group 
            className="mb-3" 
            controlId="formRepeatPassword">

            <Form.Label>
              Repetir contraseña
            </Form.Label>

            <Form.Control 
              required
              value={form.repeatNewPassword}
              onChange={onChangeRepeatNewPassword}
              type="password" 
              placeholder="Repetir nueva contraseña" 
            />
            {submitted && !validRepeatNewPassword && <span className='text-error'>
              Contraseñas no coinciden
            </span>}
          </Form.Group>

          <Button 
            disabled={loading}
            onClick={onSubmit}
            variant="primary">
            {loading?
                <FontAwesomeIcon icon={faCircleNotch} spin />
                :
                'Cambiar contraseña'
              }
          </Button>
        </Form>
      </div>    
    </div>
  )
}

export default ResetPasswordForm