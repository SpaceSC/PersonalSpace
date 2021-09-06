import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import ConfirmPopup from "./ConfirmPopup";

function DeleteAccount({ selfAndAdmin, userId, fetchUsers }) {
  const { user, messageHandler, logout } = useContext(AppContext);
  const [popup, setPopup] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const ok = "Delete Account";
  const cancel = "Cancel";
  const popupMessage = selfAndAdmin || user.is_admin
    ? "You are an admin, please consider not deleting your account."
    : "Are you sure you want to delete this account?";

  useEffect(() => {
    if (!confirmed) return;

    const fetchData = async () => {
      const slashId = "/" + userId;

      const response = await fetch(`http://localhost:5000/api/delete-account${userId ? slashId : ""}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      });

      const data = await response.json();
  
      messageHandler(data.message)
      
      if (response.ok) {
        if (!user.is_admin || selfAndAdmin || !userId) {
          logout() } else {
            fetchUsers();
          }
    
      }
    };
    fetchData();
  }, [confirmed]); // eslint-disable-line

  return (
    <div>
      <button className="showMoreBtn" onClick={() => setPopup(true)} disabled={popup}>
        Delete Account
      </button>
      {popup && (
        <ConfirmPopup
          setConfirmed={setConfirmed}
          setPopup={setPopup}
          ok={ok}
          cancel={cancel}
          popupMessage={popupMessage}
        />
      )}
    </div>
  );
}

export default DeleteAccount;
