import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import { useParams } from "react-router";
import "./PlayerStats.scss";
import { ISeason, ISetStatsIndiv } from "../../../types/interfaces";
import { VITE_SERVER_URL } from "../../../env/env.prod";
import { mapToUrlString } from "../../../utils/mapToUrlString";
import { getSeasonList } from "../../../services/season/getSeasonList";
import { Loading } from "../../shared/loading";
import { ErrorMessage } from "../../shared/errorMessage";

type SearchParams = {
  isDouble: boolean;
  season?: string;
  limit?: number
}

const INITIAL_PARAMS = {
  isDouble: true,
}

const PlayerStats = () => {
  const [stats, setStats] = useState<ISetStatsIndiv | undefined>(undefined);
  const [searchParams, setSearchParams] = useState<SearchParams>(INITIAL_PARAMS);
  const [seasons, setSeasons] = useState<ISeason[]>([]);

  const [state, setState] = useState({
    loading: true,
    error: "",
  })

  const token: string = localStorage.getItem("authorization") || "";
  const { id } = useParams();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  useEffect(() => {
    getSeasons();
  }, [])

  useEffect(() => {
    getStats();
  }, [id, searchParams]);

  const getSeasons = async () => {
    setState(prev => ({ ...prev, loading: true }))
    const result = await getSeasonList({});
    setState(prev => ({ ...prev, loading: false }))

    if (result.isFailure) {
      setState(prev => ({ ...prev, error: result.getErrorValue() as string }))
      return;
    }

    setSeasons(result.getValue() as ISeason[]);
  }

  const getStats = async () => {
    const url =
      `${VITE_SERVER_URL}/api/v1/player/stats-by-userid/` +
      id +
      "?" +
      new URLSearchParams(mapToUrlString(searchParams));

    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (response.status !== 200) {
        setState({ loading: false, error: data["message"] })
        return;
      }
      setState({ loading: false, error: "" });
      setStats(data);
    } catch (error) {
      setState(prev => ({ ...prev, error: "Ha ocurrido un error" }))
    }
  };

  function render() {
    if (state.loading) {
      return Loading();
    }
    if (state.error.length > 0) {
      return ErrorMessage(state.error)
    }
    return (
      <Card>
        <Table responsive="sm">
          <thead>
            <tr>
              <th className="text-center">Estadística</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>

          {stats && (
            <tbody>
              <div className="title">
                <span>Servicio</span>
              </div>

              <tr>
                <td className="text-center">Aces</td>
                <td className="text-center">{stats.aces}</td>
              </tr>

              <tr>
                <td className="text-center">Doble falta</td>
                <td className="text-center">{stats.dobleFaults}</td>
              </tr>

              <tr>
                <td className="text-center">1er servicio in</td>
                <td className="text-center">
                  {stats.firstServIn}/
                  {stats.firstServIn + stats.secondServIn + stats.dobleFaults}
                </td>
              </tr>

              <tr>
                <td className="text-center">1er saque ganador</td>
                <td className="text-center">{stats.firstServWon}</td>
              </tr>

              <tr>
                <td className="text-center">
                  Puntos ganados con el 1er servicio
                </td>
                <td className="text-center">
                  {stats.pointsWinnedFirstServ}/{stats.firstServIn}
                </td>
              </tr>

              <tr>
                <td className="text-center">2do servicio in</td>
                <td className="text-center">
                  {stats.secondServIn}/{stats.secondServIn + stats.dobleFaults}
                </td>
              </tr>

              <tr>
                <td className="text-center">2do saque ganador</td>
                <td className="text-center">{stats.secondServWon}</td>
              </tr>

              <tr>
                <td className="text-center">
                  Puntos ganados con el 2do servicio
                </td>
                <td className="text-center">
                  {stats.pointsWinnedSecondServ}/{stats.secondServIn}
                </td>
              </tr>

              <tr>
                <td className="text-center">Break points salvados</td>
                <td className="text-center">
                  {stats.breakPtsSaved}/{stats.saveBreakPtsChances}
                </td>
              </tr>

              <tr>
                <td className="text-center">Games ganados con el servicio</td>
                <td className="text-center">
                  {stats.gamesWonServing}/
                  {stats.gamesWonServing + stats.gamesLostServing}
                </td>
              </tr>

              <div className="title">
                <span>Devolución</span>
              </div>

              <tr>
                <td className="text-center">1era devolución in</td>
                <td className="text-center">
                  {stats.firstReturnIn}/
                  {stats.firstReturnIn + stats.firstReturnOut}
                </td>
              </tr>

              <tr>
                <td className="text-center">1era devolución ganadora</td>
                <td className="text-center">{stats.firstReturnWon}</td>
              </tr>

              <tr>
                <td className="text-center">
                  Winner con 1era devolución ganadora
                </td>
                <td className="text-center">{stats.firstReturnWinner}</td>
              </tr>

              <tr>
                <td className="text-center">
                  Puntos ganados con la 1era devolución
                </td>
                <td className="text-center">
                  {stats.pointsWinnedFirstReturn}/{stats.firstReturnIn}
                </td>
              </tr>

              <tr>
                <td className="text-center">2da devolución in</td>
                <td className="text-center">
                  {stats.secondReturnIn}/
                  {stats.secondReturnIn + stats.secondReturnOut}
                </td>
              </tr>

              <tr>
                <td className="text-center">2da devolución ganadora</td>
                <td className="text-center">{stats.secondReturnWon}</td>
              </tr>

              <tr>
                <td className="text-center">
                  Winner con 2da devolución ganadora
                </td>
                <td className="text-center">{stats.secondReturnWinner}</td>
              </tr>

              <tr>
                <td className="text-center">
                  Puntos ganados con la 2da devolución
                </td>
                <td className="text-center">
                  {stats.pointsWinnedSecondReturn}/{stats.secondReturnIn}
                </td>
              </tr>

              <div className="title">
                <span>Pelota en juego</span>
              </div>

              <tr>
                <td className="text-center">Puntos ganados en malla</td>
                <td className="text-center">
                  {stats.meshPointsWon}/
                  {stats.meshPointsWon + stats.meshPointsLost}
                </td>
              </tr>

              <tr>
                <td className="text-center">Winners en malla</td>
                <td className="text-center">{stats.meshWinner}</td>
              </tr>

              <tr>
                <td className="text-center">Errores en malla</td>
                <td className="text-center">{stats.meshError}</td>
              </tr>

              <tr>
                <td className="text-center">
                  Puntos ganados en fondo/approach
                </td>
                <td className="text-center">
                  {stats.bckgPointsWon}/
                  {stats.bckgPointsWon + stats.bckgPointsLost}
                </td>
              </tr>

              <tr>
                <td className="text-center">Winners en fondo/approach</td>
                <td className="text-center">{stats.bckgWinner}</td>
              </tr>

              <tr>
                <td className="text-center">Errores en fondo/approach</td>
                <td className="text-center">{stats.bckgError}</td>
              </tr>

              <tr>
                <td className="text-center">Total winners</td>
                <td className="text-center">
                  {stats.bckgWinner +
                    stats.meshWinner +
                    stats.aces +
                    stats.firstReturnWinner +
                    stats.secondReturnWinner}
                </td>
              </tr>

              <tr>
                <td className="text-center">Total errors</td>
                <td className="text-center">
                  {stats.bckgError + stats.meshError + stats.dobleFaults}
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </Card>
    )
  }

  return (
    <div className="player-stats-container">
      <div>
        <h1>
          <FontAwesomeIcon icon={faChartBar} />
          Estadísticas
        </h1>
      </div>

      <div className="filter-container">
        <Form.Select
          aria-label="Temporada"
        >
          <option value="">Selecciona una temporada</option>
          {
            seasons.map((season) => (
              <option
                value={season.seasonId}
                key={season.seasonId}
              >
                {season.name}
              </option>
            ))
          }
        </Form.Select>
        <Form.Control
          placeholder="# partidos"
          type="number"
          aria-label="Últimos # partidos"
          value={searchParams.limit ?? ""}
          onChange={(e) => setSearchParams((prev) => ({ ...prev, limit: Number(e.target.value) }))}
        />
        <Form.Select
          aria-label="Dobles/Single"
          value={searchParams.isDouble ? "true" : ""}
          onChange={(e) => setSearchParams(prev => ({ ...prev, isDouble: !!e.target.value }))}
        >
          <option value="true">Dobles</option>
          <option value="">Single</option>
        </Form.Select>
        <Button
          onClick={() => setSearchParams(INITIAL_PARAMS)}
          type="button"
          variant="secondary"
        >
          Limpiar filtro
        </Button>
      </div>
      {render()}
    </div>
  );
};

export default PlayerStats;
