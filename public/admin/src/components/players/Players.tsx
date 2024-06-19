import {
  faBaseballBall,
  faChartBar,
  faCircleNotch,
  faEllipsisVertical,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { IClub, IUserPlayer } from "../../types/interfaces";
import { useNavigate } from "react-router";
import "./Players.scss";
import { VITE_SERVER_URL } from "../../env/env.prod";
import CreatePlayerModal from "./createPlayerModal/CreatePlayerModal";
import CreatePlayersModal from "./createPlayersModal/CreatePlayersModal";
import ModalQuestion from "../modalQuestion/ModalQuestion";
import { removePlayerFromClub } from "../../services/players/removePlayerFromClub";
import { toast } from "react-toastify";
import { changePlayerClub } from "../../services/players/changePlayerClub";

type PlayerActions = {
  showRemove: boolean;
  showChangeClub: boolean;
  player: IUserPlayer | null;
  selectedClub?: string;
};

const Players = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalPlayers, setShowModalPlayers] = useState(false);
  const [players, setPlayers] = useState<IUserPlayer[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<IUserPlayer[]>([]);
  const [selectedClub, setSelectedClub] = useState("");
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [playerActions, setPlayerActions] = useState<PlayerActions>({
    showChangeClub: false,
    showRemove: false,
    player: null,
  });

  const token: string = localStorage.getItem("authorization") || "";
  const navigate = useNavigate();

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  useEffect(() => {
    getPlayers();
    getClubs();
  }, []);

  const getPlayers = async () => {
    setLoading(true);
    const url = `${VITE_SERVER_URL}/api/v1/player`;
    try {
      const response = await fetch(url, requestOptions);

      const data = await response.json();

      if (response.status === 200) {
        const fullNameData = data.map((item: IUserPlayer) => {
          item.fullName = item.user.firstName + " " + item.user.lastName;
          return item;
        });
        setPlayers(fullNameData);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getClubs = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/club`;
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (response.status === 200) {
        setClubs(data);
      }
    } catch (error) { }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (selectedClub) {
        setFilteredPlayers(
          players.filter(
            (item) =>
              item.fullName.toUpperCase().includes(search.toUpperCase()) &&
              selectedClub === item.clubId
          )
        );
      } else {
        setFilteredPlayers(
          players.filter((item) =>
            item.fullName.toUpperCase().includes(search.toUpperCase())
          )
        );
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedClub, players]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onChangeClub = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedClub(e.target.value);
  };

  const onReset = () => {
    setSelectedClub("");
    setSearch("");
  };

  const goToStats = (id: string) => {
    navigate(`${id}`);
  };

  const onClosedModal = () => {
    setShowModalCreate(false);
  };

  const onClosePlayersModal = () => {
    setShowModalPlayers(false);
  };

  const handleRemovePlayerFromClub = async () => {
    if (playerActions.player == null) {
      toast.error("Error al seleccionar jugador");
      return;
    }

    setLoading(true);
    const result = await removePlayerFromClub(
      playerActions.player?.playerId,
      token
    );

    await getPlayers();

    if (result.isFailure) {
      setLoading(false);
      toast.error(result.getErrorValue());
    }

    setLoading(true);
    toast.success(result.getValue());
  };

  const handleChangePlayerClub = async () => {
    if (playerActions.player == null) {
      toast.error("Error al seleccionar jugador");
      return;
    }

    if (playerActions.selectedClub == undefined) {
      toast.error("Selecciona un club");
      return;
    }

    setLoading(true);
    const result = await changePlayerClub({
      token,
      playerId: playerActions.player.playerId,
      clubId: playerActions.selectedClub,
    });

    await getPlayers();

    if (result.isFailure) {
      setLoading(false);
      toast.error(result.getErrorValue());
    }

    setLoading(true);
    setPlayerActions((prev) => ({
      ...prev,
      showChangeClub: false,
      player: null,
    }))
    toast.success(result.getValue());
  };

  const playersTable = filteredPlayers
    .sort((a, b) => {
      const fullNameA =
        `${a.user.firstName} ${a.user.lastName}`.toLocaleLowerCase("es");
      const fullNameB =
        `${b.user.firstName} ${b.user.lastName}`.toLocaleLowerCase("es");
      return fullNameA.localeCompare(fullNameB, "es");
    })
    .map((item) => {
      return (
        <tr key={item.playerId}>
          <td className="text-center">
            {item.user.firstName} {item.user.lastName}
          </td>
          <td className="text-center">
            {clubs.filter((club) => club.clubId === item.clubId)[0]
              ? clubs.filter((club) => club.clubId === item.clubId)[0].symbol
              : "-"}
          </td>
          <td className="text-center">
            <Button
              variant="primary"
              onClick={() => goToStats(item.user.userId)}
            >
              <FontAwesomeIcon icon={faChartBar} />
              Estadísticas
            </Button>
          </td>
          <td className="text-center">
            <Dropdown>
              <Dropdown.Toggle as={Button} id="dropdown-basic" variant="link">
                <FontAwesomeIcon
                  className="ellipsis"
                  icon={faEllipsisVertical}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    setPlayerActions((prev) => ({
                      ...prev,
                      player: item,
                      showChangeClub: true,
                    }))
                  }
                >
                  Cambiar de Club
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    setPlayerActions((prev) => ({
                      ...prev,
                      player: item,
                      showRemove: true,
                    }))
                  }
                >
                  Remover del club
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      );
    });

  return (
    <>
      {playerActions.showRemove && (
        <ModalQuestion
          title="Eliminar"
          question={`¿Estás seguro que quieres eliminar a ${playerActions.player?.fullName} del club?`}
          dismiss={() => {
            setPlayerActions((prev) => ({
              ...prev,
              player: null,
              showRemove: false,
            }));
          }}
          accept={() => handleRemovePlayerFromClub()}
        />
      )}
      {playerActions.showChangeClub && (
        <Modal
          size="lg"
          show={playerActions.showChangeClub}
          onHide={() =>
            setPlayerActions((prev) => ({
              ...prev,
              showChangeClub: false,
              selectedClub: undefined,
              player: null,
            }))
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Cambiar de Club</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Quieres cambiar de club al jugador{" "}
              {playerActions.player?.fullName}?
            </p>
            <Form.Select
              value={playerActions.selectedClub}
              onChange={(e) =>
                setPlayerActions((prev) => ({
                  ...prev,
                  selectedClub: e.target.value,
                }))
              }
            >
              <option>Selecciona un club</option>
              {clubs.filter((c) => c.isSubscribed).map((c) => (
                <option key={c.clubId} value={c.clubId}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
              onClick={() => setPlayerActions(prev => ({
                ...prev,
                showChangeClub: false,
                selectedClub: undefined,
                player: null
              }))}
            >Cancelar</Button>
            <Button variant="primary" onClick={() => handleChangePlayerClub()}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div className="players-container">
        <div className="title-wrapper">
          <h1>
            <FontAwesomeIcon icon={faBaseballBall} />
            Jugadores
          </h1>

          <div className="buttons-wrapper">
            <Button variant="primary" onClick={() => setShowModalCreate(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Agregar jugador
            </Button>
            <Button variant="primary" onClick={() => setShowModalPlayers(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Agregar jugadores
            </Button>
          </div>
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

          <Form.Select
            onChange={onChangeClub}
            value={selectedClub}
            aria-label="Filtrar por clubes"
          >
            <option value="" disabled>
              Filtrar por clubes
            </option>
            {clubs.map((item) => {
              return (
                <option key={item.clubId} value={item.clubId}>
                  {item.symbol}
                </option>
              );
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
                <th className="text-center">Nombre</th>
                <th className="text-center">Club</th>
                <th className="text-center">Ver estadísticas</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {!loading && filteredPlayers && playersTable}
              {loading && (
                <tr className="text-center mt-3">
                  <td>
                    <FontAwesomeIcon
                      className="center mt-5"
                      icon={faCircleNotch}
                      spin
                    />
                  </td>
                </tr>
              )}
              {filteredPlayers.length === 0 && !loading && (
                <tr className="text-center mt-3">
                  <td>No hay resultados</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </div>

      {showModalCreate && (
        <CreatePlayerModal
          clubs={clubs}
          onClose={onClosedModal}
          getPlayers={getPlayers}
        />
      )}
      {showModalPlayers && (
        <CreatePlayersModal
          onClose={onClosePlayersModal}
          getPlayers={getPlayers}
        />
      )}
    </>
  );
};

export default Players;
