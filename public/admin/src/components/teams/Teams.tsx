import {
	faChartBar,
	faCircleNotch,
	faSearch,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { ICategory, IClub, ITeam } from "../../types/interfaces";
import { useNavigate } from "react-router";
import "./Teams.scss";
import { VITE_SERVER_URL } from "../../env/env.prod";

const Teams = () => {
	const [teams, setTeams] = useState<ITeam[]>([]);
	const [filteredTeams, setFilteredTeams] = useState<ITeam[]>([]);
	const [clubs, setClubs] = useState<IClub[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedClub, setSelectedClub] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const token: string = localStorage.getItem("authorization") || "";
	const navigate = useNavigate();

	useEffect(() => {
		getTeams();
		getClubs();
		getCategories();
	}, []);

	const getTeams = async () => {
		setLoading(true);
		const url = `${VITE_SERVER_URL}/api/v1/team`;
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};

		try {
			const response = await fetch(url, requestOptions);

			const data = await response.json();

			if (response.status === 200) {
				setTeams(data);
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const getCategories = async () => {
		const url = `${VITE_SERVER_URL}/api/v1/categories`;
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};

		try {
			const response = await fetch(url, requestOptions);
			const data = await response.json();
			if (response.status === 200) {
				setCategories(data);
			}
		} catch (error) {}
	};

	const getClubs = async () => {
		const url = `${VITE_SERVER_URL}/api/v1/club`;
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};

		try {
			const response = await fetch(url, requestOptions);

			const data = await response.json();

			if (response.status === 200) {
				setClubs(data);
			}
		} catch (error) {}
	};

	// filter
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (selectedClub && selectedCategory) {
				setFilteredTeams(
					teams.filter(
						(item) =>
							item.name.toUpperCase().includes(search.toUpperCase()) &&
							item.club.clubId === selectedClub &&
							item.category.categoryId === selectedCategory,
					),
				);
			} else if (selectedClub && !selectedCategory) {
				setFilteredTeams(
					teams.filter(
						(item) =>
							item.name.toUpperCase().includes(search.toUpperCase()) &&
							item.club.clubId === selectedClub,
					),
				);
			} else if (!selectedClub && selectedCategory) {
				setFilteredTeams(
					teams.filter(
						(item) =>
							item.name.toUpperCase().includes(search.toUpperCase()) &&
							item.category.categoryId === selectedCategory,
					),
				);
			} else {
				setFilteredTeams(
					teams.filter((item) =>
						item.name.toUpperCase().includes(search.toUpperCase()),
					),
				);
			}
			setLoading(false);
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
	}, [search, selectedCategory, selectedClub, teams]);

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	const onChangeClub = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		setSelectedClub(e.target.value);
	};

	const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		setSelectedCategory(e.target.value);
	};

	const onReset = () => {
		setSelectedCategory("");
		setSelectedClub("");
		setSearch("");
	};

	const goToStats = (id: string) => {
		navigate(`stats/${id}`);
	};

	const teamsTable = filteredTeams.map((item) => {
		return (
			<tr key={item.teamId}>
				<td className="text-center">{item.name}</td>
				<td className="text-center">{item.club.symbol}</td>
				<td className="text-center">{item.category.name}</td>
				<td className="text-center">
					<Button variant="primary" onClick={() => goToStats(item.teamId)}>
						<FontAwesomeIcon icon={faChartBar} />
						Estadísticas
					</Button>
				</td>
			</tr>
		);
	});

	return (
		<>
			<div className="teams-container">
				<div>
					<h1>
						<FontAwesomeIcon icon={faUsers} />
						Equipos
					</h1>
				</div>

				<div className="filter-container">
					<InputGroup className="search">
						<InputGroup.Text id="searchBar">
							<FontAwesomeIcon icon={faSearch} />
						</InputGroup.Text>
						<Form.Control
							placeholder="Buscar por nombre..."
							aria-label="search"
							aria-describedby="searchBar"
							className="input-search"
							value={search}
							onChange={onChangeSearch}
						/>
					</InputGroup>

					<Form.Select
						onChange={onChangeClub}
						value={selectedClub}
						aria-label="Filtrar por clubes"
					>
						<option value="" disabled>
							Filtrar por clubes
						</option>
						{clubs.map((item) => {
							return (
								<option key={item.clubId} value={item.clubId}>
									{item.symbol}
								</option>
							);
						})}
					</Form.Select>

					<Form.Select
						onChange={onChangeCategory}
						value={selectedCategory}
						aria-label="Filtrar por categoría"
					>
						<option value="" disabled>
							Filtrar por categoría
						</option>
						{categories.map((item) => {
							return (
								<option key={item.categoryId} value={item.categoryId}>
									{item.name}
								</option>
							);
						})}
					</Form.Select>

					<Button onClick={onReset} variant="secondary">
						Limpiar filtro
					</Button>
				</div>

				<Card>
					<Table responsive="sm">
						<thead>
							<tr>
								<th className="text-center">Nombre</th>
								<th className="text-center">Club</th>
								<th className="text-center">Categoría</th>
								<th className="text-center">Ver estadísticas</th>
							</tr>
						</thead>

						<tbody>
							{filteredTeams && teamsTable}
							{loading && (
								<tr className="text-center mt-3">
									<td>
										<FontAwesomeIcon
											className="center mt-5"
											icon={faCircleNotch}
											spin
										/>
									</td>
								</tr>
							)}
							{filteredTeams.length === 0 && !loading && (
								<tr className="text-center mt-3">
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

export default Teams;
