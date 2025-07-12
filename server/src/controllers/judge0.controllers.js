import { compileWithJudge0 } from '../services/judge0.service.js';
import { JUDGE0_BASE_URL, judge0Headers } from "../config/judge0.config.js";
import axios from 'axios';

export const compileCode = async (req, res, next) => {
  try {
    const output = await compileWithJudge0(req.body);
    res.json({ success: true, output });
  } catch (err) {
    next(err);
  }
};

export const checkJudge0Status = async (req, res, next) => {
  try {
    const response = await axios.get(`${JUDGE0_BASE_URL}/about`, { headers: judge0Headers });
    res.json({ success: true, data: response.data });
  } catch (err) {
    next(err);
  }
};