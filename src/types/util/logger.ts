export default class Logger {
    log = (message: any) => {
        message = `\x1b[34m[LOG] ${message}\x1b[0m`;
        console.log(message);
        
        return message;
    }
    warn = (message: any) => {
        message = `\x1b[33m[WARN] ${message}\x1b[0m`;
        console.log(message);
        
        return message;
    }
    error = (message: any) => {
        message = `\x1b[41m[ERROR] ${message}\x1b[0m`;
        console.log(message);
        
        return message;
    }
}