import { Outlet } from 'react-router'
import './Footer.scss'

const Footer = () => {
  return (
    <>
        <Outlet />
        <img className='footer' src='/src/assets/layouts/footer-layout.svg' />
    </>
  )
}

export default Footer