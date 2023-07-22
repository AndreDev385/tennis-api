import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Hello World</h1>
    },
    {
        path: "/dashboard",
        element: <h1>DashBoard</h1>
    },
])


function App() {
    return <RouterProvider router={router} />
}

export default App
