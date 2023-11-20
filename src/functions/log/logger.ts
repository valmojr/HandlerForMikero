import fs from 'fs';
import path from 'path';

export default class Logger {
  private filePath: string;

  constructor(filePath?: string) {
    this.filePath = filePath || './logs/app.log';
    this.initializeLogFile();
  }

  private initializeLogFile() {
    const logsFolder = path.dirname(this.filePath);
    if (!fs.existsSync(logsFolder))
      fs.mkdirSync(logsFolder, { recursive: true });

    if (!fs.existsSync(this.filePath))
      fs.writeFileSync(this.filePath, '');
  }

  private async printOnLoggingFile(message: string) {
    try {
      await fs.promises.appendFile(this.filePath, `${message}\n`);
    } catch (error) {
      console.error(`Error writing to log file: ${error}`);
    }
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  public log = (message: string) => {
    const timestamp = this.getTimestamp();
    const messageString = `\x1b[34m [${timestamp}][LOG] ${message}\x1b[0m`;
    console.log(messageString);
    this.printOnLoggingFile(`[${timestamp}][LOG] - ${message}`);
    return messageString;
  };

  public warn = (message: string) => {
    const timestamp = this.getTimestamp();
    const messageString = `\x1b[33m [${timestamp}][WARN] ${message}\x1b[0m`;
    console.warn(messageString);
    this.printOnLoggingFile(`[${timestamp}][WARN] - ${message}`);
    return messageString;
  };

  public error = (message: Error | unknown | string) => {
    const timestamp = this.getTimestamp();
    const messageString = `\x1b[41m [${timestamp}][ERROR] ${message}\x1b[0m`;
    console.error(messageString);
    this.printOnLoggingFile(`[${timestamp}][ERROR] - ${message}`);
    return messageString;
  };
}