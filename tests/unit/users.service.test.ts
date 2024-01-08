import usersService from '../../src/users/users.service';

describe('Users tests', () => {
    describe('sayHello', () => {
        it('should return string with the name included', () => {
            expect(usersService.greeting('TestUser')).toEqual(
                'Hello TestUser!',
            );
        });
    });
});
