import express from 'express';
import usersController from './users/users.controller';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/hello', usersController.greeting);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
