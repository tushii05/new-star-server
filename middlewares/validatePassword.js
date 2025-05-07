function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
    } else if (!passwordRegex.test(password)) {
        throw new Error('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, with no spaces allowed.');
    }
}

module.exports = { validatePassword }