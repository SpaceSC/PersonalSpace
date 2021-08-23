function ConfirmPopup({setConfirmed, setPopup, ok, cancel, popupMessage }) {
  
  const handleConfirmed = () => {
  setConfirmed(true)
  setPopup(false)
  }

  return (
    <div>
      <p>{popupMessage}</p>
      <button onClick={handleConfirmed}>{ok || "OK"}</button>
      
      <button className="showMoreBtn" onClick={() => setPopup(false)}>{cancel || "Cancel"}</button>
    </div>
  )
}

export default ConfirmPopup;
