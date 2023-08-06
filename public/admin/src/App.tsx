import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login'
import ForgotPassword from './components/forgotPassword/ForgotPassword'
// import Footer from './layouts/footer/Footer'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/forgot/password',
        element: <ForgotPassword />
    }
])


function App() {
    return <RouterProvider router={router} />
}

export default App
