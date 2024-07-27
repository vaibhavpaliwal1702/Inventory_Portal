import React, { useState, useEffect } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { createAccount } from "../Info/login";

const avatarImages = [
  "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.1331120705.1714709173&semt=sph",
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.1331120705.1714709173&semt=sph",
  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1331120705.1714709173&semt=sph",
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg&ga=GA1.1.1331120705.1714709173&semt=sph",
  "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=626&ext=jpg&ga=GA1.1.1331120705.1714709173&semt=sph",
  "https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6838.jpg?size=626&ext=jpg&ga=GA1.1.1331120705.1714709173&semt=sph",
];

export async function action({ request }) {
  const formData = await request.formData();
  const uploadData = Object.fromEntries(formData);
  await createAccount(uploadData);
  return redirect(`/user/${uploadData.UserName}`);
}
const SignUp = () => {
  const [Pwd, setPwd] = useState("");
  const [ConPwd, setConPwd] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chk, setChk] = useState(true);
  const [usr, setusr] = useState("");
  const navigate = useNavigate();
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAvatarSelect = (avatar) => {
    setavatar(avatar);
    closeModal();
  };
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const defaultAvatar =
    "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=";
  const [avatar, setavatar] = useState(defaultAvatar);
  const chkBlur = (e) => {
    if (!e.target.value) {
      alert(`${e.target.name} is required.`);
      e.preventDefault();
      return false;
    }
    if (e.target.name === "Password" && e.target.value) setPwd(e.target.value);
  };
  useEffect(() => {
    setChk(Pwd.trim() === ConPwd.trim());
  }, [ConPwd, Pwd]);
  const ConPwdChange = (e) => {
    setConPwd(e.target.value);
  };
  const handleChangeusr = (e) => {
    setusr(e.target.value);
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
            <h5 className="card-title">Sign Up</h5>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">
                User Name
              </label>
              <input
                type="name"
                className="form-control"
                id="UserName"
                aria-describedby="emailHelp"
                name="UserName"
                onBlur={chkBlur}
                placeholder="User Name"
                onChange={handleChangeusr}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Fname" className="form-label">
                First Name
              </label>
              <input
                type="name"
                className="form-control"
                id="Fname"
                name="FirstName"
                aria-describedby="fnameHelp"
                placeholder="First Name"
                onBlur={chkBlur}
              />
              <label htmlFor="Lname" className="form-label">
                Last Name
              </label>
              <input
                type="name"
                className="form-control"
                id="Lname"
                name="LastName"
                aria-describedby="lnameHelp"
                placeholder="Last Name"
                onBlur={chkBlur}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="InputEmail"
                aria-describedby="emailHelp"
                placeholder="abcd@gmail.com"
                name="Email"
                onBlur={chkBlur}
              />
            </div>

            <div className="mb-3">
              {avatar === "" ? (
                <>
                  <label className="form-label">Choose your avatar</label>
                  <br />
                  <button
                    onClick={(e) => {
                      openModal();
                      e.preventDefault();
                    }}
                    className="btn btn-primary"
                  >
                    Select Avatar
                  </button>
                </>
              ) : (
                <>
                  <label className="form-label">Choose Avatar</label>&nbsp;
                  <img
                    src={avatar}
                    style={{ width: "100px", height: "100px", cursor:"pointer" }}
                    className="img"
                    onClick={(e) => {
                      openModal();
                      e.preventDefault();
                    }}
                  />
                </>
              )}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Select Avatar Modal"
              >
                <>
                  <h2>Select Avatar</h2>
                  <div className="avatar-list">
                    {avatarImages.map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar}
                        alt={`Avatar ${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                          backgroundColor: "#252525",
                          cursor: "pointer",
                        }}
                        onClick={() => handleAvatarSelect(avatar)}
                      />
                    ))}
                  </div>
                  <button onClick={closeModal} className="btn btn-primary">
                    Close Modal
                  </button>
                </>
              </Modal>
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="InputPassword"
                name="Password"
                onBlur={chkBlur}
              />
            </div>
            <div className="mb-3">
              {!chk ? (
                <>
                  <label style={{ color: "Red" }}>
                    Password does not match!
                  </label>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="Confirm Password"
                onBlur={chkBlur}
                value={ConPwd}
                onChange={ConPwdChange}
              />
            </div>
            <input
              type="hidden"
              name="avatar"
              value={avatar || contact?.avatar}
            />
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
