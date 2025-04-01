const request = require('supertest');
const app = require('../server');
const Story = require('../models/Story');
const User = require('../models/User');

describe('Story Controller', () => {
  let authToken;
  let testUser;

  beforeAll(async () => {
    // Create test user and get auth token
    testUser = await User.create({
      email: 'storytest@example.com',
      password: 'password123'
    });
    
    authToken = testUser.getSignedJwtToken();
  });

  afterEach(async () => {
    await Story.deleteMany();
  });

  afterAll(async () => {
    await User.deleteMany();
  });

  describe('POST /api/stories', () => {
    it('should create a new story with valid data', async () => {
      const res = await request(app)
        .post('/api/stories')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Story',
          content: 'This is a test story content',
          genre: 'Fantasy'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.author).toEqual(testUser._id.toString());
    });

    it('should return 401 when creating story without auth', async () => {
      const res = await request(app)
        .post('/api/stories')
        .send({
          title: 'Unauthorized Story',
          content: 'Should fail',
          genre: 'Fantasy'
        });

      expect(res.statusCode).toEqual(401);
    });

    it('should return 400 with missing required fields', async () => {
      const res = await request(app)
        .post('/api/stories')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          content: 'Missing title',
          genre: 'Fantasy'
        });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe('GET /api/stories', () => {
    it('should get all stories for authenticated user', async () => {
      // Create test stories
      await Story.create([
        {
          title: 'Story 1',
          content: 'Content 1',
          genre: 'Fantasy',
          author: testUser._id
        },
        {
          title: 'Story 2',
          content: 'Content 2',
          genre: 'Sci-Fi', 
          author: testUser._id
        }
      ]);

      const res = await request(app)
        .get('/api/stories')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
    });
  });
});