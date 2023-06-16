import React from 'react'
import apiHost from '../env'

export default function TestCookie() {


    const testApi = () =>{
        fetch(apiHost + 'cookieTest',{credentials:'include'})
        .then(res => console.log({res}))
        .catch(err => console.log(err))
    }
  return (
    <div>
        <button onClick={testApi}>Cookie test</button>
    </div>
  )
}
