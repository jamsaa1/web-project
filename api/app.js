import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import testRouter from "./routes/testRouter.js";
import movieRouter from "./routes/movieRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import authRouter from "./routes/authRouter.js";
import { pool } from './models/db.js'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.join(__dirname, "..", "dist");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PgSession = connectPgSimple(session);


if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET puuttuu')
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

app.use(session({
  store: new PgSession({
    pool: pool,
    createTableIfMissing: true
  }),
  name: 'moviety.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24
  }
}))


app.use("/api/tests", testRouter);
app.use("/api/reviews", reviewRouter);

app.use("/api/auth", authRouter);


 // Register TMDB movie routes.
app.use("/api/movies", movieRouter);

// Health check endpoint for database connectivity
app.get("/api/health", async (req, res) => {
  try {
    const { pool } = await import("./models/db.js");
    await pool.query("SELECT 1");
    res.status(200).json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

app.use("/api", (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use(express.static(frontendDist));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

app.use(errorHandler);

export default app;
