const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Story = require('./models/Story');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/snapstory_dev', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Sample data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Story.deleteMany();

    // Create test users with hashed passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = await User.create([
      {
        email: 'author1@example.com',
        password: hashedPassword
      },
      {
        email: 'author2@example.com', 
        password: hashedPassword
      }
    ]);

    // Create test stories
    await Story.create([
      {
        title: 'The Lost Kingdom',
        content: 'Once upon a time...',
        genre: 'Fantasy',
        author: users[0]._id
      },
      {
        title: 'Space Odyssey',
        content: 'In the year 2150...',
        genre: 'Sci-Fi',
        author: users[1]._id
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedData();