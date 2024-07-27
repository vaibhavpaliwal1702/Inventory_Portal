import React from "react";
import { Form, redirect } from "react-router-dom";
import { AddData } from "../Info/Item";

export async function action({ request }) {
  const formData = await request.formData();
  const uploadData = Object.fromEntries(formData);
  const res = await AddData(uploadData);
  if (res) {
    return redirect("/");
  } else {
    throw new Error("Failed to Add item!");
  }
}

const AddProduct = () => {
  const chkBlur = (e) => {
    let val = e.target.value;
    val = val.trim();
    if (!val) {
      alert(`${e.target.name} is required.`);
      e.preventDefault();
      return false;
    }
  };

  const chkFrm = (e) => {
    if (document.getElementById("txtBrand").value === "") {
      alert("Brand is required.");
      e.preventDefault();
      return false;
    }
    if (document.getElementById("txtModel").value === "") {
      alert("Model is required.");
      e.preventDefault();
      return false;
    }
    if (document.getElementById("txtOS").value === "") {
      alert("OS is required.");
      e.preventDefault();
      return false;
    }
    if (document.getElementById("txtUrl").value === "") {
      alert("URL is required.");
      e.preventDefault();
      return false;
    }
    if (document.getElementById("txtYear").value === "") {
      alert("Release Year is required.");
      e.preventDefault();
      return false;
    }
  };

  return (
    <>
      <div
        className="card"
        style={{
          margin: "auto",
          marginleft: "35%",
          width: "31%",
          alignitems: "center",
          marginTop: "25px",
        }}
      >
        <Form method="post">
          <div className="card-body" style={{ height: "auto" }}>
            <h5 className="card-title">Add Product</h5>
            <div className="mb-3">
              <label htmlFor="txtBrand" className="form-label">
                Brand
              </label>
              <input
                type="text"
                className="form-control"
                id="txtBrand"
                aria-describedby="Brand"
                name="Brand"
                placeholder="Brand"
                onBlur={chkBlur}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="txtModel" className="form-label">
                Model
              </label>
              <input
                type="text"
                className="form-control"
                id="txtModel"
                aria-describedby="Model"
                name="Model"
                placeholder="Model"
                onBlur={chkBlur}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="txtYear" className="form-label">
                Release Year
              </label>
              <input
                type="number"
                className="form-control"
                id="txtYear"
                aria-describedby="Year"
                name="Release Year"
                placeholder="e.g,2000"
                min="1990"
                max="2024"
                onBlur={chkBlur}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="txtOS" className="form-label">
                OS
              </label>
              <input
                type="text"
                className="form-control"
                id="txtOS"
                aria-describedby="OS"
                name="OS"
                onBlur={chkBlur}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="txtUrl" className="form-label">
                Image URL
              </label>
              <input
                type="url"
                name="Url"
                id="txtUrl"
                placeholder="https://example.com"
                pattern="https://.*"
                className="form-control"
                onBlur={chkBlur}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => chkFrm(e)}
              >
                Add
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
