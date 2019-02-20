export class ApplicationError extends Error {
    public code: number;
    constructor(status: { code: number; message: string }) {
        super();
        this.name = this.constructor.name;
        this.message = status.message;
        this.code = status.code;
    }
}
