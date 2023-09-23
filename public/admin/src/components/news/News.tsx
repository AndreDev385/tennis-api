import { faFilter, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Card, Form, Table } from 'react-bootstrap';
import { IClub } from '../clubs/Clubs';

import './News.scss';
import 'react-toastify/dist/ReactToastify.css';
import ModalQuestion from '../modalQuestion/ModalQuestion';
import CreateNews from './createNews/CreateNews';

export interface INews {
  adId: string,
  clubId: string,
  link: string,
  image: any
}

const News = () => {
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [clubs, setClubs] = useState<IClub[]>([])
  const [clubSelected, setClubSelected] = useState('')
  const [newsSelected, setNewsSelected] = useState<INews>({
    adId: '',
    clubId: '',
    link: '',
    image: ''
  })
  const [news, setNews] = useState<INews[]>([])
  const [filteredNews, setFilteredNews] = useState<INews[]>([])

  useEffect(() => {
    getClubs()
    getNews()
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

  const getNews = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/event`
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    try{
      const response = await fetch(url, requestOptions)
      
      const data = await response.json()

      if (response.status === 200){
        setNews(data)
        setFilteredNews(data)
      } 
    } catch (error) {
        console.error(error)
    }
  }

  const handleChangeClub = (event: React.ChangeEvent<HTMLSelectElement>):void => {
    const value = event.target.value;
    const result = news.filter(item => item.clubId === value);
    setClubSelected(value)
    setFilteredNews(result);
  }

  const resetFilter = () => {
    setClubSelected('')
    setFilteredNews(news)
  }

  const handleDeleteModal = (news: INews) => {
    setNewsSelected(news)
    setShowModalDelete(true)
  }

  const newsTable = filteredNews.map( (item) => {
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
      <div className='news-container'>
        <div className="title-wrap">
          <h1>
            Eventos
          </h1>

          <div>
            <Button variant="primary" onClick={() => setShowModalCreate(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Crear nuevo
            </Button>
          </div>
        </div>

        <Card>
          <div className='news-filter-container'>
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
              {newsTable}
            </tbody>
          </Table>
        </Card>
      </div>

      {showModalDelete && 
        <ModalQuestion
          title="Eliminar evento"
          question="¿Estás seguro que deseas eliminarla? Esta acción no se puede deshacer."
          dismiss={() => setShowModalDelete(false)}
          accept={() => setShowModalDelete(false)}
        />
      } 

      {showModalCreate && <CreateNews dismiss={() => setShowModalCreate(false)} clubs={clubs} />}
    </>
  )
}

export default News