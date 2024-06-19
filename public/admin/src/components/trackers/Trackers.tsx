import {
  faAddressBook,
  faCircleNotch,
  faEllipsisVertical,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import CreateTrackers from "./createTrackers/CreateTrackers";
import { IUser } from "../../types/interfaces";
import "./Trackers.scss";
import "react-toastify/dist/ReactToastify.css";
import { VITE_SERVER_URL } from "../../env/env.prod";
import ModalQuestion from "../modalQuestion/ModalQuestion";
import { deleteUser } from "../../services/user/deleteUser";
import { toast } from "react-toastify";

type RemoveAction = {
  user: null | IUser;
  showModal: boolean;
};

const Trackers = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [trackers, setTrackers] = useState<IUser[]>([]);
  const [filteredTrackers, setFilteredTrackers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const token: string = localStorage.getItem("authorization") || "";

  const [removeAction, setRemoveActiton] = useState<RemoveAction>({
    user: null,
    showModal: false,
  });

  useEffect(() => {
    getTrackers();
  }, []);

  const getTrackers = async (): Promise<void> => {
    setLoading(true);
    const url = `${VITE_SERVER_URL}/api/v1/users?canTrack=true`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const response = await fetch(url, requestOptions);

      const data = await response.json();

      if (response.status === 200) {
        setTrackers(data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredTrackers(
        trackers.filter(
          (item) =>
            item.firstName.toUpperCase().includes(search.toUpperCase()) ||
            item.lastName.toUpperCase().includes(search.toUpperCase()) ||
            item.email.toUpperCase().includes(search.toUpperCase())
        )
      );
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search, trackers]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const trackersTable = filteredTrackers
    .filter((i) => i.isAdmin == false)
    .map((item) => {
      return (
        <tr key={item.userId}>
          <td>{item.firstName}</td>
          <td className="text-center">{item.lastName}</td>
          <td className="text-center">{item.email}</td>
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
                    setRemoveActiton({ user: item, showModal: true })
                  }
                >
                  Eliminar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      );
    });

  const dismissModal = () => {
    setSearch("");
    getTrackers();
    setShowModalCreate(false);
  };

  const handleRemoveUser = async () => {
    if (!removeAction.user) {
      toast.error("Error al seleccionar usuario");
    }

    setLoading(true);

    const result = await deleteUser({
      userId: removeAction.user!.userId,
      token,
    });

    await getTrackers();

    setLoading(false);
    if (result.isFailure) {
      toast.error(result.getErrorValue());
    }

    toast.success(result.getValue());
  };

  return (
    <>
      {removeAction.showModal && (
        <ModalQuestion
          title="Eliminar"
          question={`¿Estás seguro que quieres eliminar a ${removeAction.user?.firstName} ${removeAction.user?.lastName}`}
          dismiss={() => {
            setRemoveActiton((prev) => ({
              ...prev,
              user: null,
              showModal: false,
            }));
          }}
          accept={() => handleRemoveUser()}
        />
      )}
      <div className="trackers-container">
        <div className="title-wrap">
          <h1>
            <FontAwesomeIcon icon={faAddressBook} />
            Medidores
          </h1>

          <div>
            <Button variant="primary" onClick={() => setShowModalCreate(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Crear nuevo
            </Button>
          </div>
        </div>

        <div className="filter-container">
          <InputGroup className="search">
            <InputGroup.Text id="searchBar">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar..."
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
                <th>Nombre</th>
                <th className="text-center">Apellido</th>
                <th className="text-center">Email</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <FontAwesomeIcon
                  className="center mt-5"
                  icon={faCircleNotch}
                  spin
                />
              ) : (
                <div>{trackersTable}</div>
              )}
            </tbody>
          </Table>
        </Card>
      </div>

      {showModalCreate && <CreateTrackers dismiss={dismissModal} />}
    </>
  );
};

export default Trackers;
