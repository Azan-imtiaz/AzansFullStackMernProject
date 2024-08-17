import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import "./profile.css";
import Spiner from "../../compoenents/Spiners/spinners";
import { singleUserGetFunction } from "../../services/apis";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import moment from "moment";
const Profile = () => {
  const [showspin, setSpin] = useState(true);
  const [recievedData, setRecievedData] = useState({});
 
  const { id } = useParams();

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setSpin(false);
    }, 1200);
  }, [id]);

  const userProfileGet = async () => {
    try {
      const response = await singleUserGetFunction(id);
      if (response.status === 200) {
        console.log(response.data);
        setRecievedData(response.data);
      } else {
        console.log("error");
      }
      console.log(recievedData);
    } catch (err) {
      console.log(`error  ${err}`);
    }
  };

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div>
          <div className="container ">
            <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
              <Card.Body>
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <img
                        src={`${BASE_URL}/uploads/${recievedData.profile}`}
                        alt="image"
                      />
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>{recievedData.fname + " " + recievedData.lname}</h3>
                  <h4>
                    <i class="fa-solid fa-envelope email "></i> &nbsp;:-{" "}
                    <span>{recievedData.email}</span>
                  </h4>
                  <h5>
                    <i class="fa-solid fa-mobile"></i>&nbsp;:-{" "}
                    <span>{recievedData.mobile}</span>
                  </h5>
                  <h4>
                    <i class="fa-solid fa-person"></i>&nbsp;:-{" "}
                    <span>{recievedData.gender}</span>
                  </h4>
                  <h4>
                    <i class="fa-solid fa-location-pin location"></i>&nbsp;:-{" "}
                    <span>{recievedData.location}</span>
                  </h4>
                  <h4>
                    Status&nbsp;:- <span>{recievedData.status}</span>
                  </h4>

                  <h5>
                    <i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date
                    Created&nbsp;:-{" "}
                    <span>
                      {moment(recievedData.datecreated).format("DD-MM-YYYY")}
                    </span>
                  </h5>
                  <h5>
                    <i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date
                    Updated&nbsp;:- <span>{recievedData.dateupdated}</span>
                  </h5>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div> 
      )}
    </>
  );
};

export default Profile;
