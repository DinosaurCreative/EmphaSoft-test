import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { signIn, getUsers, createUser, deleteUser, updateUser } from '../../utils/mainApi';
import { useEffect, useState } from 'react';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserList from '../UserList/UserList';
import WrongPath from '../WrongPath/WrongPath';
import CreateUser from '../CreateUser/CreateUser';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import serverMessagesHandler from '../../utils/serverMessagesHandler';
import { popupMessages } from '../../utils/constants';
import UpdateUser from '../UpdateUser/UpdateUser';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [ isLoggedIn, setIsLoggedIn ] = useState(true);
  const [ users, setUsers ] = useState([]);
  const [ usersCopy, setUsersCopy ] = useState([]);
  const [ isSortedUp, setIsSortedUp ] = useState(false);
  const [ searchFormData, setSearchFormData ] = useState('');
  const [ isPopupShowed, setIsPopupShowed ] = useState(false);
  const [ isRequestOk, setIsRequestOk ] = useState();
  const [ popupMessage, setPopupMessage ] = useState('');
  const [ userForUpdate, setUserForUpdate ] = useState({});

  const app = document.querySelector('.app');

  useEffect(() => {
    const sortedUsers = usersCopy.filter(user => user.username.toLowerCase().includes(searchFormData.toLowerCase().trim()));
    setUsers(sortedUsers);
  }, [searchFormData]);

  useEffect(() => {
    if(localStorage.getItem('emphaToken') === null) {
      return setIsLoggedIn(false);
    }
    const users = JSON.parse(localStorage.getItem('emphaUsers'));
    setUsers(users);
    setUsersCopy(users);
  }, []);

  useEffect(() => {
    if(location.pathname === '/signin' && isLoggedIn) {
      history.goBack();
    }
  }, [location.pathname, history, isLoggedIn]);

  function sortByIdHandler() {
    const sortedUsers = users.sort((a, b) => {
      if(isSortedUp) return a.id - b.id;
      return b.id - a.id;
    });
    setUsers(sortedUsers);
  };

  function createUserHandler(data) {
    popupHandler(isPopupShowed);
    createUser(data)
      .then((res) => {
        const arr = [...users, res];
        setUsers(arr);
        setUsersCopy(arr);
        localStorage.setItem('emphaUsers', JSON.stringify(arr));
      })
      .then(() => {
        setPopupMessage(popupMessages.userCreated);
        setIsRequestOk(true);
        history.push('/users');
      })
      .catch((err) => {
        setIsRequestOk(false);
        serverMessagesHandler(err, setPopupMessage);
      })
      .finally(() => setIsPopupShowed(true))
  };

  function updateUsersListHandler() {
    popupHandler(isPopupShowed);
    getUsers()
      .then(res => {
        setUsers(res);
        setUsersCopy(res);
        localStorage.setItem('emphaUsers', JSON.stringify(res));
      })
      .then(() => {
        setPopupMessage('');
        setIsRequestOk(true);
      })
      .catch(err => {
        setIsRequestOk(false);
        serverMessagesHandler(err, setPopupMessage);
      })
      .finally(() => setIsPopupShowed(true));
  };

  function signInHandler({ username, password_login }) {
    popupHandler(isPopupShowed);
    signIn({ username, password: password_login })
      .then(res => {
        localStorage.setItem('emphaToken', res.token);
        setIsRequestOk(true);
        setPopupMessage(popupMessages.signinOk);
        getUsers()
          .then(res => {
            console.log(res)
            setIsLoggedIn(true);
            setUsers(res);
            localStorage.setItem('emphaUsers', JSON.stringify(res));
            })
            .catch(err => {
              console.log(err)
              setIsRequestOk(false);
              serverMessagesHandler(err, setPopupMessage);
            })
            .finally(() => {
              history.push('/users');
              setIsPopupShowed(true);
            })
      })
      .catch(err => {
        setIsRequestOk(false);
        serverMessagesHandler(err, setPopupMessage);
        setIsPopupShowed(true);
      })
      .finally(() =>  setIsPopupShowed(true))
  };

  function updateUserHandler(data, index) {
    popupHandler(isPopupShowed);
    updateUser(data)
      .then(res => {
        usersCopy.splice(index, 1);
        let arr = [...usersCopy, res];
        setUsers(arr);
        setUsersCopy(arr);
        localStorage.setItem('emphaUsers', JSON.stringify(arr));
        setIsRequestOk(true);
        setPopupMessage(popupMessages.userDataChanged);
      })
      .catch(err => {
        setIsRequestOk(false);
        serverMessagesHandler(err, setPopupMessage);
      })
      .finally(() => {
        setIsPopupShowed(true);
        history.push('/users');
      });
  };

  function deleteUserHandler() {
    popupHandler(isPopupShowed);
    deleteUser(userForUpdate.id)
      .then(() => { 
        usersCopy.splice(userForUpdate.index, 1);
        setUsers(usersCopy);
        setUsersCopy(usersCopy);
        localStorage.setItem('emphaUsers', JSON.stringify(usersCopy));
        setPopupMessage(popupMessages.userDeleted);
        setIsRequestOk(true);
      })
      .catch((err) => {
        setIsRequestOk(false);
        serverMessagesHandler(err, setPopupMessage);
      })
      .finally(() => {
        setIsPopupShowed(true);
        history.push('/users');
      })
  }

  function signOutHandler() {
    localStorage.removeItem('emphaToken');
    localStorage.removeItem('emphaUsers');
    localStorage.removeItem('idForUpdate');
    history.push('/signin');
    setIsLoggedIn(false);
  };

  function hidePopupHandler() {
    setIsPopupShowed(false);
  };
  
  function popupHandler(isPopupShowed) {
    if(!isPopupShowed) {
      app.addEventListener('click', popupHandler);
      app.addEventListener('keydown', popupHandler);
      return
    };
    app.removeEventListener('click', popupHandler);
    app.removeEventListener('keydown', popupHandler);
    hidePopupHandler();
  };
  
  return (
    <div className='app'>
      { isLoggedIn && <nav className='app__button-container'>
        {location.pathname === '/users' && <button className='app__button app__button_update-userlist' onClick={updateUsersListHandler}>Update user list</button>}
        {location.pathname === '/create-user' && <Link className='app__button' to='/users' href='#'>User list</Link>}
        {location.pathname === '/update-user' && <button className='app__button app__button_update-userlis' onClick={deleteUserHandler} to='/users' href='#'>Delete this user</button>}
        {location.pathname === '/users' && <Link className='app__button' to='/create-user' href='#'>Create user</Link>}
        {location.pathname === '/update-user' && <Link className='app__button' to='/users' href='#'>GO BACK</Link>}

        <button className='app__button app__button_exit' onClick={signOutHandler}>Exit</button>
      </nav>}
      {!isLoggedIn && <Login onSubmit={signInHandler}
                             path='/signin' />}
      <Switch>
        <ProtectedRoute path='/users'
                        component={UserList}
                        isLoggedIn={isLoggedIn}
                        users={users}
                        sortByIdHandler={sortByIdHandler}
                        setIsSortedUp={setIsSortedUp}
                        isSortedUp={isSortedUp} 
                        setSearchFormData={setSearchFormData} 
                        searchFormData={searchFormData}
                        setUserForUpdate={setUserForUpdate} 
                        history={history}/>
        
        <ProtectedRoute path='/create-user'
                        component={CreateUser}
                        isLoggedIn={isLoggedIn}
                        createUserHandler={createUserHandler} />

        <ProtectedRoute path='/update-user'
                        component={UpdateUser}
                        isLoggedIn={isLoggedIn}
                        updateUserHandler={updateUserHandler}
                        deleteUserHandler={deleteUserHandler} 
                        userForUpdate={userForUpdate}
                        history={history}
                        setUserForUpdate={setUserForUpdate} />
       
        {isLoggedIn && <Route component={WrongPath}
                              history={history} />}
      </Switch>
      <NotificationPopup isPopupShowed={isPopupShowed}
                         hidePopupHandler={hidePopupHandler}
                         isRequestOk={isRequestOk}
                         message={popupMessage} />
    </div>
  );
};

export default App;