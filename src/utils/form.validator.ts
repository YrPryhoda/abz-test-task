import validator from 'validator';

class FormValidator {

    fieldLength(field: string, min: number, max: number) {
        return field.length >= min && field.length <= max;
    }

    isUaPhone(field: string) {
        const reg = /^[+]{0,1}380([0-9]{9})$/g;
        return reg.test(field);
    }

    isEmail(field: string) {
        return validator.isEmail(field);
    }

    isEmpty(field: string) {
        return validator.isEmpty(field)
    }
}


export const formValidator = new FormValidator();