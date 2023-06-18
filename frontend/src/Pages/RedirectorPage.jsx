import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function RedirectorPage({pathname,user}) {
    const navigation = useNavigate()
    console.log(pathname, user)


    useEffect(()=>{
        if(pathname == '/'){
            if(user){
                console.log({user})
                switch(user.role){
                    case 'user':
                        navigation('/userLandingPage');break;
                    case 'staff':
                        navigation('/staffDashboard');break;
                    case 'admin':
                        navigation('/adminUserControl');break;
                    default:
                        navigation('/userLnadingPage')
                }
            }else{
                navigation('/login')
            }
        }
    },[])
  return (
    <div>
         <Toolbar/>
         Hello redirecting

         {pathname} {user?user.role:'none'}
          {console.log({pathname,user})}
          {pathname == '/' && user == null ? navigation('/userLandingPage'):navigation('/userLandingPage')}
          {pathname == '/' && user?.role == 'user'? console.log('/userLandingPage'):console.log('null user exists')}

    </div>
  )
}
