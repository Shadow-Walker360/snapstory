process.env.NODE_ENV = 'test';

// Setup global test helpers
global.jest = require('jest');
global.expect = require('expect');
global.supertest = require('supertest');

// Load environment variables
require('dotenv').config({ path: './.env.test' });

// Mock MongoDB connection
jest.mock('./../config/db', () => ({
  connectDB: jest.fn().mockResolvedValue(true),
  disconnectDB: jest.fn().mockResolvedValue(true)
}));

// Clear all mocks between tests
afterEach(() => {
  jest.clearAllMocks();
});