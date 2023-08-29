import { useState } from 'react'
import ConfirmDeleteAccount from './ConfirmDeleteAccount'
import Login from './Login'
import "./DeleteAccount.scss"

const DeleteAccount = () => {
    const [verified, setVerified] = useState(false)
    const [token, setToken] = useState("")

    return (
        <div className='delete-account-container'>
            <img className='center' src='/gameMindLogo.svg' alt='GameMind' />

            {verified?
                <ConfirmDeleteAccount token={token} />:
                <Login setVerified={setVerified} setToken={setToken} />
            }
        </div>
    )
}

export default DeleteAccount