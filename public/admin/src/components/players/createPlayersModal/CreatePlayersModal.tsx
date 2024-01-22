import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal } from 'react-bootstrap';
import { IClub } from '../../../interfaces/interfaces';
import { useState } from 'react';
import validator from 'validator';
import { VITE_SERVER_URL } from '../../../env/env.prod';
import { toast } from 'react-toastify';
import { FileUploader } from 'react-drag-drop-files';
import '../Players.scss';

interface IProps {
  clubs: IClub[];
  onClose: (value: boolean) => void;
  getPlayers: () => Promise<void>;
}

const fileTypes = ['XLSX', 'XLS'];

const CreatePlayersModal = ({ clubs, onClose, getPlayers }: IProps) => {
  const filterClubs = clubs.filter((item) => item.isSubscribed === true);
  const token: string = localStorage.getItem('authorization') || '';

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (files: FileList | null) => {
    if (files) {
      setFile(files[0]);
    }
  };

  return (
    <>
      <div className='overlay' />

      <div className='modal show wrap-modal'>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Agregar jugadores</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <section className='create-players-section'>
              <h2>Cargar jugadores</h2>
              <div className='uploader'>
                <FileUploader
                  classes='drop_area drop_zone'
                  handleChange={handleChange}
                  name='file'
                  fileTypes={fileTypes}
                  label='Arrastra un archivo o haz click aquí para cargar jugadores. Recuerda que el archivo debe ser .xlsx o .xls'
                />
              </div>
            </section>
            <Form></Form>
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

export default CreatePlayersModal;
