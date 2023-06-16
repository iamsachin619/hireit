import React from "react";
import './bookCardForReturns.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import moment from "moment";
import apiHost from "../env";
export default function BookCardForReturns({book, books , setBooks,index}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ReturnBook = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'user/returnBook',{
      credentials:'include',
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            rent_id: book.rental._id
    })})
    .then(res => {
      if(res.status == 200){
        return res
      }
    })
    .then(res => {
      let tempBooks = books
      tempBooks.splice(index, 1)
      setBooks([...tempBooks])
      handleClose()
    })
  }
  return (
    <>
    <div className="bookR unread">
      <div className="coverR">
        <img src="http://www.publishersweekly.com/images/data/ARTICLE_PHOTO/photo/000/028/28129-1.JPG" />
      </div>
      <div className="description">
        <p className="title">
          {book.title}
          <br />
          <span className="author">{book.author}</span>
        </p>
      </div>
      <div className="data">
        <p className="dueDate mb-1">Due date:{moment(book.rental.dueDate).format('L')}</p>
        <button className="btn btn-dark w-100" onClick={()=>setOpen(true)}>Return Book</button>
      </div>
    </div>
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you confirm to return the book it no longer will show up here in My Books section.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={ReturnBook} >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
