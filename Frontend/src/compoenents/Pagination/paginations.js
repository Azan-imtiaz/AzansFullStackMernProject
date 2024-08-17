import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginations = ({ handlePrevious, handleNext, page, pageCount, setPage }) => (
  <>
    {
      pageCount > 0 ? (
        <div className='pagination-div-class d-flex justify-content-end mx-5'>
          <Pagination>
            <Pagination.Prev onClick={handlePrevious} />
            {Array(pageCount).fill(null).map((elem, index) => (
              <Pagination.Item key={index} active={page===index+1 ? true:false } onClick={()=>{setPage(index+1)}} >{index+1}</Pagination.Item>
            ))}
            <Pagination.Next onClick={handleNext} />
          </Pagination>
        </div>
      ) : null
    }
  </>
);

export default Paginations;
