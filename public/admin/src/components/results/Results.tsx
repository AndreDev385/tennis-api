import { useEffect, useState } from "react"
import { ICategory, IClash, IJourney, ISeason } from "../../interfaces/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch, faPoll, faTableTennis } from "@fortawesome/free-solid-svg-icons"
import { Button, Card, Form, Table } from "react-bootstrap"
import { useNavigate } from "react-router"
import { VITE_SERVER_URL } from "../../env/env.prod"

const Results = () => {
  const [results, setResults] = useState<IClash[]>([])
  const [journey, setJourney] = useState<IJourney[]>([])
  const [seasons, setSeasons] = useState<ISeason[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [selectedJourney, setSelectedJourney] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const token: string = localStorage.getItem('authorization') || '';
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    getResults()
  }, [selectedCategory, selectedJourney, selectedSeason]);

  useEffect(() => {
    getCategories()
    getJourneys()
    getSeasons()
  }, [])
  
  const getResults = async () => {
    setLoading(true)

    const params = {
      isFinish: "true",
      ...(selectedJourney && { journey: selectedJourney }),
      ...(selectedSeason && { seasonId: selectedSeason }),
      ...(selectedCategory && { categoryId: selectedCategory }),
    };

    const url = `${VITE_SERVER_URL}/api/v1/clash?` + new URLSearchParams(params)

    try{
      const response = await fetch(url, requestOptions)
      const data = await response.json()

      if (response.status === 200){
        setResults(data)
        setLoading(false)
      } 
    } catch (error) {
      console.error(error)
    }
  }

  const getCategories = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/categories`
    try{
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      if (response.status === 200){
        setCategories(data)
      } 
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasons = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/season`
    try{
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      if (response.status === 200){
        setSeasons(data)
      } 
    } catch (error) {
      console.error(error)
    }
  }

  const getJourneys = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/utils/journeys`
    try{
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      if (response.status === 200){
        setJourney(data)
      } 
    } catch (error) {
      console.error(error)
    }
  }

  // filter
  const onChangeJourney = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedJourney(e.target.value);
  }

  const onChangeSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedSeason(e.target.value);
  }

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedCategory(e.target.value);
  }

  const onReset = () => {
    setSelectedJourney('')
    setSelectedSeason('')
    setSelectedCategory('')
  }

  const goToGames = (id: string) => {
    navigate(`${id}`)
  }

  const resultsTable = results.map( (item) => {
    return (
      <tr key={item.clashId}>
        <td className="text-center">
        {item.team1.club.symbol} {item.team1.name} vs {item.team2.club.symbol} {item.team2.name}
        </td>
        <td className="text-center">
          {item.journey}
        </td>
        <td className="text-center">
          {item.team1.category.name}
        </td>
        <td className="text-center">
          {item.host}
        </td>
        <td className="text-center">
          <Button variant="primary" onClick={() => goToGames(item.clashId)} >
            <FontAwesomeIcon icon={faTableTennis}/>
            Partidos
          </Button>
        </td>
      </tr>
    )
  })

  return (
    <div className='ranking-container'>
      <div>
        <h1>
          <FontAwesomeIcon icon={faPoll} />
          Resultados
        </h1>
      </div>

      <div className="filter-container">
        <Form.Select onChange={onChangeCategory} value={selectedCategory} aria-label="Filtrar por categoría">
          <option value="" disabled>Filtrar por categoría</option>
          {categories.map(item => {
            return <option key={item.categoryId} value={item.categoryId}>{item.name}</option>
          })}
        </Form.Select>

        <Form.Select onChange={onChangeJourney} value={selectedJourney} aria-label="Filtrar por jornada">
          <option value="" disabled>Filtrar por jornada</option>
          {journey.map(item => {
            return <option key={item.name} value={item.name}>{item.name}</option>
          })}
        </Form.Select>

        <Form.Select onChange={onChangeSeason} value={selectedSeason} aria-label="Filtrar por temporada">
          <option value="" disabled>Filtrar por temporada</option>
          {seasons.map(item => {
            return <option key={item.seasonId} value={item.seasonId}>{item.name}</option>
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
                Encuentro
              </th>
              <th className="text-center">
                Jornada
              </th>
              <th className="text-center">
                Categoría
              </th>
              <th className="text-center">
                Ubicación
              </th>
              <th className="text-center">
                Ver Partidos
              </th>
            </tr>
          </thead>

          <tbody>
            {results && resultsTable}
            {loading && 
              <tr className="text-center mt-3" >
                <td>
                  <FontAwesomeIcon className='center mt-5' icon={faCircleNotch} spin />
                </td>
              </tr>
            }
            {results.length === 0 && !loading && 
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

export default Results