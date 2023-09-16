import { Button, Card, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

import "./Clubs.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import ModalQuestion from '../modalQuestion/ModalQuestion';

export interface IClub {
  clubId: string,
  name: string,
  code: string,
  isSubscribed: boolean
}

const Clubs = () => {
  const [showModalQuestion, setShowModalQuestion] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalQuestion, setModalQuestion] = useState("")
  const [id, setId] = useState("")
  const [clubs, setClubs] = useState<IClub[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClubs()
  }, []);

  const getClubs = async () => {
    setLoading(true)
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/club`
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    try{
      const response = await fetch(url, requestOptions)
      
      const data = await response.json()

      if (response.status === 200){
        setClubs(data)
        setLoading(false)
      } 
    } catch (error) {
        setLoading(false)
    }
  }

  const onClickCancelSubscription = (item: IClub): void => {
    setModalTitle("Cancelar suscripción")
    setModalQuestion(`¿Estás seguro que quieres cancelar suscripción de ${item.name}?`)
    openModal(item.clubId)
  }

  const onClickSubscription = (item: IClub): void => {
    setModalTitle("Suscribir")
    setModalQuestion(`¿Estás seguro que quieres suscribir a ${item.name}?`)
    openModal(item.clubId)
  }

  const openModal = (id: string): void => {
    setId(id)
    setShowModalQuestion(true)
  }

  const handleModalAccept = () => {
    // TODO
    setShowModalQuestion(false)
  }

  // const handleSuscription = () => {

  // }

  const copyClipboard = (code: string): void => {
    navigator.clipboard.writeText(code)
    toast.info("Copiado en el portapapeles!")
  }

  const clubTable = clubs.map( (item) => {
    return (
      <tr key={item.clubId}>
        <td>
          {item.name}
        </td>
        <td className='text-center'>
          {item.code?
            <>
              {item.code} 
              <FontAwesomeIcon 
                onClick={() => copyClipboard(item.code)}
                className='copy' 
                icon={faCopy} />
            </>:
            <span>
              Sin código asignado
            </span> 
          }
        </td>
        <td className='text-center'>
          {item.isSubscribed? 
            <FontAwesomeIcon className='check-circle' icon={faCheckCircle} />: 
            <FontAwesomeIcon className='circle' icon={faCircle} />
          }
        </td>
        <td className='text-center'>
          {item.isSubscribed? 
            <Button variant="dark" onClick={() => onClickCancelSubscription(item)}>
              Cancelar suscripción
            </Button>: 
            <Button variant="warning" onClick={() => onClickSubscription(item)}>
              Suscribir
            </Button>
          }
        </td>
      </tr>
    )
  })

  return (
    <>
      <div className='clubs-container'>
        <h1>
          Clubes
        </h1>

        <Card>
          <Table responsive="sm">
            <thead className='fixed'>
              <tr>
                <th>
                  Nombre
                </th>
                <th className='text-center'>
                  Código
                </th>
                <th className='text-center'>
                  Suscripción
                </th>
                <th className='text-center'>
                  Manejar suscripción
                </th>
              </tr>
            </thead>

            <tbody>
              {clubTable}
            </tbody>
          </Table>
        </Card>
      </div>

      {showModalQuestion && 
        <ModalQuestion 
            title={modalTitle}
            question={modalQuestion}
            dismiss={() => setShowModalQuestion(false)} 
            accept={() => handleModalAccept()}
        />}
    </>
  )
}

export default Clubs