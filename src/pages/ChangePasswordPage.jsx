import React, { useEffect, useState } from "react";
import "../styles/ChangePassword.css";
import Header from "../components/Header";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loading-icons";
import {
  addNotification,
  changePassword,
  getUserDetails,
} from "../action/userActions";
import { Eye, EyeOff } from "lucide-react";
import { updateTradieProfile } from "../action/tradieActions";
import { updateClientProfile } from "../action/clientActions";
import ReactPasswordChecklist from "react-password-checklist";

const ChangePasswordPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showNewConfirmPass, setShowNewConfirmPass] = useState(false);
  const [showError, setShowError] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [err, setErr] = useState("");
  const [user, setUser] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const getUser = async () => {
    setLoading(true);
    await getUserDetails(id).then((res) => {
      console.log(res);
      setUser(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userInfo) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    console.log({ currentPassword, newPassword, newConfirmPassword });

    if (currentPassword === user.password) {
      setShowError(false);
      setSubmitLoading(true);

      await changePassword(user.email, currentPassword, newPassword).then(
        async () => {
          const content = `Your password has been changed successfully.`;
          const picture = "Brod Notification Logo";
          const timeStamp = new Date().toISOString();

          await addNotification(
            userInfo.userId,
            content,
            picture,
            timeStamp
          ).then(() => {
            window.location.reload();
          });
        }
      );
    } else {
      setErr("Current Password is not correct.");
      setShowError(true);
    }
  };
  return (
    <div>
      <Header headerText={"Change Password"} />
      {loading ? (
        <div className="loading loading-page">
          <TailSpin stroke="#1f1f23" speed={1} />
        </div>
      ) : (
        <div className="change-pass-box">
          <form onSubmit={changePasswordHandler} className="change-pass-form">
            {!isMobile && (
              <h1 className="change-pass-h1 mb-24">Change Password</h1>
            )}
            {showError && <div className="show-error mb-20">{err}</div>}
            <div className="mb-20">
              <label className="block mb-12">Current Password</label>
              <div className="pos-relative">
                <input
                  type={showCurrentPass ? "text" : "password"}
                  className="change-pass-input"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  disabled={submitLoading ? true : false}
                />
                {showCurrentPass ? (
                  <Eye
                    onClick={() => setShowCurrentPass(false)}
                    className="show-pass"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setShowCurrentPass(true)}
                    className="show-pass"
                  />
                )}
              </div>
            </div>
            <div className="mb-20">
              <label className="block mb-12">New Password</label>
              <div className="pos-relative">
                <input
                  type={showNewPass ? "text" : "password"}
                  className="change-pass-input"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={submitLoading ? true : false}
                />
                {showNewPass ? (
                  <Eye
                    onClick={() => setShowNewPass(false)}
                    className="show-pass"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setShowNewPass(true)}
                    className="show-pass"
                  />
                )}
              </div>
            </div>
            <div className="mb-24">
              <label className="block mb-12">Confirm New Password</label>
              <div className="pos-relative">
                <input
                  type={showNewConfirmPass ? "text" : "password"}
                  className="change-pass-input"
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                  required
                  disabled={submitLoading ? true : false}
                />
                {showNewConfirmPass ? (
                  <Eye
                    onClick={() => setShowNewConfirmPass(false)}
                    className="show-pass"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setShowNewConfirmPass(true)}
                    className="show-pass"
                  />
                )}
              </div>
            </div>
            <ReactPasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={6}
              value={newPassword}
              valueAgain={newConfirmPassword}
              onChange={(isValid) => {
                console.log(isValid, disableBtn);
                if (isValid) {
                  setDisableBtn(false);
                } else {
                  setDisableBtn(true);
                }
              }}
            />
            <button
              type="submit"
              className={
                submitLoading || disableBtn
                  ? "change-pass-btn-disable link-disabled"
                  : "change-pass-btn pointer"
              }
              disabled={submitLoading || disableBtn ? true : false}
            >
              {submitLoading ? (
                <TailSpin
                  stroke="#ffffff"
                  speed={1}
                  className="icon-bg-gray loading-btn"
                />
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordPage;
