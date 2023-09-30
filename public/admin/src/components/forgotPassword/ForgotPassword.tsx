import { useState } from 'react'
import './ForgotPassword.scss'
import EmailForm from './emailForm/EmailForm'
import { CodeForm } from './codeForm/CodeForm'
import ResetPasswordForm from './resetPasswordForm/ResetPasswordForm'

const ForgotPassword = () => {

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const incrementStep = () => {
    setStep(step+1)
  }

  const renderForgotPassword = () => {
    switch (step) {
      case 1:
        return <EmailForm onSubmit={incrementStep} email={email} setEmail={setEmail}/>
      case 2:
        return <CodeForm onSubmit={incrementStep} email={email} setCode={setCode} />
      case 3:
        return <ResetPasswordForm code={code} />
      default:
        return 1
    }
  };

  return (
    <>
      {renderForgotPassword()}
    </>
  )
}

export default ForgotPassword