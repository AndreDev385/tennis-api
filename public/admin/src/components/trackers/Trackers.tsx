import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import './Trackers.scss';
import 'react-toastify/dist/ReactToastify.css';
import CreateTrackers from './createTrackers/CreateTrackers';

export interface ITrackers {
  userId: string,
  email: string,
  firstName: string,
  lastName: string
}

const Trackers = () => {
  const [showModalCreate, setShowModalCreate] = useState(false)

  const trackers : ITrackers[] = [
    {
      userId: '1',
      email: 'tracker1@gmail.com',
      firstName: 'Manuel',
      lastName: 'Almoguera'
    },
    {
      userId: '2',
      email: 'tracker2@gmail.com',
      firstName: 'Juan',
      lastName: 'Pereira'
    },
  ]

  const getTrackers = (): void => {
    // TODO delete
  }

  const trackersTable = trackers.map( (item) => {
    return (
      <tr key={item.userId}>
        <td>
          {item.firstName}
        </td>
        <td className='text-center'>
          {item.lastName}
        </td>
        <td className='text-center'>
          {item.email}
        </td>
      </tr>
    )
  })

  return (
    <>
      <div className='trackers-container'>
        <div className="title-wrap">
          <h1>
            Medidores
          </h1>

          <div>
            <Button variant="primary" onClick={() => setShowModalCreate(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Crear nuevo
            </Button>
          </div>
        </div>

        <Card>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>
                  Nombre
                </th>
                <th className='text-center'>
                  Apellido
                </th>
                <th className='text-center'>
                  Email
                </th>
              </tr>
            </thead>

            <tbody>
              {trackersTable}
            </tbody>
          </Table>
        </Card>


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

      {showModalCreate && <CreateTrackers dismiss={() => setShowModalCreate(false)} />}
    </>
  )
}

export default Trackers