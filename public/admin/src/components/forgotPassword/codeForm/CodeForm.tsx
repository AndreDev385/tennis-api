import { Dispatch, SetStateAction, useState } from "react"
import ReactCodeInput from "react-code-input";
import { toast } from "react-toastify";
import './CodeForm.scss'

interface ICodeFormProps {
    onSubmit: () => void;
    email: string;
    setCode: Dispatch<SetStateAction<string>>;
}

export const CodeForm = ({ email, onSubmit, setCode }: ICodeFormProps) => {
    
    const [ loading, setLoading ] = useState(false)

    const onChangeCode = (e: string): void => {
        if(e.length === 6) handleSubmit(e);
    }

    const handleSubmit = (code: string) => {
        setLoading(true)
        setCode(code)
        validateVerificationCode(code)
    }

    const validateVerificationCode = async (code: string) => {
        const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/users/validate-password-code`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                code: code
            })
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
            <img src="/forgot-password-person.svg" />
            
            <div>
                <h2>
                    Código de verificación
                </h2>
                <h6>
                    Revisa tu correo electrónico, te hemos enviado un código de verificación de identidad
                </h6>

                <ReactCodeInput 
                    disabled={loading}
                    className="input-code" 
                    name="code"
                    type='number' 
                    fields={6} 
                    onChange={(event) => onChangeCode(event)}
                    inputMode={"email"} 
                />
            </div>    
        </div>
    )
}
