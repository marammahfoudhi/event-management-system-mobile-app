


export const validateString = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false
        }
    };

    if (value !== "") {
        constraints.format = {
            pattern: ".+",
            flags: "i",
            message: "Value can't be blank."
        }
    }

    
}

export const validateEmail = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false
        }
    };

    if (value !== "") {
        constraints.email = true
    };

}

export const validatePassword = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false
        }
    };

    if (value !== "") {
        constraints.length = {
            minimum: 6,
            message: "must be at least 6 characters"
        }
    };

    
}
