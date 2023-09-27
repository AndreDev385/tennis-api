import { faBell, faFilter, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import { IClub } from '../clubs/Clubs';

import './Ads.scss';
import 'react-toastify/dist/ReactToastify.css';
import ModalQuestion from '../modalQuestion/ModalQuestion';
import CreateAds from './createAds/CreateAds';
import Notifications from './notifications/Notifications';

export interface IAds {
  adId: string,
  clubId: string,
  link: string,
  image: any
}

const Ads = () => {
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)
  // const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalNotifications, setShowModalNotifications] = useState(false)
  const [clubs, setClubs] = useState<IClub[]>([])
  const [clubSelected, setClubSelected] = useState('')
  // const [adsSelected, setAdsSelected] = useState<IAds>({
  //   adId: '',
  //   clubId: '',
  //   link: '',
  //   image: ''
  // })
  const [ads, setAds] = useState<IAds[]>([])
  const [filteredAds, setFilteredAds] = useState<IAds[]>([])

  useEffect(() => {
    getClubs()
    getAds()
  }, []);

  const getClubs = async () => {
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
      } 
    } catch (error) {
      console.error(error)
    }
  }

  const getAds = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/ads`
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    try{
      const response = await fetch(url, requestOptions)
      
      const data = await response.json()

      if (response.status === 200){
        setAds(data)
        setFilteredAds(data)
      } 
    } catch (error) {
        console.error(error)
    }
  }

  const handleChangeClub = (event: React.ChangeEvent<HTMLSelectElement>):void => {
    const value = event.target.value;
    const result = ads.filter(item => item.clubId === value);
    setClubSelected(value)
    setFilteredAds(result);
  }

  const resetFilter = () => {
    setClubSelected('')
    setFilteredAds(ads)
  }

  const handleDeleteModal = (ads: IAds) => {
    console.log(ads);
    // setAdsSelected(ads)
    setShowModalDelete(true)
  }

  const handleEditModal = (ads: IAds) => {
    console.log(ads)
    // setAdsSelected(ads)
    // setShowModalEdit(true)
  }

  const adsTable = filteredAds.map( (item) => {
    return (
      <tr key={item.adId}>
        <td>
          {item.link}
        </td>
        <td className='text-center'>
          {clubs.filter(club => club.clubId === item.clubId)[0]? clubs.filter(club => club.clubId === item.clubId)[0].name: "-"}
        </td>
        <td className='text-center'>
          <img src={item.image} />
        </td>
        <td className='text-center'>
          <Button variant="warning" onClick={() => handleEditModal(item)}>
            <FontAwesomeIcon icon={faPencil} />
            Editar
          </Button>
        </td>
        <td className='text-center'>
          <Button variant="danger" onClick={() => handleDeleteModal(item)}>
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
            Ads
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
            <Form.Select value={clubSelected} onChange={handleChangeClub}>
              <option disabled value="">Selecciona un club</option>
              {clubs.map(item => {
                return <option key={item.clubId}  value={item.clubId}>{item.name}</option>
              })}
            </Form.Select>

            <Button className='ms-3' onClick={() => resetFilter()}>
              Limpiar filtro
            </Button>
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
      </div>

      {showModalDelete && 
        <ModalQuestion
          title="Eliminar publicidad"
          question="¿Estás seguro que deseas eliminarla? Esta acción no se puede deshacer."
          dismiss={() => setShowModalDelete(false)}
          accept={getAds}
        />
      } 

      {showModalCreate && <CreateAds clubs={clubs} dismiss={() => setShowModalCreate(false)} />}

      {showModalNotifications && <Notifications dismiss={() => setShowModalNotifications(false)} />}
    </>
  )
}

export default Ads
