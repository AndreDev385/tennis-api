import { faCircle, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Table } from "react-bootstrap"
import { ToastContainer } from 'react-toastify';

import "./Seasons.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import ModalQuestion from "../modalQuestion/ModalQuestion";
import CreateModal from "./createModal/CreateModal";

interface Season {
  seasonId: string,
  leagueId: string,
  name: string,
  isFinish: boolean,
  isCurrentSeason: boolean
}

const Seasons = () => {
  const [showModalQuestion, setShowModalQuestion] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [modalQuestion, setModalQuestion] = useState("")
  const [seasonId, setSeasonId] = useState("")
  console.log(seasonId)

  const seasons : Season[] = [
    {
      seasonId: "1234",
      leagueId: "4567",
      name: "Temporada A",
      isFinish: false,
      isCurrentSeason: true
    },
    {
      seasonId: "12994",
      leagueId: "4567",
      name: "Temporada A",
      isFinish: true,
      isCurrentSeason: false
    }
  ]

  const onClickEndSeason = (item: Season): void => {
    setModalQuestion(`¿Estás seguro que quieres finalizar temporada ${item.name}?`)
    setSeasonId(item.seasonId)
    setShowModalQuestion(true)
  }

  const handleEndSeason = () => {
    // do something 
    setShowModalQuestion(false)
  }

  const dismissCreateModal = (event: boolean) => {
    if(event)
      console.log("TODO refresh")
    setShowModalCreate(false)
  }

  const seasonTable = seasons.map( (item) => {
    return (
      <tr key={item.seasonId}>
        <td>
          {item.name}
        </td>
        <td className='text-center'>
          {item.isFinish && 
            <span>
              <FontAwesomeIcon className='finish' icon={faCircle} />
              Finalizada
            </span>
          }

          {item.isCurrentSeason && 
            <span>
              <FontAwesomeIcon className='current' icon={faCircle} />
              En curso
            </span>
          }
        </td>
        <td className='text-center'>
          {item.isCurrentSeason?
            <Button variant="warning" onClick={() => onClickEndSeason(item)}>
              Finalizar temporada
            </Button>:
            <span>-</span>
          }
        </td>
      </tr>
    )
  })

  return (
    <>
      <div className='seasons-container'>
        <div className="title-wrap">
          <h1>
            Temporadas
          </h1>

          <div>
            <Button variant="primary" onClick={() => setShowModalCreate(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Crear temporada
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
      </Table>

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

      {showModalQuestion && 
        <ModalQuestion 
          title="Finalizar temporada"
          question={modalQuestion}
          dismiss={() => setShowModalQuestion(false)} 
          accept={() => handleEndSeason()}
        />
      } 

      {showModalCreate && <CreateModal dismiss={dismissCreateModal} />} 
    </>
  )
}

export default Seasons