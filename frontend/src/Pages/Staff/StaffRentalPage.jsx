import { Toolbar } from '@mui/material'
import React from 'react'
import { useEffect,useState } from 'react'
import RequestCard from '../../Components/RequestCard'
import apiHost from '../../env'

export default function StaffRentalPage() {


  const [reqs, setReqs] = useState([])
  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(apiHost + 'staff/listPendingRequests',{
      credentials:'include',
      method: 'POST',
      headers: myHeaders})
      .then(res => {
        if(res.status == 200){
          return res
        }
      })
      .then(res => res.json())
      .then(res => {
        setReqs(res)
      })
  },[])
  return (
    <div>
        <Toolbar/>
        <div className="container">
            <h3 className="head">Requests </h3>
            {
              reqs.map((req,index) => {
                return  <RequestCard request={req} reqs={reqs} setReqs={setReqs} index={index}/>
              })
            }
           
            
        </div>
    </div>
  )
}
