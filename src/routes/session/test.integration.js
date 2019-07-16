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

describe('POST /gamesession', () => {
  it('returns 200 and stores data', async () => {
    const data = {
      sessions: [
        {
          gameId: 123,
          playerId: 123,
          plays: '1x-x2-x12-xx-1--x12',
          date: 1562961206,
          bet: 234
        },
        {
          gameId: 123,
          playerId: 123,
          plays: '1x-x2-x12-xx-1--x12',
          date: 1562961206,
          bet: 234
        }
      ]
    };

    const res = await testRequests.postGameSessions(data);
    expect(res.status).toBe(200);

    const sessions = await testQueries.findGameSession();
    expect(sessions).toHaveLength(2);
    expect(sessions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          bet: expect.any(Number),
          gameId: expect.any(Number),
          playerId: expect.any(Number),
          plays: expect.any(String)
        })
      ])
    );
  });
});

describe('GET /gamesession/playerId', () => {
  it('returns 200 and data', async () => {
    const data = {
      sessions: [
        {
          gameId: 123,
          playerId: 321,
          plays: '1x-x2-x12-xx-1--x12',
          date: 1562961206,
          bet: 234
        },
        {
          gameId: 123,
          playerId: 321,
          plays: '1x-x2-x12-xx-1--x12',
          date: 1562961206,
          bet: 234
        }
      ]
    };

    await testRequests.postGameSessions(data);

    const res = await testRequests.getGameSessions(321);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        plays: '1x-x2-x12-xx-1--x12',
        date: 1562961206000,
        gameId: 123
      },
      {
        plays: '1x-x2-x12-xx-1--x12',
        date: 1562961206000,
        gameId: 123
      }
    ]);
  });
});
