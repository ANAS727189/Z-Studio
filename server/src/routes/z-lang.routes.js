import express from "express";
import { compileZLang } from "../controllers/z-lang.controllers.js";
import rateLimit from 'express-rate-limit';
import { zLangSchema } from "../schema/z-lang.zod.schema.js";
import { validate } from "../middlewares/validate.zod.middleware.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const zLangLimiter = rateLimit({
  windowMs: process.env.WINDOW_MS,
  max: process.env.MAX_WINDOW_MS,
  message: {
    success: false,
    error: 'Too many Z-- lang compile requests. Please try again in a minute.',
  },
});

router.post('/compile', zLangLimiter, validate(zLangSchema), compileZLang);

export default router;
