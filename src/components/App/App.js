import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { signIn, getUsers } from '../../utils/mainApi';
import { useEffect, useState } from 'react';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserList from '../UserList/UserList';
import WrongPath from '../WrongPath/WrongPath';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import serverMessagesHandler from '../../utils/serverMessagesHandler';
import { popupMessages } from '../../utils/constants';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [ isLoggedIn, setIsLoggedIn ] = useState(true);
  const [ users, setUsers ] = useState([]);
  const [ usersCopy, setUsersCopy ] = useState([]);
  const [ isSortedUp, setIsSortedUp ] = useState(false);
  const [ searchFormData, setSearchFormData ] = useState('');
  const [ isPopupShowed, setIsPopupShowed ] = useState(false);
  const [ isActionOk, setIsActionOk ] = useState();
  const [ popupMessage, setPopupMessage ] = useState('');

  const app = document.querySelector('.app');
  useEffect(() => {
    const sortedUsers = usersCopy.filter(user => user.username.toLowerCase().includes(searchFormData.toLowerCase().trim()))
    setUsers(sortedUsers)
  }, [searchFormData])

  useEffect(() => {
    if(localStorage.getItem('emphaToken') === null) {
       return setIsLoggedIn(false);
    }
    const users = JSON.parse(localStorage.getItem('emphaUsers'));
    setUsers(users)
    setUsersCopy(users)
  }, []);

  useEffect(() => {
    if(location.pathname === '/signin' && isLoggedIn) {
      history.goBack();
    }
  }, [location.pathname, history, isLoggedIn])


  function sortByIdHandler() {
    const sortedUsers = users.sort((a, b) => {
      if(isSortedUp) return a.id - b.id;
      return b.id - a.id;
    })
    setUsers(sortedUsers);
  }

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
        setIsActionOk(true);
      })
      .catch(err => {
        setIsActionOk(false)
        serverMessagesHandler(err, setPopupMessage);
      })
      .finally(() => setIsPopupShowed(true))
  }

  function signInHandler({ username, password }) {
    popupHandler(isPopupShowed);
    signIn({ username, password})
      .then(res => {
        localStorage.setItem('emphaToken', res.token);
        setIsActionOk(true);
        setPopupMessage(popupMessages.signinOk);
        getUsers()
          .then(res => {
            setIsLoggedIn(true);
            setUsers(res);
            localStorage.setItem('emphaUsers', JSON.stringify(res));
            history.push('/users');
          })
          .catch(err => {
            setIsActionOk(false)
            serverMessagesHandler(err, setPopupMessage);
           
          })
          .finally(() =>  setIsPopupShowed(true))
      })
      .catch(err => {
        setIsActionOk(false)
        serverMessagesHandler(err, setPopupMessage);
        setIsPopupShowed(true);
      })
      .finally(() =>  setIsPopupShowed(true))
  };

  function signOutHandler() {
    localStorage.removeItem('emphaToken');
    localStorage.removeItem('emphaUsers');
    history.push('/signin');
    setIsLoggedIn(false);
  };

  function hidePopupHandler() {
    setIsPopupShowed(false)
  }
  
  function popupHandler(isPopupShowed) {
    if(!isPopupShowed) {
      app.addEventListener('click', popupHandler);
      app.addEventListener('keydown', popupHandler);
      return
    }
    app.removeEventListener('click', popupHandler);
    app.removeEventListener('keydown', popupHandler);
    hidePopupHandler();
  }

  return (
    <div className='app'>
      <div className='app__button-container'>
        {isLoggedIn && location.pathname === '/users' && <button className='app__button' onClick={updateUsersListHandler}>Update user list</button>}
        {isLoggedIn && location.pathname === '/users' && <button className='app__button app__button_exit' onClick={signOutHandler}>Exit</button>}
      </div>
      {!isLoggedIn && <Login onSubmit={signInHandler}
                             path='/signin' />}
      <Switch>
        <ProtectedRoute path = '/users'
                        component={UserList}
                        isLoggedIn={isLoggedIn}
                        users={users}
                        sortByIdHandler = {sortByIdHandler}
                        setIsSortedUp={setIsSortedUp}
                        isSortedUp={isSortedUp} 
                        setSearchFormData={setSearchFormData} 
                        searchFormData={searchFormData} />
        {isLoggedIn && <Route path='' 
                component={WrongPath}
                history={history} />}
      </Switch>
      <NotificationPopup isPopupShowed={isPopupShowed}
                         hidePopupHandler={hidePopupHandler}
                         isActionOk={isActionOk}
                         message={popupMessage} />
    </div>
  );
};

export default App;
