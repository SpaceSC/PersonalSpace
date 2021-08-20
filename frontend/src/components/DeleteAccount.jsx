import { useState, useEffect } from "react";
import ConfirmPopup from "./ConfirmPopup";

function DeleteAccount({logout, setDeleteResponse}) {
  const [popup, setPopup] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  


  const ok = "Delete Account"
  const cancel = "Cancel"
  const message = "Are you sure you want to delete this account?"


  useEffect(() => {
    if(!confirmed) return

    const fetchData = async () => {
      const myToken = localStorage.getItem("myToken");
      const response = await fetch("http://localhost:5000/api/delete-account", {
        method: "DELETE",
        headers: {
          "Authorization": myToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDeleteResponse(data.message);
        logout();
      }
    }
    fetchData();

  }, [confirmed])// eslint-disable-line 
 
  

  return (
  <div>
    <button onClick={() => setPopup(true)} disabled={popup}>Delete Account</button>
    {popup && <ConfirmPopup setConfirmed={setConfirmed} setPopup={setPopup} ok={ok} cancel={cancel} message={message}/>}
  </div>
  )
}

export default DeleteAccount;
