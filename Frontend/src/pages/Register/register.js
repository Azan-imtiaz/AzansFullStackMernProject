import React, { useContext, useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/row";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiner from "../../compoenents/Spiners/spinners";
import { registerFunction } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import { addData } from "../../compoenents/context/ContextProvider";

import "./register.css";
const Register = () => {
  const [status, setStatus] = useState("Active"); //initial value active
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [showspin, setSpin] = useState(true);
  const navigate = useNavigate();
  const { useradd, setUserAdd } = useContext(addData);

  //status options
  const [inputData, setInput] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  //SET INPUT VALUE

  const setInputData = (e) => {
    const { name, value } = e.target;
    setInput({
      ...inputData,
      [name]: value,
    });
  };

  //STATUS SET
  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  //set profile

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  // console.log(image);

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setSpin(false);
    }, 1200);
  }, [image]);

  //submit data
  async function SubmitUserData(e) {
    e.preventDefault(); // Prevent the default form submission
    const { fname, lname, email, mobile, gender, location } = inputData;
    if (fname === "") {
      toast.error("First Name is Required");
    } else if (lname === "") {
      toast.error("Last Name is Required");
    } else if (email === "") {
      toast.error("Email is Required");
    } else if (!email.includes("@")) {
      toast.error("Email is Required");
    } else if (mobile === "") {
      toast.error("Enter Valid Mobile");
    } else if (mobile.length > 11) {
      toast.error("Enter Valid mobile");
    } else if (gender === "") {
      toast.error("Gender is Required");
    } else if (status === "") {
      toast.error("Status is Required");
    } else if (image === "") {
      toast.error("image is Required");
    } else if (location === "") {
      toast.error("Location is Required");
    } else {
      const data = new FormData();
      //keyname value
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await registerFunction(data, config);
      console.log(response);
      //after getting response from server

      if (response.status === 200) {
        setInput({
          ...inputData,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
        });
        setStatus("");
        setImage("");
        setUserAdd(response.data);
        navigate("/");

        // toast.success('User is succesfully registered');
      } else {
        toast.error("Something wrong in your data enter");
      }
    }
  }

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Register your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img src={preview ? preview : "/man.png"} alt="image" />
            </div>
            <Form style={{ marginTop: "24px" }}>
              <Row>
                <Form.Group
                  className="mb-3  col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={inputData.fname}
                    onChange={setInputData}
                    placeholder="Enter FirstName"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3  col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    onChange={setInputData}
                    value={inputData.lname}
                    placeholder="Enter LastName"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3  col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={setInputData}
                    value={inputData.email}
                    placeholder="Enter Email"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3  col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    onChange={setInputData}
                    value={inputData.mobile}
                    placeholder="Enter Mobile"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3  col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    onChange={setInputData}
                  />

                  <Form.Check
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    onChange={setInputData}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3  col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Status</Form.Label>
                  <Select
                    options={options}
                    name="status"
                    onChange={setStatusValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3  col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    onChange={setProfile}
                    placeholder="Choose profile"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3  col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={inputData.location}
                    placeholder="Enter Your location"
                    onChange={setInputData}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={SubmitUserData}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>

          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Register;
