import fs, { PathLike } from 'fs';

export default class Logger {
    private logFilePath: PathLike = process.env.log_dir == 'production' ? './logs/prod.log' : './logs/dev.log';

    constructor(logFilePath?: PathLike) {
      this.logFilePath = logFilePath || this.logFilePath;
    }

    public printOnLogFile = (message: string) => {
      try {
          (fs.existsSync(this.logFilePath)) ?
              fs.appendFileSync(this.logFilePath, `\n${message}`) :
              fs.writeFileSync(this.logFilePath, `\n${message}`);
        return true;
      } catch (error) {
        console.error(`Error printing log to ${this.logFilePath}: ${error}`);
        return false;
      }
    };

    public log = (message: string) => {
        const messageString = `\x1b[34m[LOG] ${message}\x1b[0m`;
        console.log(messageString);
        if (!this.printOnLogFile(messageString)) 
            console.error(`Error printing log to ${this.logFilePath}`);

        return messageString;
    }
    public warn = (message: string) => {
        const messageString = `\x1b[33m[WARN] ${message}\x1b[0m`;
        console.log(messageString);
        if (!this.printOnLogFile(messageString)) 
            console.error(`Error printing log to ${this.logFilePath}`);

        return messageString;
    }
    public error = (message: Error | string) => {
        const messageString = `\x1b[41m[ERROR] ${message}\x1b[0m`;
        console.log(messageString);
        if (!this.printOnLogFile(messageString)) 
            console.error(`Error printing log to ${this.logFilePath}`);

        return messageString;
    }
}