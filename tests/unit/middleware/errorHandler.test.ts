import { Request, Response } from 'express';
import { HttpError } from '../../../src/exceptions/httpError';
import { errorHandler } from '../../../src/middleware/errorHandler';

describe('Erorr handler', () => {
    it('should send correct code if HTTP exception is passed', () => {
        const mReq = { query: { username: null } } as unknown as Request;
        const mRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const mErrorMessage = 'Message';
        const mErr = new HttpError(400, mErrorMessage);
        const mNext = {};

        errorHandler(mErr, mReq, mRes, mNext);

        const mErrObj = {
            errors: {
                message: mErrorMessage,
            },
        };

        expect(mRes.status).toHaveBeenCalledWith(400);
        expect(mRes.json).toHaveBeenCalledWith(mErrObj);
        expect(mRes.json).toHaveBeenCalledTimes(1);
    });

    it('should send 500 if not handled exception is passed', () => {
        const mReq = { query: { username: null } } as unknown as Request;
        const mRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const mErr = new Error();
        const mNext = {};

        errorHandler(mErr, mReq, mRes, mNext);

        const mErrObj = {
            errors: {
                message: 'Internal server error',
            },
        };

        expect(mRes.status).toHaveBeenCalledWith(500);
        expect(mRes.json).toHaveBeenCalledWith(mErrObj);
        expect(mRes.json).toHaveBeenCalledTimes(1);
    });
});
