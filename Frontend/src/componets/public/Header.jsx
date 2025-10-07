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
  ]
  return (
    <div className='h-16 border-b-2 border-blue-400 bg-blue-200'>
      <Navbar navList={navList}/>
    </div>
  )
}

export default Header