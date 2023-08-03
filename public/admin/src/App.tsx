import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login'
// import Footer from './layouts/footer/Footer'

const router = createBrowserRouter([
    {
        path: '/',
        // element: <Footer />,
        children: [
            {
                path: '/',
                element: <Login />
            }
        ]
    }
])


function App() {
    return <RouterProvider router={router} />
}

export default App
