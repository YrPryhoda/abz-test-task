import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

class FormValidator {
  fieldLength(field: string, min: number, max: number) {
    return field.length >= min && field.length <= max;
  }

  isUaPhone(field: string) {
    const reg = /^[+]{0,1}380([0-9]{9})$/g;
    return reg.test(field);
  }

  isEmail(field: string) {
    return isEmail(field);
  }

  isEmpty(field: string) {
    return isEmpty(field);
  }
}

export const formValidator = new FormValidator();
