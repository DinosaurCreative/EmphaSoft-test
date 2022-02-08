import { useState } from 'react';
import { Form, Field, SubmitButton, errorStatusHandler, errorMessageHandler } from '../../utils/Forms';
import { validators } from '../../utils/validators';
import { errors } from '../../utils/constants';
function Login () {
  const [ userError, setUserError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);  
  const [ userData, setUserData ] = useState({ password: '', name: '' });

  function errorHandler(e) {
    if(e.target.name=== 'name' && e.type === 'focus') return setUserError(true)
    if(e.target.name=== 'name' && e.type === 'blur') return setUserError(false)
    if(e.type === 'focus') return setPasswordError(true);
    setPasswordError(false);
  }

  function submitHandler(data) {
    setUserData(data);
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
                 name='name'
                 onFocus={errorHandler}
                 onBlur={errorHandler}>
            {(props) => <input {...props} className={`form__input ${errorStatusHandler(props) && 'form__input_error'}`}/>}
          </Field>
          
          <Field name='name'
                 errors={errors}
                 errorslist={{
                   required: errors.required,
                   maxLength: errors.maxLength,
                   nameFormatErr: errors.nameFormatErr,
                 }}>
            {(props) => <span {...props} className={`form__error-span ${userError && 'form__error-span_visible'}`}>{errorMessageHandler(props)}</span>}
          </Field> 
          
          <Field type='password'
                 placeholder='Password'
                 name='password'
                 onFocus={errorHandler}
                 onBlur={errorHandler}>
            {(props) => <input {...props} className={`form__input ${errorStatusHandler(props) && 'form__input_error'}`}/>}
          </Field>
          
          <Field name='password'
                 errors={errors}
                 errorslist={{
                   required: errors.required,
                   maxLength: errors.maxLength,
                   passFormatError: errors.passFormatError,
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