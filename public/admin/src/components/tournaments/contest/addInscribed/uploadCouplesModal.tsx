import { faFileExcel, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";

import * as XLSX from "xlsx";
import type { AddCoupleDto } from "../../../../services/contest/addContestCouples";
import { fileSizeInKB } from "../../../../utils/fileSizeInKb";

const fileTypes = ["XLSX", "XLS"];

type Props = {
	onClose: () => void;
	addCouples: (data: AddCoupleDto[]) => void;
};

export const UploadCouplesModal: React.FC<Props> = ({
	onClose,
	addCouples,
}) => {
	const [file, setFile] = useState<File | null>(null);

	const [couples, setCouples] = useState<AddCoupleDto[]>([]);

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

				const formattedData: AddCoupleDto[] = data.map((row: string[]) => {
					return {
						position: row[0] ? Number(row[0].trim()) : null,
						p1: {
							firstName: row[1].trim(),
							lastName: row[2].trim(),
							ci: row[3].trim(),
						},
						p2: {
							firstName: row[4].trim(),
							lastName: row[5].trim(),
							ci: row[6].trim(),
						},
					};
				});

				setCouples(formattedData);
			};
			reader.readAsBinaryString(newFile);

			setFile(newFile);
		}
	};

	const handleSubmit = () => {
		addCouples(couples);
		onClose();
	};

	return (
		<>
			<div className="overlay" />

			<div className="modal show wrap-modal">
				<Modal.Dialog size="lg">
					<Modal.Header>
						<Modal.Title>Agregar parejas</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<section className="create-players-section">
							<h2>Cargar parejas</h2>
							{!file && (
								<div className="uploader">
									<FileUploader
										classes="drop_area drop_zone"
										handleChange={handleChange}
										name="file"
										fileTypes={fileTypes}
										label="Arrastra un archivo o haz click aquí para cargar parejas. Recuerda que el archivo debe ser .xlsx o .xls"
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
						<Button variant="secondary" onClick={() => onClose()}>
							Cancelar
						</Button>
						<Button variant="primary" onClick={handleSubmit}>
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
