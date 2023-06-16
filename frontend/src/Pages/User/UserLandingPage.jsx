import React, { useEffect, useState } from 'react'
import BookCard from '../../Components/BookCard'
import NavBar from '../../Components/NavBar'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@rsuite/icons/Close';
import InputAdornment from '@mui/material/InputAdornment';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import apiHost from '../../env';
export default function UserLandingPage({user}) {

  const [books, setBooks ] = useState([])
  useEffect(()=>{
    getBooks()
  },[])
  
  function getBooks(){
    let config = {
      method: 'get',
      url: apiHost + 'book/listofbooks',
      
    };
    
    axios(config)
    .then((response) => {
      setBooks(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const [err, setErr] = useState(null)
  const [search, setSearch] = useState('')
  useEffect(()=>{
    searchObj()
  },[search])
  const searchObj = () =>{
    if(search == ''){
      getBooks()
    }else{

      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'book/searchbooks',{
      credentials:'include',
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({
        search:search
      })
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
    }
  }
  return (
    <div>
       
        <Toolbar/>

        <div className="container mt-3">
          <TextField
              placeholder='Search books'
              fullWidth
              variant="standard"
              value={search}
              onChange={(e)=> {setSearch(e.target.value)}}
              InputProps={{
                endAdornment:   search==''?
                <InputAdornment position="end">
                  <SearchIcon/>
                </InputAdornment>:<InputAdornment position="end"><CloseIcon style={{cursor:'pointer'}} onClick={()=>{setSearch('')}}/></InputAdornment>
              }}
            />
            </div>
        <div className="container ">
           {books.map((book)=>{
            return <BookCard book={book} user={user}/>
           })}
        </div>
    </div>
  )
}
