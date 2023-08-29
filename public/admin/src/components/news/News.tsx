// import { faPlus } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Button, Table } from "react-bootstrap"
// import { ToastContainer } from 'react-toastify';
// import { useState } from "react";

import 'react-toastify/dist/ReactToastify.css';

interface News {
  clubEventId: string,
  clubId: string,
  link: string
}

const News = () => {
  // const [showModalQuestion, setShowModalQuestion] = useState(false)
  // const [showModalCreate, setShowModalCreate] = useState(false)
  // const [modalQuestion, setModalQuestion] = useState("")
  // const [clubEventId, setClubEventId] = useState("")

  // const news : News[] = [
  //   {
  //     clubEventId: "1234",
  //     clubId: "club1234",
  //     link: "url"
  //   },
  //   {
  //     clubEventId: "1234",
  //     clubId: "club1234",
  //     link: "url"
  //   },
  // ]

  // const showDeleteModal = (id: string) => {
  //   setClubEventId(id)
  // }
  
  // const handleDeleteNews = (event: boolean) => {
  //   // TODO delete
  //   setShowModalQuestion(false)
  // }

  // const seasonTable = seasons.map( (item) => {
  //   return (
  //     <tr key={item.seasonId}>
  //       <td>
  //         {item.name}
  //       </td>
  //       <td className='text-center'>
  //         {item.isFinish && 
  //           <span>
  //             <FontAwesomeIcon className='finish' icon={faCircle} />
  //             Finalizada
  //           </span>
  //         }

  //         {item.isCurrentSeason && 
  //           <span>
  //             <FontAwesomeIcon className='current' icon={faCircle} />
  //             En curso
  //           </span>
  //         }
  //       </td>
  //       {/* <td className='text-center'>
  //         {item.isCurrentSeason?
  //           <Button variant="warning" onClick={() => onClickEndSeason(item)}>
  //             Finalizar temporada
  //           </Button>:
  //           <span>-</span>
  //         }
  //       </td> */}
  //     </tr>
  //   )
  // })

  return (
    <>
      {/* <div className='news-container'>
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

      <Table responsive="sm">
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th className='text-center'>
              Estatus
            </th>
            <th className='text-center'>
              Manejar temporada
            </th>
          </tr>
        </thead>

        <tbody>
          {seasonTable}
        </tbody>
      </Table> */}

      {/* <ToastContainer 
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
      </div> */}

      {/* {showModalQuestion && 
        <ModalQuestion 
          title="Eliminar"
          question="¿Estás seguro que deseas eliminarla? Esta acción no se puede deshacer."
          // dismiss={handleDeleteNews}
        />
      }  */}

      {/* {showModalCreate && <CreateModal dismiss={dismissCreateModal} />}  */}
    </>
  )
}

export default News