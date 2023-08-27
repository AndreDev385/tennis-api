import { Button, Modal } from 'react-bootstrap'

interface ModalQuestionProps {
    title: string;
    question: string;
    dismiss: () => void;
    accept: () => void;
}

const ModalQuestion = ({question,title,  dismiss, accept}: ModalQuestionProps) => {

    return (
        <>
            <div className="overlay" />

            <div className="modal show wrap-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>
                            {title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{question}</p>
                    </Modal.Body>

                    <Modal.Footer onClick={dismiss}>
                        <Button variant="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={accept} variant="primary">
                            {title}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    )
}

export default ModalQuestion