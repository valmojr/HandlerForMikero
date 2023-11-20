import Logger from './logger';
import fs from 'fs';
import path from 'path';

describe('LOGGING TESTS', () => {
  const logFilePath = './logs/test.log';
  const logger = new Logger(logFilePath);

  describe('File Printing Tests', () => {
    afterAll(() => {
       deleteFolderRecursive(logsFolder);
    });
    
    function deleteFolderRecursive(folderPath: string): void {
        if (fs.existsSync(folderPath)) {
          fs.readdirSync(folderPath).forEach(file => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
              deleteFolderRecursive(curPath);
            } else {
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(folderPath);
        }
    }

    it('should create the log file if it doesn\'t exist', () => {
      const testFilePath = './logs/nonexistent.log';
      const testLogger = new Logger(testFilePath);

      expect(fs.existsSync(testFilePath)).toBe(true);
    });

    it('should create the log file in a custom filepath if provided', () => {
      expect(fs.existsSync(logFilePath)).toBe(true);
    });

    it('should check if the log file already exists', () => {
      const testFilePath = './logs/existing.log';
      fs.writeFileSync(testFilePath, 'Existing Log File');

      const testLogger = new Logger(testFilePath);

      expect(fs.existsSync(testFilePath)).toBe(true);
    });

    it('should print to the file after the file checking passed', async () => {
        const message = 'Test log message';
        const testLogger = new Logger(testFilePath);

        testLogger.log(message);
  
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        const fileContent = fs.readFileSync(testFilePath, 'utf-8');
  
        expect(fileContent).toContain(message);
      });
  });

  describe('Console Printing Tests', () => {
    it('should print log on screen when log function called', () => {
      const message = 'Test Log message';

      const consoleLogSpy = jest.spyOn(console, 'log');
      const result = logger.log(message);

      expect(result).toContain('[LOG]');
      expect(result).toContain(message);
      expect(result).toContain('\x1b[34m');
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[LOG]'));
    });

    it('should print warn on screen when warn function called', () => {
      const message = 'Test Warn message';

      const consoleWarnSpy = jest.spyOn(console, 'warn');
      const result = logger.warn(message);

      expect(result).toContain('[WARN]');
      expect(result).toContain(message);
      expect(result).toContain('\x1b[33m');
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('[WARN]'));
    });

    it('should print error on screen when error function called', () => {
      const errorMessage = 'Test log message';
      const error = new Error(errorMessage);

      const consoleErrorSpy = jest.spyOn(console, 'error');
      const result = logger.error(error);

      expect(result).toContain('[ERROR]');
      expect(result).toContain(errorMessage);
      expect(result).toContain('\x1b[41m');
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    });
  });
});