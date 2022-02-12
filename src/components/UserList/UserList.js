import UserLine from "../UserLine/UserLine";

function UserList(props) {

  const { users, sortByIdHandler, setIsSortedUp, isSortedUp, setSearchFormData, searchFormData, setUserForUpdate, history} = props;
  function sortHandler() {
    setIsSortedUp(!isSortedUp);
    sortByIdHandler();
  }
  
  function onChangeHandler(e) {
    setSearchFormData(e.target.value)
  }

  return (
    <div className="userlist">
      <h1 className="userlist__title">Userlist</h1>
      <input className="userlist__search-form" placeholder="search by username" onChange={onChangeHandler} value={searchFormData}/>
      <div className="userlist__column-titles-list">
        <div className="uselist__id-container">
          <label className="userlist__column-title_label" htmlFor="id">
            <h3 className="userlist__column-title">ID</h3>
          </label> 
          <button className={isSortedUp ? 'userlist__id-sort-btn_place_up' : 'userlist__id-sort-btn_place_down'} id='id' onClick={sortHandler}/>
        </div>
        <h3 className="userlist__column-title">Username</h3>
        <h3 className="userlist__column-title">Name</h3>
        <h3 className="userlist__column-title">Last name</h3>
      </div>
        <ul className="userlist__list">
          {users.map((user, i)=> <UserLine {...user}  key={user.id} history={history} arrIndex={i} setUserForUpdate={setUserForUpdate}/>)}
        </ul>
    </div>
  ) 
}

export default UserList