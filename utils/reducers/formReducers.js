export const initialState = {
    inputValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    inputValidities: {
      fullName: false,
      email: false,
      password: false,
      confirmPassword: false
    },
    formIsValid: false,
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        const updatedValues = {
          ...state.inputValues,
          [action.inputId]: action.inputValue
        };
        const updatedValidities = {
          ...state.inputValidities,
          [action.inputId]: action.validationResult
        };
  
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
          updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
  
        return {
          ...state,
          inputValues: updatedValues,
          inputValidities: updatedValidities,
          formIsValid: updatedFormIsValid
        };
      default:
        return state;
    }
  };
  