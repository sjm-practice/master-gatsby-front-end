import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  const updateValue = (e) => {
    // check if it's a number and convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }

    setValues({
      // copy the existing values into state
      ...values,

      // update the value that changed
      [e.target.name]: value,
    });
  };

  return { values, updateValue };
};

export default useForm;
