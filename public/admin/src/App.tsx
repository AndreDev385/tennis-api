import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login'
import ForgotPassword from './components/forgotPassword/ForgotPassword'
import Menu from './layouts/menu/Menu'
import Clubs from './components/clubs/Clubs'
import Seasons from './components/seasons/Seasons'
import News from './components/news/News'
import Ads from './components/ads/Ads'
import Trackers from './components/trackers/Trackers'
import Admins from './components/admins/Admins'
import DeleteAccount from './components/deleteAccount/DeleteAccount'
import Teams from './components/teams/Teams'
import Results from './components/results/Results'
import Players from './components/players/Players'
import Ranking from './components/ranking/Ranking'
import Stats from './components/teams/stats/Stats'
import PlayerStats from './components/players/playerStats/PlayerStats'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Games from './components/results/games/Games'
import GameStats from './components/results/stats/GameStats'
import { Notifications } from './components/notifications/Notifications'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/delete/account',
        element: <DeleteAccount />
    },
    {
        path: '/forgot/password',
        element: <ForgotPassword />
    },
    {
        element: <Menu />,
        children: [
            {
                path: "/clubs",
                element: <Clubs />
            },
            {
                path: "/seasons",
                element: <Seasons />
            },
            {
                path: "/news",
                element: <News />
            },
            {
                path: "/ads",
                element: <Ads />
            },
            {
                path: "/trackers",
                element: <Trackers />
            },
            {
                path: "/teams",
                element: <Teams />
            },
            {
                path: "/results",
                element: <Results />
            },
            {
                path: "/players",
                element: <Players />
            },
            {
                path: "/admins",
                element: <Admins />
            },
            {
                path: '/ranking',
                element: <Ranking />
            },
            {
                path: '/notifications',
                element: <Notifications />
            },
        ],
    },
    {
        path: '/teams/stats/:id',
        element: <Stats />
    },
    {
        path: '/players/:id',
        element: <PlayerStats />
    },
    {
        path: '/results/:id',
        element: <Games />
    },
    {
        path: '/results/:id/match/:matchId',
        element: <GameStats />
    }
])


function App() {
    return (
        <>
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
        </>
    )
}

export default App
