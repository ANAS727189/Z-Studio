import express from "express";
import { compileZLang } from "../controllers/z-lang.controllers.js";
import rateLimit from 'express-rate-limit';
import { zLangSchema } from "../schema/z-lang.zod.schema.js";
import { validate } from "../middlewares/validate.zod.middleware.js";

const router = express.Router();

const zLangLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    error: 'Too many Z-- lang compile requests. Please try again in a minute.',
  },
});

router.post('/compile', zLangLimiter, validate(zLangSchema), compileZLang);

export default router;
