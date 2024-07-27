import React from "react";
import { getData, deleteUser, verifyUser } from "../Info/login";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";

export async function loader({ params }) {
  const verify = await verifyUser(params.id);
  if(!verify){
    return redirect(`/`);
  }
  const data = await getData(params.id);
  return { data };
}

const User = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData();
  const handleDelete = async () => {
    await deleteUser(data.UserName);
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <div className="card" style={{ width: "18rem", marginLeft: "35%" }}>
        <div className="card-body">
          <img
            src={data.avatar}
            alt="User Image"
            style={{ width: "100px", height: "100px" }}
          ></img>
          <h5 className="card-title">{data.FirstName}&nbsp;{data.LastName}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
          {data.Email}
          </h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div className="container-fluid" style={{ marginLeft: "10%" }}>
          <button className="btn btn-primary">Something</button>&nbsp;
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default User;
