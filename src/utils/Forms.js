import { createContext, useCallback, useContext, useEffect, useState } from "react"
const FormContext = createContext({});

export const Form = ({ children, className, onSubmit, validators }) => {
  const [ formValues, setFormValues ] = useState({});
  const [ isFormInvalid, setIsFormInvailid ] = useState(true);
  const [ formErrors, setFormErrors ] = useState({});
  const onChangeInput = useCallback((name, value) => {
    setFormValues(prevVal => ({
      ...prevVal,
      [name]: value,
    }));
  }, []);

  const formContextValue = { 
    onChangeInput,
    isFormInvalid,
    formErrors,
    formValues,
  };

  function onSubmithandler(e) {
    e.preventDefault();
    onSubmit(formValues);
  };

  useEffect(() => {
    const formKeys = Object.keys(formValues);
    const allErrors = formKeys.map((key) => {
      if(!validators[key]) return;

      const valueByKey = formValues[key];
      
      const errors = Object.entries(validators[key]).map(([errorKey, validatorFn]) => {
        return { [errorKey]: validatorFn(valueByKey) }
      }).reduce((acc, err) => ({ ...acc, ...err }), {})
      return {[key]: errors}
    }).reduce((acc, item) => ({ ...acc, ...item }), {})
    
    setFormErrors(allErrors);

  }, [formValues, setFormErrors, validators]);
  
  useEffect(() => {
    for (let fieldKey in formErrors) {
      const keyErrors = formErrors[fieldKey];
      for (let errorKey in  keyErrors) {
        if (keyErrors[errorKey] === true) {
         return setIsFormInvailid(true);
        };
      };
    };
    setIsFormInvailid(false);
  }, [formErrors, setIsFormInvailid]);

  return (
    <form className={className}
          onSubmit={onSubmithandler}>
      <FormContext.Provider value={formContextValue} >
        {children}
      </FormContext.Provider>
    </form>
  );
};

export const Field = ({children, ...props }) => {
  const { onChangeInput, formErrors, formValues } = useContext(FormContext);
  const [ value, setValue ] = useState('');

  function onChangeHandler(e) {
    setValue(e.target.value);
  };
  
  useEffect(() => {
    onChangeInput(props.name, value);
  }, [props.name, value, onChangeInput]);
  return (
    children({ 
      ...props,
      onChange: onChangeHandler,
      errors: formErrors[props.name],
      values: formValues[props.name],
    })
  );
};

export const SubmitButton = ({ children, ...props }) => {
  const { isFormInvalid } = useContext(FormContext);
  return (
    children({...props, disabled: isFormInvalid })
  );
};

export const errorMessageHandler = (props) => {
  for (const name in props.errors) {
    if(props.errors[name]) {
      return props.errorslist[name];
    };
  };
};

export const errorStatusHandler = (props) => {
  for(const name in props.errors) {
    if(props.errors[name]) {
      return true;
    };
  };
  return false;
};