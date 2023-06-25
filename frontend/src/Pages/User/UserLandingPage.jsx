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
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {Pagination} from '@mui/material';
import { useToaster,Notification } from 'rsuite';
import SplitButton from '../../Components/ButtonDropdow';

export default function UserLandingPage({user}) {
  const toaster = useToaster()
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const options = ['pending', 'forwarded', 'rejected','scheduled', 'all'];
  const [selectedIndex, setSelectedIndex] = React.useState(4);
  const handleClickOpen = () => {
    console.log('clicked')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [books, setBooks ] = useState([])
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState(50)
  const [total, setTotal] = useState(0)
  useEffect(()=>{
    getCandidates()
  },[])
  

  // resume: req.body.resume,  
	// name: req.body.name,
  //   uploadedBy: req.body.uploadedBy,
  //   dob: req.body.dob,
  //   email: req.body.email,
  //   status: req.body.status,
  //   pan: req.body.pan
  // const [fname, setFname] = useState('')
  // const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  // const [password, setPass] = useState('')
  const [resume, setResume] = useState('')
  const [name, setName] = useState('')
  // const [uploadedBy, setUploadedBy] = useState('')
  const [dob, setDob] = useState('')
  // const [status, setStatus] = useState('')
  const [pan, setPan] = useState('')

  const [adErr, setAdErr] = useState(null)
  function addCandidate() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'candidate/add',{
      credentials:'include',
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({
        name: name,
        dob: dob,
        email: email,
        // status: status,
        pan: pan,
        resume: resume,
      })
    })
      .then(async res => {
        // console.log({res})
        if(res.status == 200){
          return res.json()
        }
        else{
          let ress = await res.json()
          console.log({ress},'in else', ress.msg)
          setAdErr(ress.msg)
          throw new Error('Error')
        }
      })
      .then(res => {
        console.log({res})
        setName('')
        setDob('')
        setPan('')
        setResume('')
        setEmail('')
        handleClose()
        setBooks([res, ...books])
      })
      .catch(error => {
        console.log({error})
        // setAdErr(error.data)
      }
        )
    }
      




  function getCandidates(){

    // let config = {
    //   method: 'post',
    //   url: apiHost + 'candidate/list',
    //   data: {
    //     page: page,
    //     rows: rows,
    //     status: options[selectedIndex] == 'all' ? false: options[selectedIndex]
    //   },
    // };
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'candidate/list',{
      credentials:'include',
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({
        page: page,
        rows: rows,
        status: options[selectedIndex] == 'all' ? false: options[selectedIndex]
      })
    })
    .then(res => res.json())
    .then((response) => {
      console.log({response})
      setTotal(response.total);
      setBooks(response.candidateList);
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
      getCandidates()
    }else{

      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'candidate/search',{
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
      .then(response => {
        console.log({response})

        setTotal(response.total);
        setBooks(response.candidateList);
        setPage(1)
      })
      .catch(error => {setErr('Error fetching Candidates')})
    }
  }

  const pageChange = (event, value) => {
    console.log({value})
    setPage(value);
    // getCandidates()
  };
  useEffect(()=>{
    getCandidates()
  },[page])

  const [confirm, setConfirm] = useState(false)
  const [delId, setDelId] = useState(null)
  const deleteCandidate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'candidate/delete',{
      'credentials':'include',
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify({
        candidate_id:delId
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log({response})
        getCandidates()
        setConfirm(false)
        toaster.push(<Notification type={'success'} header={'candidate deleted'} closable></Notification>)
      })
      .catch(error => {setErr('Error deleting candidate')})
    }
  const opneConfirm = (id) => {
    console.log({id})
    setDelId(id)
    setConfirm(true)
  }
  const closeConfirm = () => {
    setConfirm(false)
    setDelId(null)
  }
  const confirmDelete = () => {
    deleteCandidate()
    closeConfirm()
  }

  useEffect(()=>{
    getCandidates()
  },[selectedIndex])
 

  return (
    <div>
       
        <Toolbar/>
        <div className="addNewBook m-3 d-flex justify-content-end align-items-center font-weight-bold" style={{fontWeight:'bold'}}>
            <div className="btn" onClick={()=> handleClickOpen()}>
                <span className="font-weight-bold">Add Candidate</span> <AddCircleIcon style={{fontSize:'38px'}}/>
            </div>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-8">
              <TextField
              placeholder='Search candidates'
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
            <div className="col-4">
              <SplitButton selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            </div>
          </div>
          
            </div>
        <div className="container ">
        <TableContainer component={Paper} >

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

              <TableCell>Name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>PAN</TableCell>
              <TableCell>status</TableCell>
              <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
          {books.map((candidate,index) => {
            return (<TableRow>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.pan}</TableCell>
              <TableCell>{candidate.status}</TableCell>
              <TableCell><button onClick={() => opneConfirm(candidate._id)}>Delete</button></TableCell>
              {/* <TableCell>{staff.status? <button onClick={()=>{DisableStaff(staff,index)}}>Disable!</button>:<button onClick={()=> {ActivateStaff(staff,index)}}>Activate!</button>}</TableCell> */}
            </TableRow>)
          })}
          </Table>
        </TableContainer>

{/* pagination controls */}
<div className="d-flex justify-content-center align-items-center mt-3">
  <Pagination count={Math.ceil(total/rows)} page={page} onChange={pageChange} variant="outlined" shape="rounded" />

</div>
        </div>

        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add new Staff"}
        </DialogTitle>
        <DialogContent>
        {adErr && <p className="alert alert-danger">{adErr}</p>}
          <DialogContentText>
            All fields are mandatory.
          </DialogContentText>
          <div className="form">
            {/* userName: String
                firstName: string 
                lastName: string
                password: string
                email: string  */}
            
{/*            
           <TextField id="filled-basic" label="First name" variant="filled"  className='m-3' value={fname} onChange={e => setFname(e.target.value)}/> 
           <TextField id="filled-basic" label="Last name" variant="filled"  className='m-3'value={lname} onChange={e => setLname(e.target.value)}/> 
           <TextField id="filled-basic" label="Password" variant="filled"  className='m-3'value={password} onChange={e => setPass(e.target.value)}/> 
          */}
          <TextField id="filled-basic" label="Name" variant="filled"  className='m-3' value={name} onChange={e => setName(e.target.value)}/>
          <TextField id="filled-basic" label="DOB" variant="filled"  className='m-3' value={dob} onChange={e => setDob(e.target.value)}/>
          <TextField id="filled-basic" label="Email" variant="filled"  className='m-3'value={email} onChange={e => setEmail(e.target.value)}/> 
          {/* <TextField id="filled-basic" label="Status" variant="filled"  className='m-3' value={status} onChange={e => setStatus(e.target.value)}/> */}
          <TextField id="filled-basic" label="Pan" variant="filled"  className='m-3' value={pan} onChange={e => setPan(e.target.value)}/>
          <TextField id="filled-basic" label="Resume" variant="filled"  className='m-3' value={resume} onChange={e => setResume(e.target.value)}/>

          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addCandidate} >
            Add Candidate!
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={confirm}
        onClose={closeConfirm}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
        {/* {adErr && <p className="alert alert-danger">{adErr}</p>} */}
          <DialogContentText>
            Are you sure to delete this candidate?
          </DialogContentText>
          <div className="form">
            {/* userName: String
                firstName: string 
                lastName: string
                password: string
                email: string  */}
            
{/*            
           <TextField id="filled-basic" label="First name" variant="filled"  className='m-3' value={fname} onChange={e => setFname(e.target.value)}/> 
           <TextField id="filled-basic" label="Last name" variant="filled"  className='m-3'value={lname} onChange={e => setLname(e.target.value)}/> 
           <TextField id="filled-basic" label="Password" variant="filled"  className='m-3'value={password} onChange={e => setPass(e.target.value)}/> 
          */}
         
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeConfirm}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} >
            Confirm Delete!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
