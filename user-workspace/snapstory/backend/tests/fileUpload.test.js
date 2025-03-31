const path = require('path');
const fs = require('fs');
const request = require('supertest');
const app = require('../server');
const Story = require('../models/Story');
const User = require('../models/User');

describe('File Upload Middleware', () => {
  let authToken;
  let testUser;
  let testStory;
  const testAudioPath = path.join(__dirname, 'test-audio.mp3');

  beforeAll(async () => {
    // Create test user
    testUser = await User.create({
      email: 'uploadtest@example.com',
      password: 'password123'
    });
    authToken = testUser.getSignedJwtToken();

    // Create test story
    testStory = await Story.create({
      title: 'Upload Test Story',
      content: 'Test content',
      genre: 'Fantasy',
      author: testUser._id
    });

    // Create a dummy test audio file
    fs.writeFileSync(testAudioPath, 'dummy audio content');
  });

  afterAll(async () => {
    // Clean up
    await User.deleteMany();
    await Story.deleteMany();
    if (fs.existsSync(testAudioPath)) {
      fs.unlinkSync(testAudioPath);
    }
  });

  describe('PUT /api/stories/:id/audio', () => {
    it('should upload audio file for a story', async () => {
      const res = await request(app)
        .put(`/api/stories/${testStory._id}/audio`)
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', testAudioPath);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);

      // Verify story was updated
      const updatedStory = await Story.findById(testStory._id);
      expect(updatedStory.audioFile).toBeTruthy();
      expect(updatedStory.readingMode).toEqual('audio');
    });

    it('should reject non-audio files', async () => {
      const testTextPath = path.join(__dirname, 'test.txt');
      fs.writeFileSync(testTextPath, 'dummy text');

      const res = await request(app)
        .put(`/api/stories/${testStory._id}/audio`)
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', testTextPath);

      expect(res.statusCode).toEqual(400);

      fs.unlinkSync(testTextPath);
    });

    it('should enforce file size limit', async () => {
      // Create a large dummy file (>25MB)
      const largeFilePath = path.join(__dirname, 'large-audio.mp3');
      const largeFile = Buffer.alloc(26 * 1024 * 1024); // 26MB
      fs.writeFileSync(largeFilePath, largeFile);

      const res = await request(app)
        .put(`/api/stories/${testStory._id}/audio`)
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', largeFilePath);

      expect(res.statusCode).toEqual(400);

      fs.unlinkSync(largeFilePath);
    });
  });
});