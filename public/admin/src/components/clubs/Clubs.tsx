import { Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

import "./Clubs.scss";
import 'react-toastify/dist/ReactToastify.css';

interface Club {
  id: string,
  name: string,
  code: string,
  isSubscribed: boolean
}

const Clubs = () => {
  
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

  const copyClipboard = (code: string): void => {
    navigator.clipboard.writeText(code)
    toast.info("Copiado en el portapapeles!")
  }

  const clubTable = clubs.map( (item) => {
    return (
      <tr>
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
            <Button variant="dark">
              Cancelar suscripción
            </Button>: 
            <Button variant="warning">
              Suscribir
            </Button>
          }
        </td>
      </tr>
    )
  })

  return (
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
              Menejar suscripción
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
  )
}

export default Clubs