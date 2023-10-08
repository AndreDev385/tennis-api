import { Card, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faCircleNotch, faCopy, faTableTennis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "./Clubs.scss";
import { IClub } from '../../interfaces/interfaces';

const Clubs = () => {
  const [clubs, setClubs] = useState<IClub[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClubs()
  }, []);

  const getClubs = async () => {
    setLoading(true)
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/club`
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    try{
      const response = await fetch(url, requestOptions)
      
      const data = await response.json()

      if (response.status === 200){
        setClubs(data)
        setLoading(false)
      } 
    } catch (error) {
        setLoading(false)
    }
  }


  const copyClipboard = (code: string): void => {
    navigator.clipboard.writeText(code)
    toast.info("Copiado en el portapapeles!")
  }

  const clubTable = clubs.map( (item) => {
    return (
      <tr key={item.clubId}>
        <td>
          {item.name}
        </td>
        <td className='text-center'>
          {item.symbol}
        </td>
        <td className='text-center'>
          {item.code?
            <>
              {item.code} 
              <FontAwesomeIcon 
                onClick={() => copyClipboard(item.code)}
                className='copy' 
                icon={faCopy} />
            </>:
            <span>
              Sin código asignado
            </span> 
          }
        </td>
        <td className='text-center'>
          {item.isSubscribed? 
            <FontAwesomeIcon className='check-circle' icon={faCheckCircle} />: 
            <FontAwesomeIcon className='circle' icon={faCircle} />
          }
        </td>
      </tr>
    )
  })

  return (
    <>
      <div className='clubs-container'>
        <div className='d-flex justify-content-between'>
          <h1>
            <FontAwesomeIcon icon={faTableTennis} /> 
            Clubes
          </h1>
        </div>

        <Card>
          <Table responsive="sm">
            <thead className='fixed'>
              <tr>
                <th>
                  Nombre
                </th>
                <th className='text-center'>
                  Símbolo
                </th>
                <th className='text-center'>
                  Código
                </th>
                <th className='text-center'>
                  Suscripción
                </th>
              </tr>
            </thead>

            <tbody className='mt-3'>
              {loading? 
                <FontAwesomeIcon className='center mt-5' icon={faCircleNotch} spin />:
                <div>
                  {clubTable}
                </div>
              }
            </tbody>
          </Table>
        </Card>
      </div>
    </>
  )
}

export default Clubs