import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
const Spinners = () => {
  return (
    <>
   <div className='d-flex justify-content-center align-items-center' style={{ width:"100%",height:"50vh"}}>

<Spinner animation="border" variant="danger" />&nbsp; Loading...

   </div>
    </>
  )
}

export default Spinners
