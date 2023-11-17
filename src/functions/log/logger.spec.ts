import Logger from "./logger";

describe('LOGGING TESTS', () => {
    describe('Error Handling Tests', () => {
        it('should throw Warning when running dev env and could not find the output file', () => {
            expect(true).toBe(false);
        });
        it('should throw Warning when running prod env and could not find the output file', () => {
            expect(true).toBe(false);
        });
    });

    describe('File Printing Tests', () => {
        process.env.log_dir = 'production';
        it('should print on the dev log when running dev env', () => {
            expect(true).toBe(false);
        });
        it('should print on the prod log when running prod env', () => {
            expect(true).toBe(false);
        })
    });

    describe('Console Printing Tests', () => {
        const logger = new Logger();

        it('should print log on screen when log function called', () => {
            const message = new Error('Test log message');

            const result = logger.log(`${message}`); 

            expect(result).toContain('[LOG]');
            expect(result).toContain(`${message}`);
            expect(result).toContain('\x1b[34m');
        });
        it('should print warn on screen when warn function called', () => {
            const message = new Error('Test log message');

            const result = logger.warn(`${message}`);

            expect(result).toContain('[WARN]');
            expect(result).toContain(`${message}`);
            expect(result).toContain('\x1b[33m');
        })
        it('should print error on screen when error function called', () => {
            const message = new Error('Test log message');

            const result = logger.error(`${message}`);

            expect(result).toContain('[ERROR]');
            expect(result).toContain(`${message}`);
            expect(result).toContain('\x1b[41m');
        })
    });
})