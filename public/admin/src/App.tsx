import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login'
import ForgotPassword from './components/forgotPassword/ForgotPassword'
import Home from './components/home/Home'
// import Footer from './layouts/footer/Footer'

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
        path: '/home',
        element: <Home />
    }
])


function App() {
    return <RouterProvider router={router} />
}

export default App
