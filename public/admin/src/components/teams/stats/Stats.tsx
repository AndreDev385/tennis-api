import { useEffect, useState } from "react"
import { IJourney, ISeason, IStats, IStatsId } from "../../../interfaces/interfaces"
import { useParams } from "react-router"
import { faChartBar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Form, Table } from "react-bootstrap"
import "./Stats.scss";
import { VITE_SERVER_URL } from "../../../env/env.prod"

const Stats = () => {
  const { id } = useParams()
  const [stats, setStats] = useState<IStats>()
  const [journey, setJourney] = useState<IJourney[]>([])
  const [seasons, setSeasons] = useState<ISeason[]>([])
  const [selectedJourney, setSelectedJourney] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('')
  const token: string = localStorage.getItem('authorization') || '';

  useEffect(() => {
    getJourney()
    getSeasons()
  }, []);

  useEffect(() => {
    if (id) getStats(id)
  }, [id, selectedJourney, selectedSeason])

  const getStats = async (teamId: string) => {
    const params = {
      teamId,
      ...(selectedJourney && { journey: selectedJourney }),
      ...(selectedSeason && { season: selectedSeason }),
    };

    const url = `${VITE_SERVER_URL}/api/v1/team/stats?` + new URLSearchParams(params)
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
        setStats(calculateTotal(data))
      } 
    } catch (error) {
      console.error(error)
    }
  }

  const calculateTotal = (stats: IStatsId[]) => {
    let total : Record<keyof IStats, number> = {
      clashPlayedAsLocal: 0,
      clashPlayedAsVisitor: 0,
      clashWonAsLocal: 0,
      clashWonAsVisitor: 0,
      gamesPlayedAsLocal: 0,
      gamesPlayedAsVisitor: 0,
      gamesWonAsLocal: 0,
      gamesWonAsVisitor: 0,
      matchLostAsLocal: 0,
      matchLostAsVisitor: 0,
      matchPlayedAsLocal: 0,
      matchPlayedAsVisitor: 0,
      matchWonAsLocal: 0,
      matchWonAsVisitor: 0,
      matchsPlayedWithFirstSetWonAsLocal: 0,
      matchsPlayedWithFirstSetWonAsVisitor: 0,
      matchsWonWithFirstSetWonAsLocal: 0,
      matchsWonWithFirstSetWonAsVisitor: 0,
      setsPlayedAsLocal: 0,
      setsPlayedAsVisitor: 0,
      setsWonAsLocal: 0,
      setsWonAsVisitor: 0,
      superTieBreaksPlayedAsLocal: 0,
      superTieBreaksPlayedAsVisitor: 0,
      superTieBreaksWonAsLocal: 0,
      superTieBreaksWonAsVisitor: 0,
      totalClashPlayed: 0,
      totalClashWon: 0,
      totalGamesPlayed: 0,
      totalGamesWon: 0,
      totalMatchPlayed: 0,
      totalMatchWon: 0,
      totalMatchsPlayedWithFirstSetWon: 0,
      totalMatchsWonWithFirstSetWon: 0,
      totalSetsPlayed: 0,
      totalSetsWon: 0,
      totalSuperTieBreaksPlayed: 0,
      totalSuperTieBreaksWon: 0,
    }

    stats.forEach((item: IStatsId) => {
      for (const key in total) {
        if (item.hasOwnProperty(key)) {
          total[key as keyof IStats] +=  Number(item[key as keyof IStats]);
        }
      }
    });
    return total
  }

  const getSeasons = async () => {
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
      } 
    } catch (error) {
      console.error(error)
    }
  }

  const getJourney = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/utils/journeys`
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

  const onReset = () => {
    setSelectedJourney('')
    setSelectedSeason('')
  }

  return (
    <>
      <div className='stats-container'>
        <div>
          <h1>
            <FontAwesomeIcon icon={faChartBar} />
            Estadísticas
          </h1>
        </div>

        <div className="filter-container">
          <Form.Select onChange={onChangeJourney} value={selectedJourney} aria-label="Jornada">
            <option value="" disabled>Jornada</option>
            {journey.map(item => {
              return <option key={item.name} value={item.name}>{item.name}</option>
            })}
          </Form.Select>

          <Form.Select onChange={onChangeSeason} value={selectedSeason} aria-label="Temporada">
            <option value="" disabled>Temporada</option>
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
                  Estadística
                </th>
                <th className="text-center">
                  Total
                </th>
              </tr>
            </thead>

            {stats &&
              <tbody>
                <tr>
                  <td className="text-center">
                    Games ganados de local
                  </td>
                  <td className="text-center">
                    {stats.gamesWonAsLocal}/{stats.gamesPlayedAsLocal}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                    Games ganados de visitante
                  </td>
                  <td className="text-center">
                    {stats.gamesWonAsVisitor}/{stats.gamesPlayedAsVisitor}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                    Games ganados en total
                  </td>
                  <td className="text-center">
                    {stats.totalGamesWon}/{stats.totalGamesPlayed}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Sets ganados de local
                  </td>
                  <td className="text-center">
                    {stats.setsWonAsLocal}/{stats.setsPlayedAsLocal}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Sets ganados de visitante
                  </td>
                  <td className="text-center">
                    {stats.setsWonAsVisitor}/{stats.setsPlayedAsVisitor}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Sets ganados en total
                  </td>
                  <td className="text-center">
                    {stats.totalSetsWon}/{stats.totalSetsPlayed}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Super Tie-Breaks ganados de local
                  </td>
                  <td className="text-center">
                    {stats.superTieBreaksWonAsLocal}/{stats.superTieBreaksPlayedAsLocal}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Super Tie-Breaks ganados de visitante
                  </td>
                  <td className="text-center">
                    {stats.superTieBreaksWonAsVisitor}/{stats.superTieBreaksPlayedAsVisitor}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Super Tie-Breaks ganados en total
                  </td>
                  <td className="text-center">
                    {stats.totalSuperTieBreaksWon}/{stats.totalSuperTieBreaksPlayed}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Partidos ganados de local
                  </td>
                  <td className="text-center">
                    {stats.matchWonAsLocal}/{stats.matchPlayedAsLocal}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Partidos perdidos de local
                  </td>
                  <td className="text-center">
                    {stats.matchLostAsLocal}/{stats.matchPlayedAsLocal}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Partidos ganados de visitante
                  </td>
                  <td className="text-center">
                    {stats.matchWonAsVisitor}/{stats.matchPlayedAsVisitor}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Partidos perdidos de visitante
                  </td>
                  <td className="text-center">
                    {stats.matchLostAsVisitor}/{stats.matchPlayedAsVisitor}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Partidos ganados en total
                  </td>
                  <td className="text-center">
                    {stats.totalMatchWon}/{stats.totalMatchPlayed}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Partidos ganados ganando el primer set de local
                  </td>
                  <td className="text-center">
                    {stats.matchsWonWithFirstSetWonAsLocal}/{stats.matchsPlayedWithFirstSetWonAsLocal}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Partidos ganados ganando el primer set de visitante
                  </td>
                  <td className="text-center">
                    {stats.matchsWonWithFirstSetWonAsVisitor}/{stats.matchsPlayedWithFirstSetWonAsVisitor}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Total partidos ganados ganando el primer set
                  </td>
                  <td className="text-center">
                    {stats.totalMatchsWonWithFirstSetWon}/{stats.totalMatchsPlayedWithFirstSetWon}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Encuentros ganados de local
                  </td>
                  <td className="text-center">
                    {stats.clashWonAsLocal}/{stats.clashPlayedAsLocal}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Encuentros ganados de visitante
                  </td>
                  <td className="text-center">
                    {stats.clashWonAsVisitor}/{stats.clashPlayedAsVisitor}
                  </td>
                </tr>

                <tr>
                  <td className="text-center">
                  Encuentros ganados en total
                  </td>
                  <td className="text-center">
                    {stats.totalClashWon}/{stats.totalClashPlayed}
                  </td>
                </tr>
              </tbody>
            }
          </Table>
        </Card>
      </div>
    </>
  )
}

export default Stats