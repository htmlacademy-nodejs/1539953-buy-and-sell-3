'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const path = require(`path`);

// Reads file with extended optional functionality
class FileReader {
  constructor({filePath, truncateEmptyLines = true, compressFile = false, useProjectRoot = false}) {
    this._filePath = filePath;
    this._truncateEmptyLines = truncateEmptyLines;
    this._compressFile = compressFile;
    this._useProjectRoot = useProjectRoot;
  }

  // Always returns an array with file contents
  async read() {
    try {
      const targetPath = this._getTargetPath();
      const fileContent = await fs.readFile(targetPath, `utf-8`);

      const linesArray = this._getLinesArray(fileContent);
      const linesArrayNoEmpty = this._getLinesNoEmpty(linesArray);

      return this._getLinesCompressed(linesArrayNoEmpty);
    } catch (error) {
      console.error(chalk.red(error));
      return [];
    }
  }

  // Returns target file path
  _getTargetPath() {
    return this._useProjectRoot ? this._filePath : FileReader.getPathFromAppRoot(this._filePath);
  }

  // Returns file content as an array of it lines
  _getLinesArray(fileContent) {
    return fileContent.split(`\n`);
  }

  // Returns file content without empty strings if specified
  _getLinesNoEmpty(fileContent) {
    if (this._truncateEmptyLines) {
      return fileContent.filter((line) => line !== ``);
    }

    return fileContent;
  }

  // Returns file content as an array with single string element if specified
  _getLinesCompressed(fileContent) {
    if (this._compressFile) {
      const compressedFileContent = fileContent.map((line) => line.trim()).join(``);
      return Array.from(compressedFileContent);
    }

    return fileContent;
  }

  // Returns path to main executable file
  static getAppRoot() {
    return path.dirname(require.main.filename);
  }

  // Returns path specified path to file from app root
  static getPathFromAppRoot(filePath) {
    const appRootPath = FileReader.getAppRoot();
    return appRootPath + filePath;
  }
}

module.exports = {FileReader};
