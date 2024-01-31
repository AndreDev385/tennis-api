import {
  faCircleNotch,
  faFileExcel,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
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
  onClose: (value: boolean) => void;
  getPlayers: () => Promise<void>;
}

const fileTypes = ['XLSX', 'XLS'];

const CreatePlayersModal = ({ clubs, onClose, getPlayers }: IProps) => {
  const token: string = localStorage.getItem('authorization') || '';

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (file: File | null) => {
    if (file) {
      setFile(file);
    }
  };

  const fileSizeInMB = (size: number) => {
    const mbSize = Math.round(size / 1024 / 1024);

    if (mbSize <= 0) {
      return '< 1 MB';
    }

    return `${mbSize} MB`;
  };

  const handleDeleteFile = () => {
    setFile(null);
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
              {!file && (
                <div className='uploader'>
                  <FileUploader
                    classes='drop_area drop_zone'
                    handleChange={handleChange}
                    name='file'
                    fileTypes={fileTypes}
                    label='Arrastra un archivo o haz click aquí para cargar jugadores. Recuerda que el archivo debe ser .xlsx o .xls'
                    multiple={false}
                    disabled={file ? true : false}
                  />
                </div>
              )}
              {file && (
                <div className='file'>
                  <div className='file-wrapper'>
                    <div className='excel-icons'>
                      <FontAwesomeIcon icon={faFileExcel} size='2x' color='#1D6F42' />
                    </div>
                    <div className='file-info'>
                      <p>{file.name}</p>
                      <p>{fileSizeInMB(file.size)}</p>
                    </div>
                  </div>
                  <button className='file-x' onClick={handleDeleteFile}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              )}
            </section>
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
