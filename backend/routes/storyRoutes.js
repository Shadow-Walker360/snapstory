const express = require('express');
const router = express.Router();
const {
  getStories,
  getStory,
  createStory,
  updateStory,
  deleteStory,
  uploadAudio
} = require('../controllers/stories');
const { protect } = require('../middleware/auth');
const fileUpload = require('../middleware/fileUpload');

// Re-route into other resource routers
// router.use('/:storyId/reviews', reviewRouter);

router
  .route('/')
  .get(protect, getStories)
  .post(protect, createStory);

router
  .route('/:id')
  .get(protect, getStory)
  .put(protect, updateStory)
  .delete(protect, deleteStory);

router
  .route('/:id/audio')
  .put(protect, fileUpload, uploadAudio);

module.exports = router;