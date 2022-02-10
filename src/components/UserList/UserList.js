import UserLine from "../UserLine/UserLine";

function UserList(props) {
  const { users, sortByIdHandler, setIsSortedUp, isSortedUp, setSearchFormData, searchFormData} = props;
  
  function sortHandler() {
    setIsSortedUp(!isSortedUp);
    sortByIdHandler();
  }
  
  function onChangeHandler(e) {
    setSearchFormData(e.target.value)
  }
  
  return (
    <div className="userlist">
      <h1 className="userlist__title">Users List</h1>
      <input className="userlist__search-form" placeholder="search by username" onChange={onChangeHandler} value={searchFormData}/>
      <div className="userlist__column-titles-list">
        <div className="uselist__id-container">
          <h3 className="userlist__column-title">ID</h3>
          <button className={isSortedUp ? 'userlist__id-sort-btn_up' : 'userlist__id-sort-btn_down'} onClick={sortHandler}/>
        </div>
        <h3 className="userlist__column-title">Username</h3>
        <h3 className="userlist__column-title">Name</h3>
        <h3 className="userlist__column-title">Last name</h3>
      </div>
        <ul className="userlist__list">
          {users.map(user => <UserLine {...user} key={user.id}/>)}
        </ul>
    </div>
  ) 
}

export default UserList