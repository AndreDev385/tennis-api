import { faBaseballBall, faChartBar, faCircleNotch, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/interfaces";
import { useNavigate } from "react-router";
import './Players.scss'

const Players = () => {
  const [players, setPlayers] = useState<IUser[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<IUser[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const token: string = localStorage.getItem('authorization') || '';
  const navigate = useNavigate();
  
  useEffect(() => {
    getPlayers()
  }, []);

  const getPlayers = async () => {
    setLoading(true)
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/users?isPlayer=true`
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
        setPlayers(data)
      } 
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  // filter
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredPlayers(
        players.filter((item) => item.firstName.toUpperCase().includes(search.toUpperCase()) || item.lastName.toUpperCase().includes(search.toUpperCase()))
      )
      setLoading(false)
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [search, players]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const goToStats = (id: string) => {
    navigate(`stats/${id}`)
  }

  const playersTable = filteredPlayers.map( (item) => {
    return (
      <tr key={item.userId}>
        <td className="text-center">
          {item.firstName}{' '}{item.lastName}
        </td>
        <td className="text-center">
          {item.email}
        </td>
        <td className='text-center'>
          <Button variant="primary" onClick={() => goToStats(item.userId)}>
            <FontAwesomeIcon icon={faChartBar} />
            Estadísticas
          </Button>
        </td>
      </tr>
    )
  })

  return (
    <>
      <div className='players-container'>
        <div>
          <h1>
            <FontAwesomeIcon icon={faBaseballBall} />
             Jugadores
          </h1>
        </div>

        <div className="filter-container">
          <InputGroup className="search">
            <InputGroup.Text id="searchBar">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar por nombre..."
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
                <th className="text-center">
                  Nombre
                </th>
                <th className="text-center">
                  Email
                </th>
                <th className="text-center">
                  Ver estadísticas
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPlayers && playersTable}
              {loading && 
                <tr className="text-center mt-3" >
                  <td>
                    <FontAwesomeIcon className='center mt-5' icon={faCircleNotch} spin />
                  </td>
                </tr>
              }
              {filteredPlayers.length === 0 && !loading && 
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
    </>
  )
}

export default Players