import React, { useContext, useState, useEffect } from "react";
import { APIContext } from "../context/Context";
import { NavLink, redirect } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { deleteData } from "../Info/Item";

const Top = () => {
  var k = 1;
  const data = useContext(APIContext);
  const [images, setImages] = useState([]);
  const [i, setI] = useState(4);
  useEffect(() => {
    if (Array.isArray(data.userData)) {
      setImages(data.userData);
    }
  }, [data.userData]);
  const handleQuant = async (x) => {
    if(x===-4 && i===4) return;
    if (i >= 4 && i < images.length) {
      setI(i + x);
    } else {
      setI(4);
    }
  };
  const handleDelete = async (id) => {
    const res = await deleteData(id);
    if(res){
      window.location.reload();
      return redirect("/");
    }
    else{
      throw new Error("Failed to delete item");
    }
  }
  return (
    <>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      {images.slice(0, i).map((img) => (
        <div
          key={img.id}
          className="card"
          style={{ width: "18rem", margin: "0.5rem" }}
        >
          <div className="card-body h-100">
            <ul>
              <li key={img.id} style={{ listStyle: "none" }}>
                <img
                  src={img.url + k++ || <Skeleton />}
                  alt={`Image ${img.id}`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <h5 className="card-title">{img.model || <Skeleton />}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {img.brand || <Skeleton />}
                </h6>
                <p className="card-text">OS- {img.os || <Skeleton />}</p>
                <p className="card-text">
                  Release Date- {img.release_date || <Skeleton />}
                </p>
                <div className="container-fluid">
                  <NavLink to={`/item/${img.id}`}>
                    <button className="btn btn-primary">View Item</button>
                  </NavLink>
                  &nbsp;
                  <button className="btn btn-danger" onClick={()=> handleDelete(img.id)}>Delete</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ))}
      <div style={{ marginLeft: "20px" }}>
        <div
          className="container-fluid"
          style={{ marginleft: "45% !important" }}
        >
          <button className="btn btn-primary" onClick={() => handleQuant(-4)}>
            Show Less
          </button>
          &nbsp;
          <button className="btn btn-primary" onClick={() => handleQuant(4)}>
            Show More
          </button>
        </div>
      </div>
      </SkeletonTheme>
    </>
  );
};

export default Top;
