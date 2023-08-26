import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login'
import ForgotPassword from './components/forgotPassword/ForgotPassword'
import Menu from './layouts/menu/Menu'
import Clubs from './components/clubs/Clubs'
import Seasons from './components/seasons/Seasons'
import News from './components/news/News'
import Ads from './components/ads/Ads'
import Measurers from './components/measurers/Measurers'
import Stats from './components/stats/Stats'
import Admins from './components/admins/Admins'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
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
                path: "/measurers",
                element: <Measurers />
            },
            {
                path: "/stats",
                element: <Stats />
            },
            {
                path: "/admins",
                element: <Admins />
            }
        ]
    }
])


function App() {
    return <RouterProvider router={router} />
}

export default App
