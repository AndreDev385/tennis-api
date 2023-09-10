import { faBell, faFilter, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { IClub } from '../clubs/Clubs';

import './Ads.scss';
import 'react-toastify/dist/ReactToastify.css';
import ModalQuestion from '../modalQuestion/ModalQuestion';
import CreateAds from './createAds/CreateAds';
import EditAds from './editAds/EditAds';
import Notifications from './notifications/Notifications';

export interface IAds {
  adId: string,
  clubId: string,
  link: string,
  image: string
}

const Ads = () => {
  const [adsId, setAdsId] = useState("")
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalNotifications, setShowModalNotifications] = useState(false)

  const ads : IAds[] = [
    {
      adId: "1234",
      clubId: "12",
      link: "url",
      image: "image"
    },
    {
      adId: "12345",
      clubId: "2",
      link: "url",
      image: "image"
    },
  ]

  const clubs : IClub[] = [
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

  const handleDeleteModal = (id: string) => {
    setAdsId(id)
    setShowModalDelete(true)
  }

  const handleEditModal = (id: string) => {
    setAdsId(id)
    setShowModalEdit(true)
  }
  
  const getAds = (): void => {
    // TODO delete
    setShowModalDelete(false)
    setShowModalEdit(false)
    setShowModalCreate(false)
  }

  const adsTable = ads.map( (item) => {
    return (
      <tr key={item.adId}>
        <td>
          {item.link}
        </td>
        <td className='text-center'>
          {clubs.filter(club => club.id === item.clubId)[0]? clubs.filter(club => club.id === item.clubId)[0].name: "-"}
        </td>
        <td className='text-center'>
          <img src={item.image} />
        </td>
        <td className='text-center'>
          <Button variant="warning" onClick={() => handleEditModal(item.adId)}>
            <FontAwesomeIcon icon={faPencil} />
            Editar
          </Button>
        </td>
        <td className='text-center'>
          <Button variant="danger" onClick={() => handleDeleteModal(item.adId)}>
            <FontAwesomeIcon icon={faTrash} />
            Eliminar
          </Button>
        </td>
      </tr>
    )
  })

  return (
    <>
      <div className='ads-container'>
        <div className="title-wrap">
          <h1>
            Anuncios
          </h1>

          <Button variant="primary" onClick={() => setShowModalCreate(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Crear nuevo
          </Button>

          <Button variant="info" onClick={() => setShowModalNotifications(true)}>
            <FontAwesomeIcon icon={faBell} />
            Crear notificación
          </Button>
        </div>

        <Card>
          <div className='ads-filter-container'>
            <FontAwesomeIcon icon={faFilter} />
            <span>
              Filtar por Club:
            </span>
            <Form.Select>
              <option disabled value="">Selecciona un club</option>
              {clubs.map(item => {
                return <option key={item.id}  value={item.id}>{item.name}</option>
              })}
            </Form.Select>
          </div>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>
                  Link
                </th>
                <th className='text-center'>
                  Club
                </th>
                <th className='text-center'>
                  Imagen
                </th>
                <th className='text-center'>
                  Editar
                </th>
                <th className='text-center'>
                  Eliminar
                </th>
              </tr>
            </thead>

            <tbody>
              {adsTable}
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

      {showModalDelete && 
        <ModalQuestion
          title="Eliminar"
          question="¿Estás seguro que deseas eliminarla? Esta acción no se puede deshacer."
          dismiss={() => setShowModalDelete(false)}
          accept={getAds}
        />
      } 

      {showModalCreate && <CreateAds dismiss={() => setShowModalCreate(false)} />}

      {showModalEdit && <EditAds id={adsId} dismiss={() => setShowModalEdit(false)} />}
      
      {showModalNotifications && <Notifications dismiss={() => setShowModalNotifications(false)} />}
    </>
  )
}

export default Ads