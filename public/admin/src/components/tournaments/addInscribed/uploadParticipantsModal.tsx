import { faFileExcel, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";

import * as XLSX from "xlsx";
import type { AddParticipantData } from "../../../services/contest/addContestParticipants";
import { fileSizeInKB } from "../../../utils/fileSizeInKb";

const fileTypes = ["XLSX", "XLS"];

type Props = {
	onClose: () => void;
	addParticipants: (data: AddParticipantData[]) => void;
};

export const UploadParticipantsModal: React.FC<Props> = ({
	onClose,
	addParticipants,
}) => {
	const [file, setFile] = useState<File | null>(null);

	const [participants, setParticipants] = useState<AddParticipantData[]>([]);

	const handleChange = (file: File | null) => {
		if (file) {
			const newFile = file;
			const reader = new FileReader();

			reader.onload = (e) => {
				const bstr = e.target?.result;
				const wb = XLSX.read(bstr, { type: "binary" });
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				const data = XLSX.utils.sheet_to_json<string[]>(ws, {
					header: 1,
					range: 1,
					blankrows: false,
				});

				const formattedData: AddParticipantData[] = data.map(
					(row: string[]) => {
						return {
							position: row[0] ? Number(row[0]) : null,
							firstName: row[1].trim(),
							lastName: row[2].trim(),
							ci: row[3].trim(),
						};
					},
				);

				setParticipants(formattedData);
			};
			reader.readAsBinaryString(newFile);

			setFile(newFile);
		}
	};

	const handleSubmit = () => {
		addParticipants(participants);
		onClose();
	};

	return (
		<>
			<div className="overlay" />

			<div className="modal show wrap-modal">
				<Modal.Dialog size="lg">
					<Modal.Header>
						<Modal.Title>Agregar participantes</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<section className="create-players-section">
							<h2>Cargar participantes</h2>
							{!file && (
								<div className="uploader">
									<FileUploader
										classes="drop_area drop_zone"
										handleChange={handleChange}
										name="file"
										fileTypes={fileTypes}
										label="Arrastra un archivo o haz click aquí para cargar participantes. Recuerda que el archivo debe ser .xlsx o .xls"
										multiple={false}
										disabled={!!file}
									/>
								</div>
							)}
							{file && (
								<div className="file">
									<div className="file-wrapper">
										<div className="excel-icons">
											<FontAwesomeIcon
												icon={faFileExcel}
												size="2x"
												color="#1D6F42"
											/>
										</div>
										<div className="file-info">
											<p>{file.name}</p>
											<p>{fileSizeInKB(file.size)}</p>
										</div>
									</div>
								</div>
							)}
						</section>
					</Modal.Body>

					<Modal.Footer
						style={{
							justifyContent: "center",
						}}
					>
						<Button
							variant="secondary"
							onClick={() => onClose()}
							//disabled={state.loading}
						>
							Cancelar
						</Button>
						<Button
							variant="primary"
							//disabled={state.loading}
							onClick={handleSubmit}
						>
							<span>
								<FontAwesomeIcon className="me-2" icon={faPlus} />
								Agregar
							</span>
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
		</>
	);
};
