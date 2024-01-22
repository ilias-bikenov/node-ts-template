export const errorHandler = (err, req, res, next) => {
    console.log(err);

    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message || 'Internal server error',
    });
};
