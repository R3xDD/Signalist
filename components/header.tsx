import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import NavItems from './nav-items';
import UserDropDownMenu from './user-dropdow-menu';
const Header = () => {
  return (
    <header className='sticky top-0 header'>
        <div className='container header-wrapper'>
            <Link href="/">
                <Image src="/assets/icons/logo.svg" alt='Signalist logo' height={32} width={140} className='h-8 w-auto cursor-pointer' />
            </Link>
            <nav className='hidden sm:block'>
                <NavItems />
            </nav>
            <UserDropDownMenu   />
        </div>
    </header>
  )
}

export default Header ;
