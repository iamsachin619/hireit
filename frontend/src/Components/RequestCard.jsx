import React from "react";
import { useToaster, Notification } from "rsuite";
import apiHost from "../env";
export default function RequestCard({request, setReqs,reqs,index}) {

  const toaster = useToaster()


  const Approve = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'staff/approveRental',{
        credentials:'include',
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          rental_id: request._id})})
          .then(res => {
            if(res.status ==200){
              return res
            }
          })
          .then(res => {
            
            let tempreqs = reqs
            tempreqs.splice(index,1)          
            setReqs([...tempreqs])
            toaster.push(<Notification type={'success'} header={'success'} closable>
            Book rental approved
            </Notification>, {placement:'bottomEnd'})
           
            
          })
          .catch(err => console.log("Not able to approve! Something went wrong"))
  }

  const Decline = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(apiHost + 'staff/declineRental',{
        credentials:'include',
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          rental_id: request._id})})
          .then(res => {
            if(res.status ==200){
              return res
            }
          })
          .then(res => {
            
            let tempreqs = reqs
            
            tempreqs.splice(index,1)
           

            setReqs([...tempreqs])
            toaster.push(<Notification type={'info'} header={'info'} closable>
            Book rental declined
            </Notification>, {placement:'bottomEnd'})
           
            
          })
          .catch(err => console.log("Not able to decline! Something went wrong"))
  }
  return (
    <div className="card my-2">

      <div className="row">
        <div className="col-md-8 ">
          {/* Book_id: book_id
                    User_id: user_id
                    issueDate: Date
                    dueDate: Date
                    amount: number
                    approvedBy: ObjectId(User/staff)
                    lateFeeCharged: 0   (will change when rentals closed)
                    returnDate: Date
                    Status: string  */}

          <div className="content m-3 row">
            {/* <div className="col-4 font-weight-bold">
                <p className="detail">Book name: </p>
                <p className="detail">User email:</p>
                <p className="detail">Amount:</p>
                <p className="detail">Returning within: </p>  
            </div>
            <div className="col-8">
                <p className="detail">Roughing It</p>
                <p className="detail">ss.gg@gx.com</p>
                <p className="detail">Rs.250/-</p>
                <p className="detail">15 Days </p> 
            </div> */}
           <table>
            <tr>
                <th><p className="detail">Book name: </p></th>
                <td><p className="detail">{request.book.title}</p></td>
            </tr>

            <tr>
                <th><p className="detail">User email: </p></th>
                <td><p className="detail">{request.user.email}</p></td>
            </tr>
            <tr>
                <th><p className="detail">Amount: </p></th>
                <td><p className="detail">Rs.{request.amount}</p></td>
            </tr>
            <tr>
                <th><p className="detail">Returning within: </p></th>
                <td><p className="detail">{request.noOfDaysToRent} days</p></td>
            </tr>
           </table>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="btns d-flex justify-content-end m-2">
            <button className="btn btn-success mx-2" onClick={Approve}>Accept</button>
            <button className="btn btn-danger" onClick={Decline}>Decline</button>
          </div>
        </div>
      </div>
    </div>
  );
}
