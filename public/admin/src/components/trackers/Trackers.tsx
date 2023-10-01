import { faAddressBook, faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import './Trackers.scss';
import 'react-toastify/dist/ReactToastify.css';
import CreateTrackers from './createTrackers/CreateTrackers';

export interface ITracker {
  userId: string,
  email: string,
  firstName: string,
  lastName: string
}

const Trackers = () => {
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [trackers, setTrackers] = useState<ITracker[]>([])
  const [loading, setLoading] = useState(true)
  const token: string = localStorage.getItem('authorization') || '';

  useEffect(() => {
    getTrackers()
  }, []);
  
  const getTrackers = async (): Promise<void> => {
    setLoading(true)
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/users/tracker`
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token
      }
    };

    try{
      const response = await fetch(url, requestOptions)
      
      const data = await response.json()

      if (response.status === 200){
        setTrackers(data)
        setLoading(false)
      } 
    } catch (error) {
        setLoading(false)
    }
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
            <FontAwesomeIcon icon={faAddressBook} />
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
            {loading? 
                <FontAwesomeIcon className='center mt-5' icon={faCircleNotch} spin />:
                <div>
                  {trackersTable}
                </div>
              }
            </tbody>
          </Table>
        </Card>
      </div>

      {showModalCreate && <CreateTrackers dismiss={() => setShowModalCreate(false)} />}
    </>
  )
}

export default Trackers