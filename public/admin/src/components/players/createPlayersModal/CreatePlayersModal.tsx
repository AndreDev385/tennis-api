import {
	faCircleNotch,
	faFileExcel,
	faPlus,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { VITE_SERVER_URL } from "../../../env/env.prod";
import "../Players.scss";
import * as XLSX from "xlsx";
import { fileSizeInKB } from "../../../utils/fileSizeInKb";

interface IProps {
	onClose: (value: boolean) => void;
	getPlayers: () => Promise<void>;
}

type Player = {
	firstName: string;
	lastName: string;
	ci: string;
	clubSymbol: string;
};

const fileTypes = ["XLSX", "XLS"];

const CreatePlayersModal = ({ onClose, getPlayers }: IProps) => {
	const token: string = localStorage.getItem("authorization") || "";

	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [data, setData] = useState<Player[]>([]);

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

				const formattedData = data.map((row: string[]) => {
					return {
						firstName: row[0],
						lastName: row[1],
						ci: row[2],
						clubSymbol: row[3],
					};
				});

				setData(formattedData.filter((item) => item) as Player[]);
			};
			reader.readAsBinaryString(newFile);

			setFile(newFile);
		}
	};

	const handleDeleteFile = () => {
		setFile(null);
		setData([]);
	};

	const handleSubmit = async () => {
		setLoading(true);
		const url = `${VITE_SERVER_URL}/api/v1/player/register-bulk`;
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(data),
		};

		try {
			const response = await fetch(url, requestOptions);
			const data = await response.json();

			if (response.status !== 201) {
				throw new Error(data?.message);
			}

			toast.success("Jugadores agregados correctamente");

			onClose(true);
			await getPlayers();
		} catch (error) {
			toast.error(
				`${
					(error as Error).message ??
					"Ha ocurrido un error al intentar agregar los jugadores"
				}`,
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="overlay" />

			<div className="modal show wrap-modal">
				<Modal.Dialog size="lg">
					<Modal.Header>
						<Modal.Title>Agregar jugadores</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<section className="create-players-section">
							<h2>Cargar jugadores</h2>
							{!file && (
								<div className="uploader">
									<FileUploader
										classes="drop_area drop_zone"
										handleChange={handleChange}
										name="file"
										fileTypes={fileTypes}
										label="Arrastra un archivo o haz click aquí para cargar jugadores. Recuerda que el archivo debe ser .xlsx o .xls"
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
									<Button className="file-x" onMouseDown={handleDeleteFile}>
										<FontAwesomeIcon icon={faXmark} />
									</Button>
								</div>
							)}
							{data.length > 0 && (
								<div
									style={{
										overflowY: "auto",
										maxHeight: "300px",
									}}
								>
									<Table
										responsive="sm"
										style={{
											marginTop: "30px",
										}}
									>
										<thead>
											<tr>
												<th className="text-center">Nombre</th>
												<th className="text-center">Apellido</th>
												<th className="text-center">Email</th>
												<th className="text-center">Club</th>
											</tr>
										</thead>
										<tbody>
											{data.map((player, index) => (
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												<tr key={index}>
													<td className="text-center">{player.firstName}</td>
													<td className="text-center">{player.lastName}</td>
													<td className="text-center">{player.ci}</td>
													<td className="text-center">{player.clubSymbol}</td>
												</tr>
											))}
										</tbody>
									</Table>
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
							onClick={() => onClose(false)}
							disabled={loading}
						>
							Cancelar
						</Button>
						<Button variant="primary" disabled={loading} onClick={handleSubmit}>
							{loading ? (
								<FontAwesomeIcon icon={faCircleNotch} spin />
							) : (
								<span>
									<FontAwesomeIcon className="me-2" icon={faPlus} />
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
