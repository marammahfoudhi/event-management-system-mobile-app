import validate from "validate.js";

export const validateString = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
            message: "Value can't be blank."
        }
    };

    const validateResult = validate({ [id]: value }, { [id]: constraints });
    return validateResult && validateResult[id];
};

export const validateEmail = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
            message: "Email can't be blank."
        },
        email: {
            message: "is not a valid email address"
        }
    };

    const validateResult = validate({ [id]: value }, { [id]: constraints });
    return validateResult && validateResult[id];
};

export const validatePassword = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
            message: "Password can't be blank."
        },
        length: {
            minimum: 6,
            message: "must be at least 6 characters"
        }
    };

    const validateResult = validate({ [id]: value }, { [id]: constraints });
    return validateResult && validateResult[id];
};
