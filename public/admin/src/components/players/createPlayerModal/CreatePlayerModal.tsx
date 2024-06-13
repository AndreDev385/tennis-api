import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal } from 'react-bootstrap';
import { IClub } from '../../../types/interfaces';
import { useState } from 'react';
import validator from 'validator';
import { VITE_SERVER_URL } from '../../../env/env.prod';
import { toast } from 'react-toastify';

interface IProps {
  clubs: IClub[];
  onClose: (value: boolean) => void;
  getPlayers: () => Promise<void>;
}

const CreatePlayerModal = ({ clubs, onClose, getPlayers }: IProps) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    clubSymbol: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validClub, setValidClub] = useState(false);
  const [loading, setLoading] = useState(false);
  const filterClubs = clubs.filter((item) => item.isSubscribed === true);
  const token: string = localStorage.getItem('authorization') || '';

  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm((prev) => ({
      ...prev,
      firstName: value,
    }));
  };

  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm((prev) => ({
      ...prev,
      lastName: value,
    }));
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValidEmail(validator.isEmail(value));
    setForm((prev) => ({
      ...prev,
      email: value,
    }));
  };

  const onChangeClub = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setValidClub(value !== '');

    setForm((prev) => ({
      ...prev,
      clubSymbol: value,
    }));
  };

  const createPlayer = async () => {
    const url = `${VITE_SERVER_URL}/api/v1/player/register`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(form),
    };

    try {
      const response = await fetch(url, requestOptions);
      const clone = response.clone();
      let data;
      try {
        data = await response.json();
      } catch {
        data = await clone.text();
      }

      if (response.status !== 201) {
        throw new Error(data?.message);
      }

      toast.success('Jugador agregado correctamente');
      onClose(true);
      await getPlayers();
    } catch (error) {
      toast.error(
        `${(error as Error).message ??
        'Ha ocurrido un error al intentar agregar el jugador'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.clubSymbol) {
      return;
    }
    setSubmitted(true);
    setLoading(true);
    await createPlayer();
  };

  return (
    <>
      <div className='overlay' />

      <div className='modal show wrap-modal'>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Agregar jugador</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className='mb-3' controlId='formFirstName'>
                <Form.Label>Nombre</Form.Label>

                <Form.Control
                  required
                  type='text'
                  placeholder='Nombre'
                  onChange={onChangeFirstName}
                />

                {submitted && !form.firstName && (
                  <span className='ms-2 text-error'>Nombre es requerido</span>
                )}
              </Form.Group>

              <Form.Group className='mb-3' controlId='formLastName'>
                <Form.Label>Apellido</Form.Label>

                <Form.Control
                  required
                  type='text'
                  placeholder='Apellido'
                  onChange={onChangeLastName}
                />

                {submitted && !form.firstName && (
                  <span className='ms-2 text-error'>Apellido es requerido</span>
                )}
              </Form.Group>

              <Form.Group className='mb-3' controlId='formEmail'>
                <Form.Label>Correo electrónico</Form.Label>

                <Form.Control
                  required
                  type='email'
                  placeholder='Correo electrónico'
                  onChange={onChangeEmail}
                />

                {submitted && !validEmail && (
                  <span className='ms-2 text-error'>Correo electrónico inválido</span>
                )}
              </Form.Group>

              <Form.Group className='mb-3' controlId='formClub'>
                <Form.Label>Club</Form.Label>
                <Form.Select
                  aria-label='Selecciona un club'
                  defaultValue=''
                  onChange={onChangeClub}
                >
                  <option value='' disabled>
                    Selecciona un club
                  </option>
                  {filterClubs.map((item) => {
                    return (
                      <option key={item.symbol} value={item.symbol}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>

                {submitted && !validClub && (
                  <span className='ms-2 text-error'>Club es requerido</span>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer
            style={{
              justifyContent: 'center',
            }}
          >
            <Button variant='secondary' onClick={() => onClose(false)}>
              Cancelar
            </Button>
            <Button variant='primary' onClick={handleSubmit}>
              {loading ? (
                <FontAwesomeIcon icon={faCircleNotch} spin />
              ) : (
                <span>
                  <FontAwesomeIcon className='me-2' icon={faPlus} />
                  Agregar
                </span>
              )}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default CreatePlayerModal;
