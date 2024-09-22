import { type FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import type { User } from "../../types/users";
import { toast } from "react-toastify";
import { editUser } from "../../services/user/editUser";

type Props = {
  user: User;
  dismiss: (loadUsers: boolean) => void;
};

export function EditUserModal({ user, dismiss }: Props) {
  const token: string = localStorage.getItem("authorization") || "";

  const isValidCI = (value: string): boolean => {
    const re = /^[V|E|J|P][0-9]{5,9}$/;
    return re.test(value);
  };

  const ciOptions = [
    {
      value: "V",
      name: "Venezolano",
    },
    {
      value: "E",
      name: "Extranjero",
    },
    {
      value: "P",
      name: "Pasaporte",
    },
  ];

  const ciType = (ci: string | null) => {
    if (ci == null) {
      return "";
    }
    return ci[0];
  };

  const ciValue = (ci: string | null) => {
    if (ci == null) {
      return "";
    }
    return ci.substring(1);
  };

  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    ciType: ciType(user.ci),
    ciValue: ciValue(user.ci),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const htmlForm = event.currentTarget;

    if (htmlForm.checkValidity() === false) {
      return;
    }

    const ci = `${form.ciType}${form.ciValue}`;

    if (!isValidCI(ci)) {
      toast.info(`La CI ${ci} es invalida, por lo tanto no sera actualizada`);
    }

    const body = {
      userId: user.userId,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email ?? undefined,
      ci,
    };

    const result = await editUser(token, body);

    if (result.isFailure) {
      toast.error(result.getErrorValue());
      return;
    }

    dismiss(true);
    toast.success("Usuario editado con exito");
  };

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="overlay" />

      <div className="modal show wrap-modal">
        <Form onSubmit={handleSubmit}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>Nombre</Form.Label>

                <Form.Control
                  name="firstName"
                  required
                  type="text"
                  value={form.firstName}
                  placeholder="Nombre"
                  onChange={(e) =>
                    onFormChange(e as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                {/*submitted && !form.firstName &&
                  <span className='ms-2 text-error'>
                    Nombre es requerido
                  </span>
                */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Apellido</Form.Label>

                <Form.Control
                  name="lastName"
                  required
                  type="text"
                  value={form.lastName}
                  placeholder="Apellido"
                  onChange={(e) =>
                    onFormChange(e as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                {/*submitted && !form.firstName &&
                  <span className='ms-2 text-error'>
                    Apellido es requerido
                  </span>
                */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>

                <Form.Control
                  name="email"
                  disabled={!user.email}
                  type="email"
                  value={form.email ?? ""}
                  placeholder="Correo electrónico"
                  onChange={(e) =>
                    onFormChange(e as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                {/*submitted && !validEmail &&
                  <span className='ms-2 text-error'>
                    Correo electrónico inválido
                  </span>
                */}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>Tipo de documento</Form.Label>
                <Form.Select
                  name="ciType"
                  defaultValue={ciType(user.ci)}
                  onChange={(e) =>
                    setForm((prev) => {
                      console.log(e.currentTarget.value, "event value");

                      return {
                        ...prev,
                        ciType: e.currentTarget.value,
                      };
                    })
                  }
                >
                  <option>Selecciona un tipo de documento</option>
                  {ciOptions.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>CI</Form.Label>

                <Form.Control
                  name="ciValue"
                  type="text"
                  value={form.ciValue}
                  placeholder="Cédula de identidad"
                  onChange={(e) =>
                    onFormChange(e as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                {/*submitted && !form.firstName &&
                  <span className='ms-2 text-error'>
                    Nombre es requerido
                  </span>
                */}
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => dismiss(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                <span>Editar</span>
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Form>
      </div>
    </>
  );
}
