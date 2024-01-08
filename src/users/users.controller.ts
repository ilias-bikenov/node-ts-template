import { type Request, type Response } from 'express';
import usersService from './users.service';
import { HttpError } from '../exceptions/httpError';

class UsersController {
    greeting = (req: Request, res: Response) => {
        const { username } = req.query;

        if (typeof username !== 'string')
            throw new HttpError(400, 'Username is not provided');

        res.status(200).send(usersService.greeting(username));
    };
}

// in a big project should be moved to a DI container
export default new UsersController();
