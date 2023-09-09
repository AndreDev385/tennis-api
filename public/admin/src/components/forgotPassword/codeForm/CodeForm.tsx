import { useState } from "react"
import ReactCodeInput from "react-code-input";
import './CodeForm.scss'

interface ICodeFormProps {
    onSubmit: () => void;
}

export const CodeForm = ({ onSubmit }: ICodeFormProps) => {
    
    const [ loading, setLoading ] = useState(false)

    const onChangeCode = (e: string): void => {
        if(e.length === 6) handleSubmit(e);
    }

    const handleSubmit = (code: string) => {
        console.log(code)
        setLoading(true)
        onSubmit()
    }

    return (
        <div className="forgot-pwd-container">
            <img src="/src/assets/img/forgot-password-person.svg" />
            
            <div>
                <h1>
                    Código de verificación
                </h1>
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
