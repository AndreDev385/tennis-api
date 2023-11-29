import { faCalendar, faCircle, faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import ModalQuestion from "../modalQuestion/ModalQuestion";
import CreateModal from "./createModal/CreateModal";
import "./Seasons.scss";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { ISeason } from "../../interfaces/interfaces";
import { VITE_SERVER_URL } from "../../env/env.prod";

const Seasons = () => {
  const [showModalQuestion, setShowModalQuestion] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [modalQuestion, setModalQuestion] = useState("")
  const [seasons, setSeasons] = useState<ISeason[]>([])
  const token: string = localStorage.getItem('authorization') || '';
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getSeasons()
  }, []);

  const getSeasons = async () => {
    setLoading(true)
    const url = `${VITE_SERVER_URL}/api/v1/season`
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
        setSeasons(data)
        setLoading(false)
      } 
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const onClickEndSeason = (item: ISeason): void => {
    setModalQuestion(`¿Estás seguro que quieres finalizar temporada ${item.name}?`)
    setShowModalQuestion(true)
  }

  const handleEndSeason = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/season/finish`
    const requestOptions = {
        method: 'PUT',
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
        setShowModalQuestion(false)
        getSeasons()
      } else {
        if(data.message) toast.error(data.message);
      }
    } catch (error) {
        console.error(error);
    }
  }

  // TODO
  const dismissCreateModal = (event: boolean) => {
    if(event) getSeasons();
    setShowModalCreate(false)
  }

  const seasonTable = seasons.map( (item) => {
    return (
      <tr key={item.seasonId}>
        <td>
          {item.name}
        </td>
        <td>
          {item.isFinish && 
            <span>
              <FontAwesomeIcon className='finish' icon={faCircle} />
              Finalizada<br />
            </span>
          }

          {!item.isCurrentSeason && item.isCurrentSeason && 
            <span>
              <FontAwesomeIcon className='current' icon={faCircle} />
              En curso
            </span>
          }
        </td>
        <td className='text-center'>
          {item.isCurrentSeason?
            <Button variant="warning" disabled={item.isFinish} onClick={() => onClickEndSeason(item)}>
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
            <FontAwesomeIcon icon={faCalendar} />
            Temporadas
          </h1>

          <div>
            <Button variant="primary" onClick={() => setShowModalCreate(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Crear temporada
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
                <th>
                  Estatus
                </th>
                <th className='text-center'>
                  Manejar temporada
                </th>
              </tr>
            </thead>

            <tbody>
              {seasons && seasonTable}
              {loading && 
                <tr className="text-center mt-3" >
                  <td>
                    <FontAwesomeIcon className='center mt-5' icon={faCircleNotch} spin />
                  </td>
                </tr>
              }
              {seasons.length === 0 && !loading && 
                <tr className="text-center mt-3" >
                  <td>
                    No hay resultados
                  </td>
                </tr>
              }
            </tbody>
          </Table>
        </Card>
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