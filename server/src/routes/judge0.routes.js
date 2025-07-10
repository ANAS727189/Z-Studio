import express from "express";
import { compileCode, checkJudge0Status } from "../controllers/judge0.controllers.js";
import rateLimit from 'express-rate-limit';
import { judge0Schema } from "../schema/judge0.zod.schema.js";
import { validate } from "../middlewares/validate.zod.middleware.js";

const router = express.Router();

const judge0Limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,             // max 10 requests per minute per IP
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
  },
});

router.post('/compile', judge0Limiter, validate(judge0Schema), compileCode);
router.get('/status', judge0Limiter, checkJudge0Status);


export default router;
