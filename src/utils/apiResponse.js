class ApiResponse {
    constructor(statusCode, message, data, status) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    createResSuccess(res) {
        res.status(this.statusCode).json({
            status: this.status,
            message: this.message,
            data: this.data,
            statusCode: this.statusCode,
        });
    }
    createResError(res) {
        res.status(this.statusCode).json({
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            status: this.status,
        });
    }
}
module.exports = ApiResponse;
