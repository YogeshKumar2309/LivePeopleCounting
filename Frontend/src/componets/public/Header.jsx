import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  const navList = [
    {
      id:1,
      name: 'home',
      link: '/'
    },
    {
      id:2,
      name: 'products',
      link: '/products'
    },
    {
      id:3,
      name: 'about',
      link: '/about'
    },
    {
      id:4,
      name: 'contact',
      link: '/contact'
    },
  ]
  return (
    <div className='h-14 border-b-2 border-blue-400 bg-blue-200'>
      <Navbar navList={navList}/>
    </div>
  )
}

export default Header