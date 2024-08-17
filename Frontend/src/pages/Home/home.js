import React, { useContext, useEffect, useState } from "react";

import Button from "react-bootstrap/Button";

import Dropdown from "react-bootstrap/Dropdown";

import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";

import Table from "../../compoenents/Tables/table";

import Spiner from "../../compoenents/Spiners/spinners";

import { addData, updateData, deleteData } from "../../compoenents/context/ContextProvider";

import Alert from "react-bootstrap/Alert";

import { getFunction, deletefunc,exporttocsvfunc } from "../../services/apis";

import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState([]);
  const [showspin, setSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const { useradd, setUserAdd } = useContext(addData);
  const { update, setUserUpdate } = useContext(updateData);
  const { deletee, setDelete } = useContext(deleteData);
   const [page,setPage]=useState(1);
   const [pageCount,setPageCount]=useState(0);

  const adduser = () => {
    navigate("/register");
  };

  async function userGet() {
    const response = await getFunction(search, gender, status,sort,page);
    if (response.status === 200) {
      setUserData(response.data.userdata);
      setPageCount(response.data.pagination.pageCount);
    } else {
      console.log("Error for get user data");
    }
  }

  const deleteUser = async (id) => {

    const response = await deletefunc(id);
    if (response.status === 200) {
      userGet();
      setDelete(response.data);
    }
    else {
      // toast.error("error");
      console.log("error");
    }
  }


const exportuser=async ()=>{
  const response=await exporttocsvfunc();

  if(response.status===200){
    window.open(response.data.downloadUrl
 ,"blank");
  }
  else{
    // toast.error("error !");
    console.log("error in response of export to csv ");
   }
}

//pagination
  const handlePrevious=()=>{
    setPage(()=>{
      if(page===1){  return page; }
      else {return page-1;}
    })
  }


  const handleNext=()=>{
    setPage(()=>{
      if(page===pageCount){  return page; }
      else { return page+1;}     
    })
    console.log(page);
  }

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setSpin(false);
    }, 1200);
  }, [search, gender, status,sort,page]);
  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUserAdd("")} dismissible>
          {useradd.fname.toUpperCase()} Succesfully Added
        </Alert>
      ) : (
        ""
      )}

      {update ? (
        <Alert variant="success" onClose={() => setUserUpdate("")} dismissible>
          {update.fname.toUpperCase()} Succesfully Updated
        </Alert>
      ) : (
        ""
      )}
      {deletee ? (
        <Alert variant="danger" onClose={() => setDelete("")} dismissible>
          {deletee.fname.toUpperCase()} Succesfully Deleted
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <div className="main_div">
          {/*search and add button */}

          <div className="search_add mt-4 d-flex  justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}>
                <i class="fa-solid fa-plus"></i>&nbsp;Add User
              </Button>
            </div>
          </div>

          {/*export,gender,status  */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_csv  search_btn" onClick={()=> exportuser()}>Export to csv</Button>
            </div>

            {/* filter by gender */}
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type={"radio"}
                    label={"All"}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* filter by value */}
            <div className="filter_newold">
              <h3>Short By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>{ setSort("new")}}>New</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{setSort("old")}}>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by status */}

            <div className="filter_status">
              <h3>Filter By Status</h3>
              <div className="status_radio d-flex justify-content-around flex-wrap">
                <Form.Check
                  type={"radio"}
                  label={"All"}
                  name="status"
                  value={"All"}
                  onChange={(e) => setStatus
                    (e.target.value)}

                  defaultChecked
                />{" "}
                &nbsp;
                <Form.Check
                  type={"radio"}
                  label={"Active"}
                  name="status"
                  value={"Active"}
                  onChange={(e) => setStatus
                    (e.target.value)}

                />{" "}
                &nbsp;
                <Form.Check
                  type={"radio"}
                  label={"InActive"}
                  name="status"
                  value={"InActive"}
                  onChange={(e) => setStatus
                    (e.target.value)}

                />
              </div>
            </div>
          </div>
        </div>
        {showspin ? <Spiner /> : 
        <Table userdata={userdata}
         deleteUser={deleteUser}
          userGet={userGet} 
          handlePrevious={handlePrevious}
         handleNext={handleNext}
         page={page}
         pageCount={pageCount}
         setPage={setPage} />}
      </div>
    </>
  );
};

export default Home;
