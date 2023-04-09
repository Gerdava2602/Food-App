export const successResponse = (req, res, data, message='success',status = 200) => {
    return res.status(status).json({
        message,
        error: null,
        data,
    });
}

export const errorResponse = (req, res, error, status = 500) => {
    console.log(error);
    return res.status(status).json({
        message: "error",
        error: {
            message: error,
        },
        data: null,
    });
}
