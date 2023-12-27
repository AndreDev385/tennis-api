import { faAd, faFilter, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import { IAds, IClub } from '../../interfaces/interfaces';
import ModalQuestion from '../modalQuestion/ModalQuestion';
import CreateAds from './createAds/CreateAds';
import { toast } from 'react-toastify';
import './Ads.scss';
import 'react-toastify/dist/ReactToastify.css';
import { VITE_SERVER_URL } from '../../env/env.prod';

const Ads = () => {
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [clubs, setClubs] = useState<IClub[]>([])
  const [clubSelected, setClubSelected] = useState('')
  const [ads, setAds] = useState<IAds[]>([])
  const [filteredAds, setFilteredAds] = useState<IAds[]>([])
  const [id, setId] = useState("")
  const token: string = localStorage.getItem('authorization') || '';

  useEffect(() => {
    getClubs()
    getAds()
  }, []);

  const getClubs = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/club`
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
    const url = `${VITE_SERVER_URL}/api/v1/ads`
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

  const handleDeleteModal = (id: string) => {
    setId(id)
    setShowModalDelete(true)
  }

  const handleDismissCreate = () => {
    getAds();
    setClubSelected('');
    setShowModalCreate(false)
  }

  const deleteAd = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/ads/${id}`
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    try{
      const response = await fetch(url, requestOptions);
      
      const data = await response.json();

      if (response.status === 200){
        if(data.message) toast.success(data.message);
        setShowModalDelete(false)
        getAds();
        setClubSelected('');
      } else {
        if(data.message) toast.error(data.message);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const adsTable = filteredAds.map( (item) => {
    return (
      <tr key={item.adId}>
        <td>
          <a href={item.link}>
            {item.link}
          </a>
        </td>
        <td className='text-center'>
          {clubs.filter(club => club.clubId === item.clubId)[0]? clubs.filter(club => club.clubId === item.clubId)[0].name: "-"}
        </td>
        <td className='text-center'>
          <img src={item.image} />
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
            <FontAwesomeIcon icon={faAd} />
            Ads
          </h1>

          <Button variant="primary" onClick={() => setShowModalCreate(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Crear nuevo
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
          accept={deleteAd}
        />
      } 

      {showModalCreate && <CreateAds clubs={clubs} dismiss={handleDismissCreate} />}
    </>
  )
}

export default Ads
