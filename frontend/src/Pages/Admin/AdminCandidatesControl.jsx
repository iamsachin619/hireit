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
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, getListSubheaderUtilityClass, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {Pagination} from '@mui/material';
import { useToaster,Notification } from 'rsuite';
import SplitButton from '../../Components/ButtonDropdow';
import SplitButtonAtAdmin from '../../Components/ButtonDropdownForAdmin';
import SplitButtonUsers from '../../Components/ButtonDropdownUsers';

// const options = ['pending', 'forwarded', 'rejected','scheduled', 'All'];
function AdminCandidatesControl() {
  const options = ['pending', 'forwarded', 'rejected','scheduled', 'all status'];
  const [selectedIndex, setSelectedIndex] = React.useState(4);
  const [selectedUserIndex, setSelectedUserIndex] = React.useState(0);
  const [books, setBooks] = useState([])
    const [page, setPage] = useState(1)
    const [rows, setRows] = useState(50)
    const [total, setTotal] = useState(0)
    useEffect(()=>{
        getCandidates()
    },[])


    const [users, setUsers] = useState([{_id: 'all franchise'}])
    useEffect(()=>{
      getUsers()
  },[])
  
  const getUsers = () =>{
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
        console.log({res}, 'users')
        setUsers([{_id: 'all franchise', email: 'All Franchise'},...res])
      })
      .catch(error => {setErr('Error fetching Staffs')})
    }

    function getCandidates(){

      // let config = {
      //   method: 'post',
      //   credentials: 'include',
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
          status: options[selectedIndex] == 'all status' ? false: options[selectedIndex],
          uploadedBy: users[selectedUserIndex]._id == 'all franchise' ? false: users[selectedUserIndex]._id
        })
      })
      .then(res => res.json())
      .then((response) => {
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

    useEffect(()=>{
      getCandidates()
    },[selectedUserIndex])
    useEffect(()=>{
      getCandidates()
    },[selectedIndex])

  return (
    <>
        <h2>Candidates</h2>
        <Toolbar/>
        {/* <div className="addNewBook m-3 d-flex justify-content-end align-items-center font-weight-bold" style={{fontWeight:'bold'}}>
            <div className="btn" onClick={()=> handleClickOpen()}>
                <span className="font-weight-bold">Add Candidate</span> <AddCircleIcon style={{fontSize:'38px'}}/>
            </div>
        </div> */}
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
            <div className="col-2">
              <SplitButton selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} options={options}/>
            </div>
            <div className="col-2">
              <SplitButtonUsers selectedIndex={selectedUserIndex} setSelectedIndex={setSelectedUserIndex} options={users}/>
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
              <TableCell>uploadedBy</TableCell>
              <TableCell>Resume</TableCell>
              <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
          {books.map((candidate,index) => {
            return (<TableRow>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.pan}</TableCell>
              <TableCell>{candidate.uploadedBy.email}</TableCell>
              <TableCell><a href={candidate.resume}>Link</a></TableCell>
              <TableCell><SplitButtonAtAdmin status={candidate.status} candidateId={candidate._id} key={candidate._id}/></TableCell>
              {/* <TableCell><button onClick={() => opneConfirm(candidate._id)}>Delete</button></TableCell> */}
              {/* <TableCell>{staff.status? <button onClick={()=>{DisableStaff(staff,index)}}>Disable!</button>:<button onClick={()=> {ActivateStaff(staff,index)}}>Activate!</button>}</TableCell> */}
            </TableRow>)
          })}
          </Table>

        </TableContainer>
        </div>

{/* pagination controls */}
<div className="d-flex justify-content-center align-items-center mt-3">
  <Pagination count={Math.ceil(total/rows)} page={page} onChange={pageChange} variant="outlined" shape="rounded" />

</div>

    </>



  )
}

export default AdminCandidatesControl