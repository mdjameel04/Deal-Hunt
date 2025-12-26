import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-whtie/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-1'>
    <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center '>
  <div className='flex items-center gap-3'> 
  <Image src={"/deal-drop-logo.png"} alt='logo' 
   width={600}
   height={200} 
   className='h-10 w-auto '/>
  </div>
  <Button className="bg-primary ">
    <LogIn className='w-4 h-4'/>
     sign In </Button>
    </div>
    </header>
  )
}

export default Header