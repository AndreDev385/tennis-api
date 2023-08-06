import { useState } from 'react'
import './ForgotPassword.scss'
import EmailForm from './emailForm/EmailForm'
import { CodeForm } from './codeForm/CodeForm'
import ResetPasswordForm from './resetPasswordForm/ResetPasswordForm'

const ForgotPassword = () => {

  const [step, setStep] = useState(1)

  const incrementStep = () => {
    setStep(step+1)
  }

  const renderForgotPassword = () => {
    switch (step) {
      case 1:
        return <EmailForm onSubmit={incrementStep} />
      case 2:
        return <CodeForm />
      case 3:
        return <ResetPasswordForm />
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