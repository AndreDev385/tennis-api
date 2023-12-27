import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { VITE_SERVER_URL } from '../../env/env.prod';

interface IDeleteAccountProps {
    token: string   
}

const ConfirmDeleteAccount = ({token}: IDeleteAccountProps) => {
    const [loading, setLoading] = useState(false);
    
    const deleteAccount = async () => {
        setLoading(true)

        try{
            const url = `${VITE_SERVER_URL}/api/v1/users/delete`;
            
            const response = await fetch(url,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            
            const data = await response.json()

            if (response.status === 200){
                setLoading(false)
                toast.success("Cuenta eliminada")
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
        <div className='m-3'>
            <h2>
                ¿Estás seguro que quieres eliminar tu cuenta?
            </h2>
            <span className='text-danger'>
                Esta acción no se puede deshacer, el perfil se eliminará de forma permamente.
            </span> <br />
            
            <p className='mt-2'>
                <strong>
                    Importante: 
                </strong><br />
                Si eres un jugador perteneciente a un Club de Tennis, la data de los partidos en los que participaste se mantendrá guardada. 
            </p>

            <Button 
                disabled={loading} 
                variant='danger' 
                onClick={deleteAccount}
            >
                {loading?
                <FontAwesomeIcon icon={faCircleNotch} spin />
                :
                'ELIMINAR CUENTA'
                }
            </Button>

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

export default ConfirmDeleteAccount