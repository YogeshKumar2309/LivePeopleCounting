import Navbar from './Navbar'
import { House, User, } from 'lucide-react';
import { ShoppingBasket } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  const navList = [
    {
      id:1,
      name: 'home',
      link: '/',
      icon: <House />
    },
    {
      id:2,
      name: 'products',
      link: '/products',
      icon: <ShoppingBasket />
    },
  ]
  const userNavlist = [
    {
      id:1,
      name: 'cart',
      link: '/user/cart',
      icon: <ShoppingCart />
    },
    {
      id:2,
      name: 'profile',
      link: '/user/profile',
      icon: <User />
    },  
  ]
  return (
    <div className='h-16 border-b-2 border-blue-400 bg-blue-200'>
      <Navbar navList={navList} isAuthenticatedNavList={userNavlist}/>
    </div>
  )
}

export default Header