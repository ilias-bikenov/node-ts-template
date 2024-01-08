import express from 'express';
import usersController from './users/users.controller';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/hello', usersController.greeting);

app.use((err, req, res, next) => {
    console.log(err);

    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message || 'Internal server error',
        },
    });
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
