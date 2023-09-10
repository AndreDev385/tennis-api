import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import './Admin.scss';
import 'react-toastify/dist/ReactToastify.css';
import CreateAdmin from './createAdmin/createAdmin';

export interface IAdmin {
  userId: string,
  email: string,
  firstName: string,
  lastName: string
}
const Admins = () => {
  const [showModalCreate, setShowModalCreate] = useState(false)

  const admins : IAdmin[] = [
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

  const getAdmins = (): void => {
    // TODO delete
  }

  const adminsTable = admins.map( (item) => {
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
      <div className='admins-container'>
        <div className="title-wrap">
          <h1>
            Administradores
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
              {adminsTable}
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

      {showModalCreate && <CreateAdmin dismiss={() => setShowModalCreate(false)} />}
    </>
  )
}

export default Admins