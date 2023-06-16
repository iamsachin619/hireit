import React, { useState, useEffect } from 'react'
import Toolbar from '@mui/material/Toolbar';
import BookCardForReturns from '../../Components/BookCardForReturns';
import apiHost from '../../env';

export default function UserBooks() {

  const [err ,setErr] = useState(null)
  const [books, setBooks] = useState([])
  useEffect(() => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'user/usermybooks',{
      credentials:'include',
      method: 'POST',
      headers: myHeaders
    })
      .then(res => {
        console.log({res})
        if(res.status == 200){
          return res
        }
      })
      .then(res => res.json())
      .then(res => {
        setBooks(res)
      })
      .catch(error => {setErr('Error fetching Books')})
  }, [])
  

  return (
    <div>
        <Toolbar/>
        <div className="container">
            {
              books.map((book,index) =>{
                return  <BookCardForReturns book={book} books={books} setBooks={setBooks} index={index}/>
              })
            }
           
          

        </div>
    </div>
  )
}
