const userPayload = (payload) => {
    const { user_firstname, user_lastname, user_email } = payload

    const _payload = {
        user_firstname,
        user_lastname,
        user_email
    }
    return _payload;
}

export { userPayload }