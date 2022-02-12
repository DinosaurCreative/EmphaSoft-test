import { useState } from 'react';
import { Form, Field, SubmitButton, errorStatusHandler, errorMessageHandler } from '../../utils/Forms';
import { validators } from '../../utils/validators';
import { errors } from '../../utils/constants';

function Login ({ onSubmit }) {
  const [ usernameError, setUsernameError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);  
  
  function errorHandler(e) {
    if(e.target.name === 'username' && e.type === 'focus') return setUsernameError(true)
    if(e.target.name === 'username' && e.type === 'blur') return setUsernameError(false)
    if(e.type === 'focus') return setPasswordError(true);
    setPasswordError(false);
  }

  function submitHandler(data) {
    onSubmit(data)
  }

  return (
    <div className="login">
      <h1 className='login__title'>Authorization</h1>
      {
        <Form className='form'
              type='submit'
              onSubmit={submitHandler}
              validators={validators}>

          <Field type='text'
                 placeholder='Username'
                 name='username'
                 onFocus={errorHandler}
                 onBlur={errorHandler}>
            {(props) => <input {...props} className={`form__input ${errorStatusHandler(props) && 'form__input_error'}`}/>}
          </Field>
          
          <Field name='username'
                 errors={errors}
                 errorslist={{
                   required: errors.required,
                   maxLength: errors.maxLength,
                   nameFormatErr: errors.nameFormatErr,
                 }}>
            {(props) => <span {...props} className={`form__error-span ${usernameError && 'form__error-span_visible'}`}>{errorMessageHandler(props)}</span>}
          </Field> 
          
          <Field type='password'
                 placeholder='Password'
                 name='password_login'
                 onFocus={errorHandler}
                 onBlur={errorHandler}>
            {(props) => <input {...props} className={`form__input ${errorStatusHandler(props) && 'form__input_error'}`}/>}
          </Field>
          
          <Field name='password_login'
                 errors={errors}
                 errorslist={{
                   required: errors.required,
                   maxLength: errors.maxLength,
                 }}>
            {(props) => <span {...props} className={`form__error-span ${passwordError && 'form__error-span_visible'}`}>{errorMessageHandler(props)}</span>}
          </Field>
          <SubmitButton type='submit'>
            {(props) => <button {...props} className={!props.disabled ? 'form__submit-btn' : 'form__submit-btn_disabled'}>Signin</button>}
          </SubmitButton>
        </Form>
      }
    </div>
  )
}

export default Login;