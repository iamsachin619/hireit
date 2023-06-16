import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import BookCardEdit from '../../Components/BookCardEdit';
import apiHost from '../../env';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@rsuite/icons/Close';
import InputAdornment from '@mui/material/InputAdornment';
import { useToaster,Notification } from 'rsuite';
export default function StaffDashboard() {
    const toaster = useToaster()
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };




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



    //add book states
    const [eamt, seteamt] = useState('')
    const [eauthor, seteauthor] = useState('')
    const [ecat, setecat] = useState('')
    const [epub, setepub] = useState('')
    const [etitle, setetitle] = useState('')
    const [eyop, seteyop] = useState('')


  const [saveErr, setSaveErr] = useState(null)
  const [imageFile, setImageFile] = useState(null)

    const AddBook = () =>{
      
      
      if(epub == '' || ecat == '' ||eyop == '' ||eauthor== '' ||eamt== '' ||etitle== '' ){
        setSaveErr('Not all feilds are added')
        return
      }
      var myHeaders = new Headers();
    

      let body ={
        image: "/book.jpg",
        amountRate:Number(eamt),
        author:eauthor,
        category:ecat,
        image:"/book.jpg",
        publisher:epub,
        title:etitle,
        yearOfPublishing:Number(eyop)
    }

    var formdata = new FormData();
    formdata.append("title", etitle);
    formdata.append("author", eauthor);
    formdata.append("publisher", epub);
    formdata.append("category",ecat);
    formdata.append("yearOfPublishing", eyop);
    formdata.append("amountRate", eamt);
    if(imageFile){
      formdata.append('imgFile', imageFile)
    }

      fetch(apiHost + 'staff/addbooks',{
          credentials:'include',
          method: 'POST',
          headers: myHeaders,
          body: formdata
      })
      .then(res => {
        console.log(res.status)
        if(res.status == 200){
          return res
        }
      }).then(res => res.json())
      .then(res => {
        let tempBooks = books
        tempBooks.push(res)
        setBooks([...tempBooks])
        toaster.push(<Notification type={'success'} header={'success'} closable>
        Book added successfully
      </Notification>, {placement:'bottomEnd'})
      handleClose()
      })
      .catch(err => setSaveErr('Something is worng, not added'))
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
        .catch(error => {setErr('Error fetching Users')})
      }
    }
  return (
    <>
    <div>
        <Toolbar/>
        <div className=" addNewBook m-3 d-flex justify-content-end  align-items-center font-weight-bold">
           <div className="btn"  style={{fontWeight:'bold'}} onClick={()=> handleClickOpen()}>

            Add new book <AddCircleIcon style={{fontSize:'38px'}}/>
           </div>
        </div>
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
    <div className="container">
    {
      books.map((book,index) =>{
        return <BookCardEdit book={book} setBooks={setBooks} books={books} index={index}/>
      })
    }
        
  
    </div>
    </div>
   
    {/* modal to add books */}
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add a new Book"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            All fields are mandatory.
            {saveErr && <p className="alert alert-danger">{saveErr}</p>}

          </DialogContentText>
          <div className="form">
            {/* image: string   (multer npm lib for uploading imgs to backend)
    title: string 
    author: string
    publisher: string
    category: string
    yearOfPublishing: Int32  //number
    uploader: String  // users_id
    amountRate: */}
            <div className="container d-flex justify-content-center align-items-start">

            {imageFile?<img src={ URL.createObjectURL(imageFile)} width='177px'/>:<img src='./assets/bookPlaceholder.png'/>}
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={(e)=> setImageFile(e.target.files[0])}/>
                <PhotoCamera />
            </IconButton>
            </div>
            <TextField id="filled-basic" label="Book title" variant="filled" className='m-3' value={etitle} onChange={e => setetitle(e.target.value)}/> 
           <TextField id="filled-basic" label="Book author" variant="filled"  className='m-3' value={eauthor} onChange={e => seteauthor(e.target.value)}/> 
           <TextField id="filled-basic" label="Book publisher" variant="filled"  className='m-3' value={epub} onChange={e => setepub(e.target.value)}/> 
           <TextField id="filled-basic" label="Book category" variant="filled"  className='m-3' value={ecat} onChange={e => setecat(e.target.value)}/> 
           <TextField id="filled-basic" label="Year of Publishing" variant="filled"  className='m-3' value={eyop} onChange={e => seteyop(e.target.value)}/> 
           <TextField id="filled-basic" label="Rate to rent per day" variant="filled"  className='m-3' value={eamt} onChange={e => seteamt(e.target.value)}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={()=>{
            AddBook()
          }} autoFocus>
            Add Book!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
