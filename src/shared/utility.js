export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.isName) {
    const pattern = /^[a-zA-Z ]{2,30}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isPhoneNumber) {
    const pattern = /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isDOB) {
    const pattern = /^\d{4}([./-])\d{2}\1\d{2}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isStreet) {
    const pattern = /^[a-zA-Z0-9\s,'-,'/]*$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isCity) {
    const pattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
