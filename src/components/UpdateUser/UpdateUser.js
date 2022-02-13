import { Form, Field, SubmitButton, errorStatusHandler, errorMessageHandler } from '../../utils/Forms';
import { validators } from '../../utils/validators';
import { errors } from '../../utils/constants';
import { useState } from 'react';

function UpdateUser({ updateUserHandler, userForUpdate }) {
  const [ usernameError, setUsernameError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);
  const [ lastNameError, setLastNameError ] = useState(false);
  const [ firstNameError, setFirstNameError ] = useState(false);
  const inputErrorhandler = {
    'username': (action) => {
      setUsernameError(action);
    },
    'password': (action) => {
      setPasswordError(action);
    },
    'first_name': (action) => {
      setFirstNameError(action);
    },
    'last_name': (action) => {
      setLastNameError(action);
    },
    defineAction(e) {
      if (e.type ==='focus') {
        this[e.target.name](true);
      } else if(e.type === 'blur') {
        this[e.target.name](false);
      };
    },
  };

  function submitHandler(data) {
    updateUserHandler({...data, id: +localStorage.getItem('idForUpdate')}, userForUpdate.index);
  };

  function errorHandler(e) {
    inputErrorhandler.defineAction(e);
  };
  
  return (
    <div className='update-user'>
      <h2 className='update-user__title'>Update user</h2>
      <Form className='form'
             type='submit'
             onSubmit={submitHandler}
             validators={validators} >
         <Field name='first_name'
                onFocus={errorHandler}
                onBlur={errorHandler}
                placeholder={userForUpdate.first_name ? userForUpdate.first_name : 'First name'} >
           {(props) => <input {...props} className={`form__input ${errorStatusHandler(props) && 'form__input_error'}`}/>}
         </Field>
         <Field name='first_name'
                errorslist={{
                  nameFormatErr: errors.nameFormatErr,
                  maxLength: errors.maxLength,
                }} >
         {(props) => <span {...props} className={`form__error-span  form__error-span_place_create-user ${firstNameError && 'form__error-span_visible'}`}>{errorMessageHandler(props)}</span>}
         </Field>
         <Field name='last_name'
                onFocus={errorHandler}
                onBlur={errorHandler}
                placeholder={userForUpdate.last_name ? userForUpdate.last_name : 'Last name'} >
           {(props) => <input {...props} className={`form__input ${errorStatusHandler(props) && 'form__input_error'}`}/>}
         </Field>
         <Field name='last_name'
                errorslist={{
                  nameFormatErr: errors.nameFormatErr,
                  maxLength: errors.maxLength,
                 }} >
         {(props) => <span {...props} className={`form__error-span  form__error-span_place_create-user ${lastNameError && 'form__error-span_visible'}`}>{errorMessageHandler(props)}</span>}
         </Field>
         <Field type='text'
                placeholder={userForUpdate.username ? userForUpdate.username :'Username'}
                name='username'
                onFocus={errorHandler}
                onBlur={errorHandler} >
          {(props) => <input {...props} className={`form__input ${errorStatusHandler(props) && 'form__input_error'}`}/>}
         </Field>
         
         <Field name='username'
                errorslist={{
                  required: errors.required,
                  maxLength: errors.maxLength,
                  nameFormatErr: errors.nameFormatErr,
                }} >
          {(props) => <span {...props} className={`form__error-span  form__error-span_place_create-user ${usernameError && 'form__error-span_visible'}`}>{errorMessageHandler(props)}</span>}
         </Field>
         <Field type='password'
                name='password'
                placeholder='Password'
                onFocus={errorHandler}
                onBlur={errorHandler} >
           {(props) => <input {...props} className={`form__input ${errorStatusHandler(props) && 'form__input_error'}`}/>}
         </Field>
         <Field name='password'
                errorslist={{
                  required: errors.required,
                  maxLength: errors.maxLength,
                  passFormatError: errors.passFormatError,
                  passMinLength: errors.passMinLength,
                }} >
           {(props) => <span {...props} className={`form__error-span  form__error-span_place_create-user ${passwordError && 'form__error-span_visible'}`}>{errorMessageHandler(props)}</span>}
         </Field>
         <SubmitButton>
           {(props) => <button {...props} className={!props.disabled ? 'form__submit-btn' : 'form__submit-btn_disabled'} >Create</button>}
         </SubmitButton>
       </Form>
    </div>
  );
};

export default UpdateUser;