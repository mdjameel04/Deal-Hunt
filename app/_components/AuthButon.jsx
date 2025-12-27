"use client"
import { Button } from '@/components/ui/button'
import { LogIn, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { AuthModal } from './AuthModal'
import { SignOut } from '../action'
const AuthButon = ({user}) => {
    const [showAuthModal, setShowAuthModal] = useState(false);
if(user) {
    return (
        <form action={ SignOut}>
            <Button variant="ghost" size='sm' type="submit" className='gap-2'>
                <LogOut className='w-4 h-4'/>
                Sign Out
            </Button>
        </form>
    )
}

  return (
    <>
        <Button 
        onClick= {()=>setShowAuthModal(true)}
        variant='default'
        size="sm"
        className="bg-primary ">
    <LogIn className='w-4 h-4'/>
     sign In </Button>

     <AuthModal
     isopen={showAuthModal}
     onclose={()=>setShowAuthModal(false)}
     />
    </>
  )
}

export default AuthButon