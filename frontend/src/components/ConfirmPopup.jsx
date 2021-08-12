function ConfirmPopup({setConfirmed, setPopup, ok, cancel, message }) {
  
  const handleConfirmed = () => {
  setConfirmed(true)
  setPopup(false)
  }

  return (
    <div>
      <p>{message}</p>
      <button onClick={handleConfirmed}>{ok || "OK"}</button>
      
      <button onClick={() => setPopup(false)}>{cancel || "Cancel"}</button>
    </div>
  )
}

export default ConfirmPopup;
