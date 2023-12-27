import { faAddressCard, faCircleNotch, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Card, Form, InputGroup, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import CreateAdmin from './createAdmin/createAdmin';
import { IUser } from '../../interfaces/interfaces';
import './Admin.scss';
import 'react-toastify/dist/ReactToastify.css';
import { VITE_SERVER_URL } from '../../env/env.prod';

export interface IAdmin {
  userId: string,
  email: string,
  firstName: string,
  lastName: string
}

const Admins = () => {
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [admins, setAdmins] = useState<IUser[]>([])
  const [filteredAdmins, setFilteredAdmins] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const token: string = localStorage.getItem('authorization') || '';

  useEffect(() => {
    getAdmins()
  }, []);
  
  const getAdmins = async (): Promise<void> => {
    setLoading(true)
    const url = `${VITE_SERVER_URL}/api/v1/users?isAdmin=true`
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
        setAdmins(data)
      } 
    } catch (error) {
        setLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredAdmins(
        admins.filter((item) => (
          item.firstName.toUpperCase().includes(search.toUpperCase()) ||
          item.lastName.toUpperCase().includes(search.toUpperCase()) ||
          item.email.toUpperCase().includes(search.toUpperCase())
        )
      ))
      setLoading(false)
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [search, admins]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const dismissModal = () => {
    setSearch('')
    getAdmins()
    setShowModalCreate(false)
  }

  const adminsTable = filteredAdmins.map( (item) => {
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
            <FontAwesomeIcon icon={faAddressCard} />
            Administradores
          </h1>

          {/* <div>
            <Button variant="primary" onClick={() => setShowModalCreate(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Crear nuevo
            </Button>
          </div> */}
        </div>

        <div className="filter-container">
          <InputGroup className="search">
            <InputGroup.Text id="searchBar">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar..."
              aria-label="search"
              aria-describedby="searchBar"
              className="input-search"
              value={search}
              onChange={onChangeSearch}
            />
          </InputGroup>
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
                  {adminsTable}
                </div>
              }
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

      {showModalCreate && <CreateAdmin dismiss={dismissModal} />}
    </>
  )
}

export default Admins