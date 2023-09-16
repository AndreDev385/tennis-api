import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login'
import ForgotPassword from './components/forgotPassword/ForgotPassword'
import Menu from './layouts/menu/Menu'
import Clubs from './components/clubs/Clubs'
import Seasons from './components/seasons/Seasons'
import News from './components/news/News'
import Ads from './components/ads/Ads'
import Trackers from './components/trackers/Trackers'
import Stats from './components/stats/Stats'
import Admins from './components/admins/Admins'
import DeleteAccount from './components/deleteAccount/DeleteAccount'
import { ToastContainer } from 'react-toastify'

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
