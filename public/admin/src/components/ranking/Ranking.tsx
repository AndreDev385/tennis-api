import { useEffect, useState } from "react";
import { ICategory, IClub, IRanking } from "../../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Form, Table } from "react-bootstrap";
import './Ranking.scss'

const Ranking = () => {
  const [ranking, setRanking] = useState<IRanking[]>([])
  const [filteredRanking, setFilteredRanking] = useState<IRanking[]>([])
  const [clubs, setClubs] = useState<IClub[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedClub, setSelectedClub] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [loading, setLoading] = useState(false)
  const token: string = localStorage.getItem('authorization') || '';
  const positions: { [key: string]: string } = {
    champion: "Campeón",
    subChampion: "Subcampeón",
    semiFinals: "Semifinalista",
    quarterFinals: "Cuartos de final",
    roundOf16: "Octavos de final",
    groups: "Fase de grupos",
  };

  useEffect(() => {
    getRanking()
    getClubs()
    getCategories()
  }, [])

  const getRanking = async () => {
    setLoading(true)
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/team/rankings`
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
        setRanking(data)
      } 
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const getCategories= async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/categories`
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
        setCategories(data)
      } 
    } catch (error) {
    }
  }

  const getClubs = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/club`
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
        setClubs(data)
      } 
    } catch (error) {
    }
  }

  const filterRanking = (): IRanking[] => {
    return ranking.filter((item) => {
      const clubCondition = !selectedClub || item.team.club.clubId === selectedClub;
      const categoryCondition = !selectedCategory || item.team.category.categoryId === selectedCategory;
      const positionCondition = !selectedPosition || item.position === positions[selectedPosition];
      return clubCondition && categoryCondition && positionCondition;
    });
  }

  // filter
  useEffect(() => {
    const filteredData = filterRanking();
    setFilteredRanking(filteredData)
    setLoading(false)
  }, [selectedCategory, selectedClub, ranking, selectedPosition]);

  const onChangeClub = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedClub(e.target.value);
  }

  const onChangePosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedPosition(e.target.value);
  }

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedCategory(e.target.value);
  }

  const onReset = () => {
    setSelectedCategory('')
    setSelectedClub('')
    setSelectedPosition('')
  }

  const rankingTable = filteredRanking.map( (item) => {
    return (
      <tr key={item.rankingId}>
        <td className="text-center">
          {item.position}
        </td>
        <td className="text-center">
          {item.team.name}
        </td>
        <td className="text-center">
          {item.team.category.name}
        </td>
        <td className="text-center">
          {item.team.club.symbol}
        </td>
      </tr>
    )
  })
  
  return (
    <div className='ranking-container'>
      <div>
        <h1>
          <FontAwesomeIcon icon={faTrophy} />
          Ranking
        </h1>
      </div>

      <div className="filter-container">
        <Form.Select onChange={onChangePosition} value={selectedPosition} aria-label="Filtrar por posición">
          <option value="" disabled>Filtrar por posición</option>
          {Object.keys(positions).map( (key, i) => {
            return <option key={i} value={key}>{positions[key]}</option>
          })}
        </Form.Select>

        <Form.Select onChange={onChangeClub} value={selectedClub} aria-label="Filtrar por clubes">
          <option value="" disabled>Filtrar por clubes</option>
          {clubs.map(item => {
            return <option key={item.clubId} value={item.clubId}>{item.symbol}</option>
          })}
        </Form.Select>

        <Form.Select onChange={onChangeCategory} value={selectedCategory} aria-label="Filtrar por categoría">
          <option value="" disabled>Filtrar por categoría</option>
          {categories.map(item => {
            return <option key={item.categoryId} value={item.categoryId}>{item.name}</option>
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
                Posición
              </th>
              <th className="text-center">
                Equipo
              </th>
              <th className="text-center">
                Categoría
              </th>
              <th className="text-center">
                Club
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRanking && rankingTable}
            {loading && 
              <tr className="text-center mt-3" >
                <td>
                  <FontAwesomeIcon className='center mt-5' icon={faCircleNotch} spin />
                </td>
              </tr>
            }
            {filteredRanking.length === 0 && !loading && 
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
  )
}

export default Ranking