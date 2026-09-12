# X Post Management Agent

A production-ready AI-powered X (Twitter) post management application built with React, Express, MongoDB, and Gemini AI.

## Phase 1 Included

- React front-end with Vite
- Express.js API backend
- MongoDB + Mongoose integration
- JWT authentication with bcrypt password hashing
- Protected dashboard route
- Initial dashboard UI
- Environment variable template
- Project structure for future phases

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- AI: Google Gemini API
- Social Platform: X API
- Authentication: JWT
- Password hashing: bcryptjs
- Environment variables: dotenv

## Project Structure

```text
.
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
├── server/
│   ├── package.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── workers/
│       └── server.js
├── .env.example
├── .gitignore
├── README.md
└── package.json (optional root scripts if desired)
```

## Prerequisites

- Node.js 18+
- MongoDB running locally or reachable via connection string
- A Gemini API key
- An X developer account with API credentials if you plan to connect X later

## Local Setup

1. Clone the repository.
2. Copy `.env.example` to `.env` and update the values.
3. Install client dependencies:

```bash
cd client
npm install
```

4. Install server dependencies:

```bash
cd ../server
npm install
```

5. Start MongoDB.
6. Start the backend:

```bash
cd server
npm run dev
```

7. Start the frontend:

```bash
cd client
npm run dev
```

## Available API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Posts

- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`
- `POST /api/posts/generate`
- `POST /api/posts/improve`

### Health

- `GET /api/health`

## Notes

- The frontend currently uses a mock dashboard and placeholder data for Phase 1.
- Authentication is implemented and protected routes are enabled.
- The X API, Gemini API, scheduling, AI agent tools, and post management features are intentionally not yet implemented.
- The project is structured so those features can be added incrementally in future phases.

## Next Phase

Once this Phase 1 setup is complete, the next phase would add:

- post models and CRUD APIs
- AI post generation integration
- scheduled post worker
- X account connection flow
- improved dashboard data
