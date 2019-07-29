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

describe('POST /pos', () => {
  describe('super-user', () => {
    let token;
    beforeAll(async () => {
      const loginRes = await testRequests.login({
        username: 'javier',
        password: 'password'
      });
      token = loginRes.text;
    });

    it('returns 200 and stores the pos', async () => {
      const posData = {
        name: 'pos-location-x',
        description: 'pos located on x'
      };

      const res = await testRequests.createPos(token, posData);

      expect(res.status).toBe(200);

      const [pos] = await testQueries.findPos({
        name: 'pos-location-x'
      });

      expect(pos).toBeDefined();
    });
  });

  describe('admin-user', () => {
    let token;
    beforeAll(async () => {
      const loginRes = await testRequests.login({
        username: 'javier',
        password: 'password'
      });
      token = loginRes.text;

      const newUserData = {
        username: 'user-1',
        password: 'password',
        permission: 1
      };

      await testRequests.createUser(token, newUserData);
      const loginRes1 = await testRequests.login({
        username: 'user-1',
        password: 'password'
      });
      token = loginRes1.text;
    });

    it('returns 200 and stores the pos and assigns to user.', async () => {
      const posData = {
        name: 'pos-location-y',
        description: 'pos located on x'
      };

      const res = await testRequests.createPos(token, posData);

      expect(res.status).toBe(200);

      const [pos] = await testQueries.findPos({
        name: 'pos-location-y'
      });
      expect(pos).toBeDefined();

      const [userPos] = await testQueries.findUserPos({
        posId: pos.rowid
      });

      expect(userPos).toBeDefined();
    });
  });
});

describe('POST /pos/assign', () => {
  describe('super-user', () => {
    let token;
    beforeAll(async () => {
      const loginRes = await testRequests.login({
        username: 'javier',
        password: 'password'
      });
      token = loginRes.text;

      const newUserData = {
        username: 'user-2',
        password: 'password',
        permission: 1
      };

      await testRequests.createUser(token, newUserData);
      await testRequests.createPos(token, {
        name: 'pos-location-z',
        description: 'pos located on z'
      });
    });

    it('assigns the pos to the selected user', async () => {
      const [user] = await testQueries.findUser({
        username: 'user-2'
      });

      const [pos] = await testQueries.findPos({
        name: 'pos-location-z'
      });

      const res = await testRequests.assignPos(token, {
        userId: user.rowid,
        posId: pos.rowid
      });

      expect(res.status).toBe(200);

      const [userPos] = await testQueries.findUserPos({
        userId: user.rowid,
        posId: pos.rowid
      });

      expect(userPos).toBeDefined();
    });

    it('responds 400 if user or pos do not exist', async () => {
      const [user] = await testQueries.findUser({
        username: 'user-2'
      });

      const [pos] = await testQueries.findPos({
        name: 'pos-location-z'
      });

      const res = await testRequests.assignPos(token, {
        userId: 1234,
        posId: pos.rowid
      });

      expect(res.status).toBe(400);

      const res1 = await testRequests.assignPos(token, {
        userId: user.rowid,
        posId: 1234
      });

      expect(res1.status).toBe(400);
    });
  });
  describe('admin-user', () => {});
});
