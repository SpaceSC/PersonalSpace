function ConfirmPopup({setConfirmed, setPopup, ok, cancel, popupMessage }) {
  
  const handleConfirmed = () => {
  setConfirmed(true)
  setPopup(false)
  }

  return (
    <div className="popup">
      <p>{popupMessage}</p>
      <button className="deleteConfirm" onClick={handleConfirmed}>{ok || "OK"}</button>
      
      <button className="deleteConfirm" onClick={() => setPopup(false)}>{cancel || "Cancel"}</button>
    </div>
  )
}

export default ConfirmPopup;
