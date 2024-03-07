import { Card, Form, InputGroup, Table, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCircle,
  faCircleNotch,
  faCopy,
  faSearch,
  faTableTennis,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IClub } from '../../interfaces/interfaces';
import './Clubs.scss';
import { VITE_SERVER_URL } from '../../env/env.prod';
import ModalQuestion from '../modalQuestion/ModalQuestion';
import { requestClubSubscription } from '../../utils/data';
import { unsubscribeClub } from '../../services/club/removeClubSubscription';

const Clubs = () => {
  const [clubs, setClubs] = useState<IClub[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<IClub[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClub, setSelectedClub] = useState<IClub | null>(null);
  const [showSubscribed, setShowSubscribed] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const token: string = localStorage.getItem("authorization") || "";

  useEffect(() => {
    getClubs();
  }, []);

  const getClubs = async () => {
    setLoading(true);
    const url = `${VITE_SERVER_URL}/api/v1/club`;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(url, requestOptions);

      const data = await response.json();

      if (response.status === 200) {
        setClubs(data);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const copyClipboard = (code: string): void => {
    navigator.clipboard.writeText(code);
    toast.info('Copiado en el portapapeles!');
  };

  // filter
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredClubs(
        clubs.filter((item) => item.name.toUpperCase().includes(search.toUpperCase()))
      );
      setLoading(false);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search, clubs]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleShowSubscribed = () => {
    setShowSubscribed(!showSubscribed);
  };

  const handleSelectClub = (club: IClub) => {
    setSelectedClub(club);
  };

  const handleSuscribeClub = async () => {
    const toastId = toast.loading('Estamos suscribiendo el club...');
    try {
      await requestClubSubscription(selectedClub!.clubId, token);

      await getClubs();

      toast.success('Club suscrito exitosamente!');
    } catch (error) {
      toast.error('Error al intentar suscribir el club!');
    } finally {
      toast.dismiss(toastId);
      setShowSubscribed(false);
      setSelectedClub(null);
    }
  };

  const removeClubSubscription = async () => {
    setLoading(true);
    try {
      const result = await unsubscribeClub(selectedClub!.clubId, token)

      await getClubs();

      if (result.isFailure) {
        return toast.error(result.getErrorValue());
      }

      toast.success(result.getValue());
    } finally {
      setLoading(false)
    }
  }

  const clubTable = filteredClubs.map((item) => {
    return (
      <tr key={item.clubId}>
        <td>{item.name}</td>
        <td className='text-center'>{item.symbol}</td>
        <td className='text-center'>
          {item.code ? (
            <>
              {item.code}
              <FontAwesomeIcon
                onClick={() => copyClipboard(item.code)}
                className='copy'
                icon={faCopy}
              />
            </>
          ) : (
            <span>Sin código asignado</span>
          )}
        </td>
        <td className='text-center'>
          {item.isSubscribed ? (
            <FontAwesomeIcon className='check-circle' icon={faCheckCircle} />
          ) : (
            <FontAwesomeIcon className='circle' icon={faCircle} />
          )}
        </td>
        <td className='text-center'>
          <Dropdown>
            <Dropdown.Toggle as={Button} id='dropdown-basic' variant='link'>
              <FontAwesomeIcon className='ellipsis' icon={faEllipsisVertical} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  handleSelectClub(item);
                  handleShowSubscribed();
                }}
                disabled={item.isSubscribed}
              >
                Suscribir
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleSelectClub(item);
                  setShowRemoveModal((prev) => !prev)
                }}
                disabled={!item.isSubscribed}
              >
                Remover
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  });

  return (
    <>
      {showSubscribed && (
        <ModalQuestion
          title='Suscribir'
          question={`¿Estás seguro que quieres suscribir ${selectedClub?.name || ''}?`}
          dismiss={() => {
            setShowSubscribed(false);
            setSelectedClub(null);
          }}
          accept={() => handleSuscribeClub()}
        />
      )}

      {showRemoveModal && (
        <ModalQuestion
          title='Eliminar suscripción '
          question={`¿Estás seguro que quieres remover la suscripción de ${selectedClub?.name || ''}?`}
          dismiss={() => {
            setShowRemoveModal(false);
            setSelectedClub(null);
          }}
          accept={() => removeClubSubscription()}
        />
      )}
      <div className='clubs-container'>
        <div className='d-flex justify-content-between'>
          <h1>
            <FontAwesomeIcon icon={faTableTennis} />
            Clubes
          </h1>
        </div>

        <div className='filter-container'>
          <InputGroup className='search'>
            <InputGroup.Text id='searchBar'>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              placeholder='Buscar por nombre...'
              aria-label='search'
              aria-describedby='searchBar'
              className='input-search'
              value={search}
              onChange={onChangeSearch}
            />
          </InputGroup>
        </div>

        <Card>
          <Table responsive='sm'>
            <thead className='fixed'>
              <tr>
                <th>Nombre</th>
                <th className='text-center'>Símbolo</th>
                <th className='text-center'>Código</th>
                <th className='text-center'>Suscripción</th>
                <th className='text-center'>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredClubs && clubTable}
              {loading && (
                <tr className='text-center mt-3'>
                  <td>
                    <FontAwesomeIcon className='center mt-5' icon={faCircleNotch} spin />
                  </td>
                </tr>
              )}
              {filteredClubs.length === 0 && !loading && (
                <tr className='text-center mt-3'>
                  <td>No hay resultados</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </div>
    </>
  );
};

export default Clubs;
