import express from "express";
import { compileCode, checkJudge0Status } from "../controllers/judge0.controllers.js";
import rateLimit from 'express-rate-limit';
import { judge0Schema } from "../schema/judge0.zod.schema.js";
import { validate } from "../middlewares/validate.zod.middleware.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const judge0Limiter = rateLimit({
  windowMs: process.env.WINDOW_MS,
  max: process.env.MAX_WINDOW_MS,
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
  },
});

router.post('/compile', judge0Limiter, validate(judge0Schema), compileCode);
router.get('/system-info', judge0Limiter, checkJudge0Status);


export default router;
