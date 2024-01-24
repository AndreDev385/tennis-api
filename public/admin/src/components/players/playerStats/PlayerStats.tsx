import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Card, Form, Table } from "react-bootstrap";
import { useParams } from "react-router";
import "./PlayerStats.scss";
import { ISetStatsIndiv } from "../../../interfaces/interfaces";
import { VITE_SERVER_URL } from "../../../env/env.prod";

const PlayerStats = () => {
  const [stats, setStats] = useState<ISetStatsIndiv | undefined>(undefined);
  const [param, setParam] = useState("last");
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
    getStats();
  }, [id, param]);

  const getStats = async () => {
    const params = {
      ...(param === "last" && { last: "true" }),
      ...(param === "last3" && { last3: "true" }),
      ...(param === "season" && { season: "true" }),
    };
    const url =
      `${VITE_SERVER_URL}/api/v1/player/stats-by-userid/` +
      id +
      "?" +
      new URLSearchParams(params);

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setStats(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // filter
  const onChangeParam = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setParam(e.target.value);
  };

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
          onChange={onChangeParam}
          value={param}
          aria-label="Jornada"
        >
          <option value="last">Último</option>
          <option value="last3">Últimos 3</option>
          <option value="season">Temporada</option>
          <option value="">Siempre</option>
        </Form.Select>
      </div>

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
    </div>
  );
};

export default PlayerStats;
