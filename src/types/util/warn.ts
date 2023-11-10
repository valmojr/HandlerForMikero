export default class Logger {
    log = (message: string): void => {
        console.log(`\x1b[34m[LOG] ${message}\x1b[0m`);
    }
    warn = (message: string): void => {
        console.log(`\x1b[33m[WARN] ${message}\x1b[0m`);
    }
    error = (message: string): void => {
        console.error(`\x1b[41m[ERROR] ${message}\x1b[0m`);
    }
}