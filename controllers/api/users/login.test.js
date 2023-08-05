const { Request, Response } = require('jest-express');
const loginController = require('./login');
const { getUserByEmail } = require('../../../services/usersService');

jest.mock('../../../services/usersService');

describe('Login Controller Test', () => {
  let req;
  let res;

  beforeEach(() => {
    req = new Request();
    res = new Response();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 200, token and a user with email and subscription fields', async () => {
    const mockUser = {
      email: 'test@test.com',
      subscription: 'pro',
      validPassword: jest.fn().mockReturnValue(Promise.resolve(true)),
      assignToken: jest.fn().mockReturnValue('test_token'),
    };

    getUserByEmail.mockReturnValue(Promise.resolve(mockUser));

    req.setBody({ email: mockUser.email, password: 'test_password' });

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      token: mockUser.assignToken(),
      user: {
        email: mockUser.email,
        subscription: mockUser.subscription,
      },
    });
  });
});
