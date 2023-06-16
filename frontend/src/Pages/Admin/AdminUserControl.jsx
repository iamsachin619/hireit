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
export default function AdminUserControl() {

  const [err, setErr] = useState(null)
  const [users, setUsers] = useState([])
    useEffect(() => {

      FetchList()
    }, [])
    const FetchList = () =>{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      fetch(apiHost + 'admin/getUserList',{
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
          setUsers(res)
        })
        .catch(error => {setErr('Error fetching Staffs')})
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
          let tempStaffs = users
          tempStaffs[index].status = false

          setUsers([...tempStaffs])
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
          let tempStaffs = users
          tempStaffs[index].status = true

          setUsers([...tempStaffs])
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
      fetch(apiHost + 'admin/searchUsers',{
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
          setUsers(res)
        })
        .catch(error => {setErr('Error fetching Users')})
      }
    }
  return (
    <div>
     <Toolbar/>
         {err && <p className="alert alert-danger my-2">{err}</p>}
        
         <div className="container mt-3">
          <TextField
              placeholder='Search users'
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
          {users.map((staff,index) => {
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
  )
}
