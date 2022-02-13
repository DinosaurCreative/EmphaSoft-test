function UserLine({ ...props }) {
  const { id, username, first_name, last_name, setUserForUpdate, history, arrIndex } = props;
  function setUserForUpdateHandler() {
    setUserForUpdate({...props, index: arrIndex});
    history.push('/update-user');
    localStorage.setItem('idForUpdate', id);
    localStorage.setItem('userForUpdate', JSON.stringify({...props, index: arrIndex}));
  };

  return(
    <li className="userline">
      <label className='userline__id-container'>
        <p className="userline__parametr">{id}</p>
        <button className='userline__button' onClick={setUserForUpdateHandler}/>
      </label>
      <p className="userline__parametr">{username}</p>
      <p className="userline__parametr">{first_name}</p>
      <p className="userline__parametr">{last_name}</p>
    </li>
  );
};

export default UserLine;