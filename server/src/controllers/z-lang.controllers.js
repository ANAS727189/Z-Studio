import { runZLangCompiler } from '../services/z-lang.service.js';

export const compileZLang = async (req, res, next) => {
  try {
    const output = await runZLangCompiler(req.body.code);
    res.json({ success: true, output });
  } catch (err) {
    next(err);
  }
};
