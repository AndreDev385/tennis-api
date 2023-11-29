import { faBaseballBall, faChartBar, faCircleNotch, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap"
import { useEffect, useState } from "react";
import { IClub, IUserPlayer } from "../../interfaces/interfaces";
import { useNavigate } from "react-router";
import './Players.scss'
import { VITE_SERVER_URL } from "../../env/env.prod";

const Players = () => {
  const [players, setPlayers] = useState<IUserPlayer[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<IUserPlayer[]>([])
  const [selectedClub, setSelectedClub] = useState('')
  const [clubs, setClubs] = useState<IClub[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const token: string = localStorage.getItem('authorization') || '';
  const navigate = useNavigate();
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };
  
  useEffect(() => {
    getPlayers()
    getClubs()
  }, []);

  const getPlayers = async () => {
    setLoading(true)
    const url = `${VITE_SERVER_URL}/api/v1/player`
    try{
      const response = await fetch(url, requestOptions)
      
      const data = await response.json()

      if (response.status === 200){
        const fullNameData = data.map( (item: IUserPlayer) => {
          item.fullName = item.user.firstName + ' ' + item.user.lastName
          return item
        })
        setPlayers(fullNameData)
      } 
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const getClubs = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/club`
    try{
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      if (response.status === 200){
        setClubs(data)
      } 
    } catch (error) {
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(selectedClub){
        setFilteredPlayers(
          players.filter((item) => (item.fullName.toUpperCase().includes(search.toUpperCase()) && 
          selectedClub === item.clubId))
        )
      } else {
        setFilteredPlayers(
          players.filter((item) => item.fullName.toUpperCase().includes(search.toUpperCase()))
        )
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [search, selectedClub, players]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const onChangeClub = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedClub(e.target.value);
  }

  const onReset = () => {
    setSelectedClub('')
    setSearch('')
  }

  const goToStats = (id: string) => {
    navigate(`${id}`)
  }

  const playersTable = filteredPlayers.map( (item) => {
    return (
      <tr key={item.playerId}>
        <td className="text-center">
          {item.user.firstName}{' '}{item.user.lastName}
        </td>
        <td className="text-center">
          {clubs.filter(club => club.clubId === item.clubId)[0]? clubs.filter(club => club.clubId === item.clubId)[0].symbol: "-"}
        </td>
        <td className='text-center'>
          <Button variant="primary" onClick={() => goToStats(item.user.userId)}>
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

          <Form.Select onChange={onChangeClub} value={selectedClub} aria-label="Filtrar por clubes">
            <option value="" disabled>Filtrar por clubes</option>
            {clubs.map(item => {
              return <option key={item.clubId} value={item.clubId}>{item.symbol}</option>
            })}
          </Form.Select>

          <Button onClick={onReset} variant="secondary">
             Limpiar filtro
          </Button>
        </div>

        <Card>
          <Table responsive="sm">
            <thead>
              <tr>
                <th className="text-center">
                  Nombre
                </th>
                <th className="text-center">
                  Club
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