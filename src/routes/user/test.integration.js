/* eslint-env node, jest */
const { destroy } = require('../../app.js');
const { resetDB } = require('../../scripts/runner.js');

const testRequests = require('../../utils/test-requests.js');
const testQueries = require('../../utils/test-queries.js');

beforeAll(async () => {
  await resetDB();
});

afterAll(async () => {
  await destroy();
});

describe('POST /user/', () => {
  describe('super-user', () => {
    let token;
    beforeAll(async () => {
      const loginRes = await testRequests.login({
        username: 'javier',
        password: 'password'
      });
      token = loginRes.text;
    });

    it('returns 422 if permission is incorrect', async () => {
      const newUserData = {
        username: 'user-1',
        password: 'password',
        permission: 69
      };

      const res = await testRequests.createUser(token, newUserData);
      expect(res.status).toBe(422);
    });

    it('returns 200 and store user', async () => {
      const newUserData = {
        username: 'user-1',
        password: 'password',
        permission: 1
      };

      const res = await testRequests.createUser(token, newUserData);
      expect(res.status).toBe(200);

      const [user] = await testQueries.findUser({
        username: 'user-1'
      });

      expect(user).toEqual(
        expect.objectContaining({
          username: 'user-1',
          permission: 1,
          balance: 0
        })
      );
    });
  });

  describe('admin-user', () => {
    let token;
    beforeAll(async () => {
      const loginRes = await testRequests.login({
        username: 'user-1',
        password: 'password'
      });
      token = loginRes.text;
    });

    it('returns 200 and store user ignoring permission field', async () => {
      const newUserData = {
        username: 'user-2',
        password: 'password',
        permission: 1
      };

      const res = await testRequests.createUser(token, newUserData);
      expect(res.status).toBe(200);

      const [user] = await testQueries.findUser({
        username: 'user-2'
      });

      expect(user).toEqual(
        expect.objectContaining({
          username: 'user-2',
          permission: 2,
          balance: 0
        })
      );
    });
  });
});

describe('POST /user/login', () => {
  it('returns 400 on user incorrect', async () => {
    const res = await testRequests.login({
      username: 'not-javier',
      password: 'password'
    });
    expect(res.status).toBe(401);
  });

  it('returns 400 on password incorrect', async () => {
    const res = await testRequests.login({
      username: 'javier',
      password: 'not-the-password'
    });
    expect(res.status).toBe(401);
  });

  it('returns 200 and jwt token', async () => {
    const res = await testRequests.login({
      username: 'javier',
      password: 'password'
    });

    expect(res.status).toBe(200);
    expect(res.text).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });
});
