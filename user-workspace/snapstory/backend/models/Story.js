const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  genre: {
    type: String,
    required: [true, 'Please select a genre'],
    enum: [
      'Fantasy',
      'Sci-Fi',
      'Mystery',
      'Thriller',
      'Romance',
      'Horror',
      'Adventure',
      'Historical',
      'Biography',
      'Poetry',
      'Other'
    ]
  },
  readingMode: {
    type: String,
    enum: ['text', 'audio', 'animation'],
    default: 'text'
  },
  audioEmotion: {
    type: String,
    enum: ['neutral', 'happy', 'sad', 'angry', 'excited', 'calm'],
    default: 'neutral'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update the updatedAt field on save
StorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Story', StorySchema);