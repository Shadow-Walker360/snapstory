# SnapStory

A full-stack application for creating and sharing visual stories.

## Features

- User authentication (login/register)
- Create, edit, and delete stories
- Upload images for stories
- Responsive design with Tailwind CSS
- Dockerized deployment

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API calls
- React Context for state management

### Backend
- Node.js/Express
- MongoDB (Mongoose ODM)
- JWT authentication
- File upload handling

### AI Service
- Python
- Web scraping capabilities
- Story generation models

## Setup

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- Docker (optional)
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shadow-Walker360/snapstory.git
cd snapstory
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend && npm install
cd ..

# Install frontend dependencies
cd frontend && npm install
cd ..

# Install AI service dependencies
cd ai_service && pip install -r requirements.txt
```

3. Set up environment variables:
Create `.env` files in:
- `backend/.env`
- `frontend/.env`
- `ai_service/.env`

4. Start the development servers:
```bash
# Start backend
cd backend && npm run dev

# Start frontend (in another terminal)
cd frontend && npm start

# Start AI service (in another terminal)
cd ai_service && python main.py
```

## Docker Setup

```bash
docker-compose up --build
```

## API Documentation

See the [API docs](backend/API_DOCS.md) for detailed endpoint information.

## License

MIT