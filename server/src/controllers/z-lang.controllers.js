import { runZLangCompiler } from '../services/z-lang.service.js';

export const compileZLang = async (req, res, next) => {
  try {
    const { compilerOutput, programOutput } = await runZLangCompiler(req.body.code);
    res.json({ success: true, compilerOutput, programOutput });
  } catch (err) {
    next(err);
  }
};
