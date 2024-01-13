import { HttpError } from '../../../src/exceptions/httpError';
import usersController from '../../../src/users/users.controller';
import { Response, type Request } from 'express';
import usersService from '../../../src/users/users.service';

describe('Users controllers tests', () => {
    describe('sayHello', () => {
        it('should throw 400 if username is not provided', () => {
            const mReq = { query: { username: null } } as unknown as Request;
            const mRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            expect(() => usersController.greeting(mReq, mRes)).toThrow(
                HttpError,
            );
            expect(mRes.send).toHaveBeenCalledTimes(0);
        });

        it('should get hello string and send response correctly', async () => {
            const mHello = 'Hello John!';
            jest.spyOn(usersService, 'greeting').mockReturnValue(mHello);

            const mReq = { query: { username: mHello } } as unknown as Request;
            const mRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            usersController.greeting(mReq, mRes);

            expect(usersService.greeting).toHaveBeenCalledWith(mHello);
            expect(mRes.status).toHaveBeenCalledWith(200);
            expect(mRes.send).toHaveBeenCalledWith(mHello);
            expect(mRes.send).toHaveBeenCalledTimes(1);
        });
    });
});
