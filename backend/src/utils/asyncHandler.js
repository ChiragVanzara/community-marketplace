const asyncHandler = (requestHanlder) => {
    return (req, res, next) => {
        Promise.resolve(requestHanlder(req, res, next)).catch((error) => next(error))
    }
}

export { asyncHandler };