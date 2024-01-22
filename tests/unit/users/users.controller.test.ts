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
            const mNext = jest.fn();

            usersController.greeting(mReq, mRes, mNext);

            expect(mNext).toHaveBeenCalledTimes(1);
            expect(mRes.send).toHaveBeenCalledTimes(0);
        });

        it('should get hello string and send response correctly', () => {
            const mHello = 'Hello John!';
            jest.spyOn(usersService, 'greeting').mockReturnValue(mHello);

            const mReq = { query: { username: 'John' } } as unknown as Request;
            const mRes = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;
            const mNext = jest.fn();

            usersController.greeting(mReq, mRes, mNext);

            expect(usersService.greeting).toHaveBeenCalledWith('John');
            expect(mRes.status).toHaveBeenCalledWith(200);
            expect(mRes.send).toHaveBeenCalledWith(mHello);
            expect(mRes.send).toHaveBeenCalledTimes(1);
        });
    });
});
