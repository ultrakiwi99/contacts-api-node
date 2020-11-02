

export default function makeContact(
    contactInfo = requiredParam(contactInfo)
) {
    const validContact = validate(contactInfo);
    const normalContact = normalize(validContact);
    return Object.freeze(normalContact);
}

function validate({
    firstName = requiredParam('firstName'),
    lastName = requiredParam('lastName'),
    emailAddess = requiredParam('emailAddress'),
    ...otherInfo
} = {}) {
    validateName('first', firstName);
    validateName('last', lastName);
    validateEmail(emailAddess);
    return { firstName, lastName, emailAddess, ...otherInfo };
}

function validateName(label, name) {
    if (name.length < 2) {
        throw new InvalidPropertyError(
            `A contact's ${label} name must be at least 2 characters long.`
        );
    }
}

function validateEmail(emailAddess) {
    if (!isValidEmail(emailAddess)) {
        throw new InvalidPropertyError('Invalid contact email address.');
    }
}