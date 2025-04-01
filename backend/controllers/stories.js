const Story = require('../models/Story');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// @desc    Get all stories
// @route   GET /api/v1/stories
// @access  Private
exports.getStories = asyncHandler(async (req, res, next) => {
  const stories = await Story.find({ author: req.user.id }).sort('-createdAt');
  res.status(200).json({ success: true, count: stories.length, data: stories });
});

// @desc    Get single story
// @route   GET /api/v1/stories/:id
// @access  Private
exports.getStory = asyncHandler(async (req, res, next) => {
  const story = await Story.findOne({ _id: req.params.id, author: req.user.id });

  if (!story) {
    return next(
      new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: story });
});

// @desc    Create story
// @route   POST /api/v1/stories
// @access  Private
exports.createStory = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.author = req.user.id;

  const story = await Story.create(req.body);
  res.status(201).json({ success: true, data: story });
});

// @desc    Update story
// @route   PUT /api/v1/stories/:id
// @access  Private
exports.updateStory = asyncHandler(async (req, res, next) => {
  let story = await Story.findById(req.params.id);

  if (!story) {
    return next(
      new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is story owner
  if (story.author.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this story`,
        401
      )
    );
  }

  story = await Story.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: story });
});

// @desc    Delete story
// @route   DELETE /api/v1/stories/:id
// @access  Private
exports.deleteStory = asyncHandler(async (req, res, next) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    return next(
      new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is story owner
  if (story.author.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this story`,
        401
      )
    );
  }

  await story.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Upload audio for story
// @route   PUT /api/v1/stories/:id/audio
// @access  Private
exports.uploadAudio = asyncHandler(async (req, res, next) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    return next(
      new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is story owner
  if (story.author.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this story`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Check if audio
  if (!file.mimetype.startsWith('audio')) {
    return next(new ErrorResponse(`Please upload an audio file`, 400));
  }

  // Create custom filename
  file.name = `audio_${story._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Story.findByIdAndUpdate(req.params.id, {
      audioFile: file.name,
      readingMode: 'audio'
    });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});