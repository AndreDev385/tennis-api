import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { IClub } from '../clubs/Clubs';

import './News.scss';
import 'react-toastify/dist/ReactToastify.css';

interface INews {
  adId: string,
  clubId: string,
  link: string,
  image: string
}

const News = () => {
  const [newsId, setNewsId] = useState("")
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)

  const news : INews[] = [
    {
      adId: "1234",
      clubId: "club1234",
      link: "url",
      image: "image"
    },
    {
      adId: "12345",
      clubId: "club1234",
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

  const showDeleteModal = (id: string) => {
    setNewsId(id)
    setShowModalDelete(true)
  }
  
  const handleDeleteNews = (event: boolean) => {
    // TODO delete
    setShowModalDelete(false)
  }

  const newsTable = news.map( (item) => {
    return (
      <tr key={item.adId}>
        <td>
          {item.link}
        </td>
        <td>
          <img src={item.image} />
        </td>
        <td className='text-center'>
          <Button variant="warning" onClick={() => showDeleteModal(item.adId)}>
            <FontAwesomeIcon icon={faPencil} />
            Editar
          </Button>
        </td>
        <td className='text-center'>
          <Button variant="danger" onClick={() => showDeleteModal(item.adId)}>
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
            Novedades
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
                  Link
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
              {newsTable}
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

      {/* {showModalQuestion && 
        <ModalQuestion 
          title="Eliminar"
          question="¿Estás seguro que deseas eliminarla? Esta acción no se puede deshacer."
          // dismiss={handleDeleteNews}
        />
      }  */}

      {/* {/* {showModalCreate && <CreateModal dismiss={dismissCreateModal} />}  */}
    </>
  )
}

export default News