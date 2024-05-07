import { faBell, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface INotificationsProps {
    dismiss: (event: boolean) => void;
}

const Notifications = ({dismiss}: INotificationsProps) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  })
  const [ submitted, setSubmitted ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const value = event.target.value;
    setForm((prev) => ({
      ...prev,
      title: value
    }))
  }

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const value = event.target.value;
    setForm((prev) => ({
      ...prev,
      description: value
    }))
  }

  const handleSubmit = () => {
    setSubmitted(true);
    if (!form.title || !form.description) return;
    setLoading(true)
    dismiss(true)
}

  return (
    <>
      <div className="overlay" />
      <div className="modal show wrap-modal edit-news">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>
              Crear notificación
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form>
                <Form.Group className='mb-3' controlId='formText'>
                  <Form.Label>
                      Título
                  </Form.Label>

                  <Form.Control 
                      required 
                      type="text"
                      value={form.title}
                      placeholder='Título' 
                      onChange={handleChangeTitle}
                  />
                  { submitted && !form.title &&
                    <span className='ms-2 text-error'>
                      Título requerido
                    </span>
                  }
                </Form.Group>

                <Form.Group className='mb-3' controlId='formDescription'>
                  <Form.Label>
                    Descripción
                  </Form.Label>

                  <Form.Control 
                      required 
                      type="url"
                      value={form.description}
                      placeholder='Descripción' 
                      onChange={handleChangeDescription}
                  />
                  { submitted && !form.description &&
                    <span className='ms-2 text-error'>
                      Descripción requerido
                    </span>
                  }
                </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => dismiss(false)}>
              Cancelar
            </Button>
            <Button onClick={() => handleSubmit()} variant="primary">
              {loading?
                <FontAwesomeIcon icon={faCircleNotch} spin />:
                <span>
                  <FontAwesomeIcon className='me-2' icon={faBell} />
                  Crear notificación
                </span>
              }
              </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  )
}

export default Notifications
