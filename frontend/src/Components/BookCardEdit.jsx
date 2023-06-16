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
import AddCircleIcon from '@mui/icons-material/AddCircle';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './bookCard.css'
import apiHost from "../env";
import { useToaster,Notification } from "rsuite";
export default function BookCardEdit({book,setBooks, books,index}) {
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

  //delete confirm modal
  const [openD, setOpenD] = React.useState(false)
  const handleOpenD = () => {
    setOpenD(true);
  };
  const handleCloseD = () => {
    setOpenD(false)
  }

  const [imageFile, setImageFile] = useState(null)

  const [saveErr, setSaveErr] = useState(null)

  const [eamt, seteamt] = useState(book.amountRate)
  const [eauthor, seteauthor] = useState(book.author)
  const [ecat, setecat] = useState(book.category)
  const [epub, setepub] = useState(book.publisher)
  const [etitle, setetitle] = useState(book.title)
  const [eyop, seteyop] = useState(book.yearOfPublishing)
  
  const EditBook = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'staff/editbooks',{
        credentials:'include',
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          book_id: book._id,
          editObj: {
            amountRate:Number(eamt),
            author:eauthor,
            category:ecat,
            image:"/book.jpg",
            publisher:epub,
            title:etitle,
            yearOfPublishing:Number(eyop)
          }
        })
    })
    .then(res => {
      if(res.status ==200){
        return res
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log({res})
      let tempBooks = books
      tempBooks[index] = res
      setBooks([...tempBooks])
      toaster.push(<Notification type={'success'} header={'success'} closable>
      Book edited successfully
      </Notification>, {placement:'bottomEnd'})
      handleClose()
      
    })
    .catch(err => setSaveErr("Not able to save!"))
  }

  const [delErr, setDelErr] = useState(null)
  const DeleteBook = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'staff/deletebooks',{
        credentials:'include',
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          book_id: book._id})})
        .then(res => {
          if(res.status == 200) {
            let tempBooks = books
            console.log({tempBooks})
            tempBooks.splice(index,1)
            console.log({tempBooks})

            setBooks([...tempBooks])
            toaster.push(<Notification type={'success'} header={'success'} closable>
            Book deleted successfully
          </Notification>, {placement:'bottomEnd'})
          handleCloseD()
          }
        })
  }
  return (
    <>
    <div className="book unread">
      <div className="cover">
          <div className="icons m-1" style={{position:'absolute'}}>
            <div className="edit btn me-2" style={{backgroundColor: 'white'}} onClick={()=>{handleClickOpen()}}>
              <BorderColorRoundedIcon/>
            </div>
            <div className="edit btn" style={{backgroundColor: 'white'}} onClick={()=> {handleOpenD()}}>
              <DeleteOutlineRoundedIcon/>
            </div>
          </div>
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
      {/* <div className="details">
        <p>publisher: string
    category: string
    yearOfPublishing: Int32  //number
    uploader: String  // users_id
    amountRate: Int32 // number</p>
  </div> */}
    </div>
     {/* modal to edit books */}
     <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Edit Book"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
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
          <Button  onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={()=>{EditBook()}} >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* modal to delete confirm */}
      <Dialog
        fullScreen={fullScreen}
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm delete book"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              {delErr && <p className="alert alert-danger">{delErr}</p>}

          </DialogContentText>
          <div className="form">
           
            
      <p className="content">Are you sure to delete this book? once confirmed it will be deleted from the Library</p>
           
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseD}>
            Cancel
          </Button>
          <Button onClick={()=>{
            DeleteBook()
          }} >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  </>
  );
}
