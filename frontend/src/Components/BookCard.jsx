import React,{useState} from "react";
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
import './bookCard.css'
import { useNavigate } from "react-router-dom";
import {useToaster,Notification } from 'rsuite'

import ButtonGroup from "@mui/material/ButtonGroup";
import apiHost from "../env";
export default function BookCard({book,user}) {
  const toaster = useToaster()
  const navigation = useNavigate()
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [counter, setCounter] = useState(1)
  const handleIncrement = () =>{
    if(counter < 30){

      setCounter(counter + 1)
    }
  }
  const handleDecrement = () =>{
    if(counter>1){

      setCounter(counter - 1)
    }
  }

  const PlaceOrder = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'user/createRental',{
      credentials:'include',
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({
        book_id:book._id,
        noOfDaysToRent: counter
      })
    }).then(res => {
      if(res.status == 200){
        //success
        setOpen(false)
        toaster.push(<Notification type={'success'} header={'success'} closable>
          Order to rent placed successfully
        </Notification>, {placement:'bottomEnd'})
      }
    })
  }
  return (
    <>
    <div className="book unread" onClick={handleClickOpen}>
      <div className="cover">
      {
            book.image?<img src={apiHost +'uploads/' + book.image} /> : <img src='./assets/bookPlaceholder.png'/>
          }
      </div>
      <div className="description">
        <p className="title">
         {book.title}
          <br />
          <span className="author">{book.author}</span>
        </p>
      </div>
    </div>
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"More Info"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            
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

            {/* {imageFile?<img src={ URL.createObjectURL(imageFile)} width='177px'/>:<img src='./assets/bookPlaceholder.png'/>} */}
            {/* <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={(e)=> setImageFile(e.target.files[0])}/>
                <PhotoCamera />
            </IconButton> */}
            </div>
           <TextField id="filled-basic" label="Book title" variant="filled" className='m-3' defaultValue={book.title} InputProps={{
            readOnly: true,
          }} /> 
           <TextField id="filled-basic" label="Book author" variant="filled"  className='m-3' value={book.author} InputProps={{
            readOnly: true,
          }}/> 
           <TextField id="filled-basic" label="Book publisher" variant="filled"  className='m-3' value={book.publisher} InputProps={{
            readOnly: true,
          }}/> 
           <TextField id="filled-basic" label="Book category" variant="filled"  className='m-3' value={book.category} InputProps={{
            readOnly: true,
          }}/> 
           <TextField id="filled-basic" label="Year of Publishing" variant="filled"  className='m-3' value={book.yearOfPublishing} InputProps={{
            readOnly: true,
          }}/> 
           <TextField id="filled-basic" label="Rate to rent per day" variant="filled"  className='m-3' value={book.amountRate} InputProps={{
            readOnly: true,
          }}/> 

          {user? <div className="userBooking container">

            <p>Number of Days to rent:</p>

          <ButtonGroup size="small" aria-label="small outlined button group">
        {<Button onClick={handleDecrement}>-</Button>}
        {<Button disabled>{counter}</Button>}
        <Button onClick={handleIncrement}>+</Button>
      </ButtonGroup>
      <div className="btn">

      <button className="btn btn-dark" onClick={PlaceOrder}>Place order</button>
      </div>
          </div>:<button className="btn btn-dark" onClick={()=>{navigation('/login')}}>Login</button>}
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose} >
            Confirm
          </Button> */}
        </DialogActions>
      </Dialog>
  </>
  );
}
