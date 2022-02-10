function WrongPath({ history }) {

  function goBack() {
    history.goBack()
  }
  return (
      <div className="wrong-path">
        <div className="wrong-path__img" />
        <div className="wrong-path__button-container">
          <h2 className="wrong-path__message">404</h2>
          <button className="wrong-path__button" onClick={goBack}>GO BACK</button>
        </div>
      </div>
  )
}

export default WrongPath;