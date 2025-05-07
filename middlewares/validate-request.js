async function validateRequest(req, res, next, schema, type = 'body') {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    let dataToValidate;
    if (req.is('multipart/form-data')) {
        dataToValidate = req.body.fields || req.body || {};
    } else {
        dataToValidate = req.body || {};
    }
    const { error, value } = schema.validate(dataToValidate, options);
    if (error) {
        return res.status(400).json({ message: `Validation error: ${error.details.map(x => x.message).join(', ')}` });
    }
    req[type] = value;
    next();
}

async function validateQuery(req, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.query, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.query = value;
        next();
    }
}

module.exports = { validateRequest, validateQuery };
