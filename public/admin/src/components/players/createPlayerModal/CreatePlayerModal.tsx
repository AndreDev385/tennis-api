import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal } from 'react-bootstrap';
import { IClub } from '../../../interfaces/interfaces';

interface IProps {
  clubs: IClub[];
  onClose: (value: boolean) => void;
}

const CreatePlayerModal = ({ clubs, onClose }: IProps) => {
  const filterClubs = clubs.filter((item) => item.isSubscribed === true);

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

                <Form.Control required type='text' placeholder='Nombre' />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formLastName'>
                <Form.Label>Apellido</Form.Label>

                <Form.Control required type='text' placeholder='Apellido' />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formEmail'>
                <Form.Label>Correo electrónico</Form.Label>

                <Form.Control required type='email' placeholder='Correo electrónico' />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formClub'>
                <Form.Label>Club</Form.Label>
                <Form.Select aria-label='Selecciona un club' defaultValue=''>
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
            <Button variant='primary'>
              <span>
                <FontAwesomeIcon className='me-2' icon={faPlus} />
                Agregar
              </span>
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default CreatePlayerModal;
