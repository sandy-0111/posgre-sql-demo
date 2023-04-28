const userPayload = (payload) => {
    const { firstName, lastName, email } = payload

    const _payload = {
        "user_firstname": firstName,
        "user_lastname": lastName,
        "user_email": email
    }
    return _payload;
}

export { userPayload }