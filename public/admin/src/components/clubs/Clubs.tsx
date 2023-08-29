import { Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

import "./Clubs.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import ModalQuestion from '../modalQuestion/ModalQuestion';

interface Club {
  id: string,
  name: string,
  code: string,
  isSubscribed: boolean
}

const Clubs = () => {
  const [showModalQuestion, setShowModalQuestion] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalQuestion, setModalQuestion] = useState("")
  const [id, setId] = useState("")
  console.log(id)
  
  const clubs : Club[] = [
    {
      id: "1",
      name: "Club A",
      code: "ABCDEF",
      isSubscribed: false
    },
    {
      id: "2",
      name: "Club B",
      code: "JFOXMX",
      isSubscribed: true
    },
    {
      id: "3",
      name: "Club C",
      code: "PWEOKD",
      isSubscribed: true
    },
  ]

  const onClickCancelSubscription = (item: Club): void => {
    setModalTitle("Cancelar suscripción")
    setModalQuestion(`¿Estás seguro que quieres cancelar suscripción de ${item.name}?`)
    openModal(item.id)
  }

  const onClickSubscription = (item: Club): void => {
    setModalTitle("Suscribir")
    setModalQuestion(`¿Estás seguro que quieres suscribir a ${item.name}?`)
    openModal(item.id)
  }

  const openModal = (id: string): void => {
    setId(id)
    setShowModalQuestion(true)
  }

  const handleModalAccept = () => {
    // do something 
    setShowModalQuestion(false)
  }

  const copyClipboard = (code: string): void => {
    navigator.clipboard.writeText(code)
    toast.info("Copiado en el portapapeles!")
  }

  const clubTable = clubs.map( (item) => {
    return (
      <tr key={item.id}>
        <td>
          {item.name}
        </td>
        <td className='text-center'>
          {item.code}
          <FontAwesomeIcon 
            onClick={() => copyClipboard(item.code)}
            className='copy' 
            icon={faCopy} />
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

        <Table responsive="sm">
          <thead>
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