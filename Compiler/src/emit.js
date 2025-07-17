import fs from 'fs';

class Emitter {
  constructor(fullPath) {
    this.fullPath = fullPath;
    this.header = '';
    this.code = '';
  }

  emit(code) {
    this.code += code;
  }

  emitLine(code) {
    this.code += code + '\n';
  }

  headerLine(code) {
    this.header += code + '\n';
  }

  writeFile() {
    fs.writeFileSync(this.fullPath, this.header + this.code);
  }
}

export {Emitter}