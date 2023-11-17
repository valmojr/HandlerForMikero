export default class Logger {
    log = (message: Error | string) => {
        message = `\x1b[34m[LOG] ${message}\x1b[0m`;
        console.log(message);
        
        return message;
    }
    warn = (message: Error | string) => {
        message = `\x1b[33m[WARN] ${message}\x1b[0m`;
        console.log(message);
        
        return message;
    }
    error = (message: Error | string) => {
        message = `\x1b[41m[ERROR] ${message}\x1b[0m`;
        console.log(message);
        
        return message;
    }
}