import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/login/Login";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import Clubs from "./components/clubs/Clubs";
import Seasons from "./components/seasons/Seasons";
import News from "./components/news/News";
import Ads from "./components/ads/Ads";
import Trackers from "./components/trackers/Trackers";
import Admins from "./components/admins/Admins";
import DeleteAccount from "./components/deleteAccount/DeleteAccount";
import Teams from "./components/teams/Teams";
import Results from "./components/results/Results";
import Players from "./components/players/Players";
import Ranking from "./components/ranking/Ranking";
import Stats from "./components/teams/stats/Stats";
import PlayerStats from "./components/players/playerStats/PlayerStats";
import Games from "./components/results/games/Games";
import GameStats from "./components/results/stats/GameStats";
import { Notifications } from "./components/notifications/Notifications";
import { NavbarLayout } from "./layouts/navbar/Navbar";
import { HomeSideBar } from "./layouts/sideBars/homeSideBar";
import { UsersTablePage } from "./components/users";
import { LeagueSideBar } from "./layouts/sideBars/leagueSideBar";
import { TournamentsSideBar } from "./layouts/sideBars/tournamentSideBar";
import { TournamentsPage } from "./components/tournaments";
import { TournamentDetail } from "./components/tournaments/detail";
import { CreateTournamentForm } from "./components/tournaments/createTournament";
import { MantineProvider } from "@mantine/core";
import { CreateContestForm } from "./components/tournaments/detail/createContest";
import { ContestDetail } from "./components/tournaments/contest";
import { AddInscribed } from "./components/tournaments/addInscribed";
import { MatchesPage } from "./components/match";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/delete/account",
		element: <DeleteAccount />,
	},
	{
		path: "/forgot/password",
		element: <ForgotPassword />,
	},
	{
		path: "dashboard",
		element: <NavbarLayout />, // <Menu />,
		children: [
			{
				path: "home",
				element: <HomeSideBar />,
				children: [
					{
						path: "trackers",
						element: <Trackers />,
					},
					{
						path: "admins",
						element: <Admins />,
					},
					{
						path: "users",
						element: <UsersTablePage />,
					},
				],
			},
			{
				path: "league",
				element: <LeagueSideBar />,
				children: [
					{
						path: "clubs",
						element: <Clubs />,
					},
					{
						path: "seasons",
						element: <Seasons />,
					},
					{
						path: "news",
						element: <News />,
					},
					{
						path: "ads",
						element: <Ads />,
					},
					{
						path: "teams",
						children: [
							{
								path: "",
								element: <Teams />,
							},
							{
								path: "stats/:id",
								element: <Stats />,
							},
						],
					},
					{
						path: "results",
						children: [
							{
								path: ":id",
								element: <Games />,
							},
							{
								path: "match/:matchId",
								element: <GameStats />,
							},
							{
								path: "",
								element: <Results />,
							},
						],
					},
					{
						path: "players",
						children: [
							{
								path: "",
								element: <Players />,
							},
							{
								path: ":id",
								element: <PlayerStats />,
							},
						],
					},
					{
						path: "notifications",
						element: <Notifications />,
					},
					{
						path: "ranking",
						element: <Ranking />,
					},
				],
			},
			{
				path: "tournaments",
				element: <TournamentsSideBar />,
				children: [
					{
						path: "",
						element: <TournamentsPage />,
					},
					{
						path: "create",
						element: <CreateTournamentForm />,
					},
					{
						path: "contest/create",
						element: <CreateContestForm />,
					},
					{
						path: "contest/inscribe/:contestId",
						element: <AddInscribed />,
					},
					{
						path: "contest/:contestId",
						element: <ContestDetail />,
					},
					{
						path: ":tournamentId",
						element: <TournamentDetail />,
					},
					{
						path: "matches",
						children: [
							{
								path: "",
								element: <MatchesPage />,
							},
						],
					},
				],
			},
		],
	},
]);

function App() {
	return (
		<MantineProvider>
			<RouterProvider router={router} />

			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</MantineProvider>
	);
}

export default App;
