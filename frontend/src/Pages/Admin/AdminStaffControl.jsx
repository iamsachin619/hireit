import React, { useState, useEffect } from 'react'
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import BookCardEdit from '../../Components/BookCardEdit';
import apiHost from '../../env';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@rsuite/icons/Close';
import InputAdornment from '@mui/material/InputAdornment';
export default function AdminStaffControl() {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [err, setErr] = useState(null)
    const [staffs, setStaffs] = useState([])
    useEffect(() => {
      FetchList()
      
    }, [])
    const FetchList = () =>{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch(apiHost + 'admin/getStaffList',{
        credentials:'include',
        method: 'GET',
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
          setStaffs(res)
        })
        .catch(error => {setErr('Error fetching Staffs')})
    }

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [adErr, setAdErr] = useState(null)
    const AddStaff =() => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch(apiHost + 'admin/staffregister',{
        credentials:'include',
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify({
          "firstName": fname,
          "lastName": lname,
          "email":email,
          "password": password
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
          setStaffs([...staffs, res])
          setAdErr(null)
          handleClose()
          setEmail('')
          setLname('')
          setFname('')
          setPass('')
        })
        .catch(error => {setAdErr('Error Adding Staffs')})
    }

    const DisableStaff = (staff, index) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch(apiHost + 'admin/disableuser',{
        credentials:'include',
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify({
          email: staff.email
        })
      })
        .then(res => {
          console.log({res})
          if(res.status == 200){
            return res
          }
        })
        .then(res => {
          let tempStaffs = staffs
          tempStaffs[index].status = false

          setStaffs([...tempStaffs])
          setErr(null)
        })
        .catch(error => {setErr('Error Disabling Staff')})
    }

    const ActivateStaff = (staff, index) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch(apiHost + 'admin/enableuser',{
        credentials:'include',
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify({
          email: staff.email
        })
      })
        .then(res => {
          console.log({res})
          if(res.status == 200){
            return res
          }
        })
        .then(res => {
          let tempStaffs = staffs
          tempStaffs[index].status = true

          setStaffs([...tempStaffs])
          setErr(null)
        })
        .catch(error => {setErr('Error Disabling Staff')})
    }


    const [search, setSearch] = useState('')
    useEffect(()=>{
      searchObj()
    },[search])
    const searchObj = () =>{
      if(search == ''){
        FetchList()
      }else{

        var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch(apiHost + 'admin/searchStaff',{
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
          setStaffs(res)
        })
        .catch(error => {setErr('Error fetching Staffs')})
      }
    }
  return (
    <>
    <div>
         <Toolbar/>
         {err && <p className="alert alert-danger">{err}</p>}
        <div className="addNewBook m-3 d-flex justify-content-end align-items-center font-weight-bold" style={{fontWeight:'bold'}}>
            <div className="btn" onClick={()=> handleClickOpen()}>
                <span className="font-weight-bold">Add Staff</span> <AddCircleIcon style={{fontSize:'38px'}}/>
            </div>
        </div>
        <div className="container">

        <TextField
            placeholder='Search staff'
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
        <TableContainer component={Paper} >

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

              <TableCell>Name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>status</TableCell>
              <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
          {staffs.map((staff,index) => {
            return (<TableRow>
              <TableCell>{staff.firstName} {staff.lastName}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell>{staff.status?'Active':'Disabled'}</TableCell>
              <TableCell>{staff.status? <button onClick={()=>{DisableStaff(staff,index)}}>Disable!</button>:<button onClick={()=> {ActivateStaff(staff,index)}}>Activate!</button>}</TableCell>
            </TableRow>)
          })}
          </Table>
        </TableContainer>
    </div>

    {/* modal to add new staff */}
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
            
           
           <TextField id="filled-basic" label="First name" variant="filled"  className='m-3' value={fname} onChange={e => setFname(e.target.value)}/> 
           <TextField id="filled-basic" label="Last name" variant="filled"  className='m-3'value={lname} onChange={e => setLname(e.target.value)}/> 
           <TextField id="filled-basic" label="Password" variant="filled"  className='m-3'value={password} onChange={e => setPass(e.target.value)}/> 
           <TextField id="filled-basic" label="Email" variant="filled"  className='m-3'value={email} onChange={e => setEmail(e.target.value)}/> 
         
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={AddStaff} >
            Add Staff!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
