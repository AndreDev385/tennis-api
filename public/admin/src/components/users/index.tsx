import {
  faCheckCircle,
  faCircle,
  faCircleNotch,
  faEllipsisVertical,
  faSearch,
  faUser,
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
import { ToastContainer, toast } from "react-toastify";

import { listUsers } from "../../services/user/listUsers";
import type { User } from "../../types/users";
import { EditUserModal } from "./editUser";
import ModalQuestion from "../modalQuestion/ModalQuestion";
import { deleteUser } from "../../services/user/deleteUser";

type ComponentState = {
  loading: boolean;
  error: string;
};

export function UsersTablePage() {
  const [state, setState] = useState<ComponentState>({
    loading: true,
    error: "",
  });
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const token: string = localStorage.getItem("authorization") || "";

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [editUserModal, setEditUserModal] = useState<{ visible: boolean }>({
    visible: false,
  });
  const [removeUserModal, setRemoveUserModal] = useState<{ visible: boolean }>({
    visible: false,
  });

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleListUsers = async () => {
    setState({ loading: true, error: "" });
    const result = await listUsers({
      token,
      query: { isAdmin: "false", canTrack: "false" },
    });

    if (result.isFailure) {
      setState({ loading: false, error: result.getErrorValue()! });
      return;
    }

    setState({ loading: false, error: "" });
    setUsers(result.getValue());
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleListUsers();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredUsers(
        users.filter(
          (item) =>
            item.firstName.toUpperCase().includes(search.toUpperCase()) ||
            item.lastName.toUpperCase().includes(search.toUpperCase()) ||
            item.ci?.toUpperCase().includes(search.toUpperCase()) ||
            item.email?.toUpperCase().includes(search.toUpperCase()),
        ),
      );
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search, users]);

  const handleRemoveUser = async () => {
    if (!selectedUser) {
      toast.error("Error al seleccionar usuario");
      return;
    }

    setState({ loading: true, error: "" });

    const result = await deleteUser({
      userId: selectedUser.userId,
      token,
    });

    await handleListUsers();

    setState({ loading: false, error: "" });

    if (result.isFailure) {
      toast.error(result.getErrorValue());
      return;
    }

    toast.success(result.getValue());
  };

  const dismissModal = (loadUsers: boolean) => {
    setEditUserModal({ visible: false });
    if (loadUsers) {
      handleListUsers();
    }
  };

  const table = filteredUsers.map((item: User) => {
    return (
      <tr key={item.userId}>
        <td className="text-center">
          {item.firstName} {item.lastName}
        </td>
        <td className="text-center">{item.email}</td>
        <td className="text-center">{item.ci}</td>
        <td className="text-center">
          {item.isDeleted ? (
            <FontAwesomeIcon
              style={{ color: "#fb7676" }}
              className="circle"
              icon={faCircle}
            />
          ) : (
            <FontAwesomeIcon
              style={{ color: "#0fb85b" }}
              className="check-circle"
              icon={faCheckCircle}
            />
          )}
        </td>
        <td className="text-center">
          <Dropdown>
            <Dropdown.Toggle
              color="blue"
              as={Button}
              id="dropdown-basic"
              variant="link"
            >
              <FontAwesomeIcon
                color="black"
                className="ellipsis"
                icon={faEllipsisVertical}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                disabled={item.isDeleted}
                onMouseDown={() => {
                  setSelectedUser(item);
                  setEditUserModal({ visible: true });
                }}
              >
                Editar
              </Dropdown.Item>
              <Dropdown.Item
                disabled={item.isDeleted}
                onMouseDown={() => {
                  setSelectedUser(item);
                  setRemoveUserModal({ visible: true });
                }}
              >
                Eliminar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  });

  function render() {
    if (state.loading) {
      return (
        <FontAwesomeIcon className="center mt-5" icon={faCircleNotch} spin />
      );
    }
    if (state.error.length > 0) {
      return state.error;
    }
    return table;
  }

  return (
    <>
      {editUserModal.visible && (
        <EditUserModal user={selectedUser!} dismiss={dismissModal} />
      )}
      {removeUserModal.visible && (
        <ModalQuestion
          title="Eliminar"
          question={`¿Estás seguro que quieres eliminar a ${selectedUser?.firstName} ${selectedUser?.lastName}`}
          dismiss={() => {
            setSelectedUser(null);
            setRemoveUserModal({ visible: false });
          }}
          accept={() => handleRemoveUser()}
        />
      )}
      <div className="admins-container">
        <div className="title-wrap">
          <h1>
            <FontAwesomeIcon icon={faUser} />
            Usuarios
          </h1>
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
                <th className="text-center">Nombre y Apellido</th>
                <th className="text-center">Email</th>
                <th className="text-center">CI</th>
                <th className="text-center">Activo</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>{render()}</tbody>
          </Table>
        </Card>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
