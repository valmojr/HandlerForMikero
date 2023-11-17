import Run from "../util/run";
import Logger from "./logger";
import fs from 'fs';

describe('LOGGING TESTS', () => {
    afterAll(() => {
        //Run('rm -rf ./logs');
    });

    describe('File Printing Tests', () => {
        it('should create the log file if not found', () => {
            process.env.log_dir = 'development';
            const logger = new Logger();
            const tested = logger.log('Test log message');
            const loggedFile = fs.readFileSync('@/logs/dev_logs.log', 'utf-8');

            expect(tested).toBe(false);
        });
        it('should print on the dev log when running dev env', () => {
            process.env.log_dir = 'production';
            const logger = new Logger();
            const tested = logger.log('Test log message');
            const loggedFile = fs.readFileSync('@/logs/dev_logs.log', 'utf-8');

            expect(tested).toBe(false);
        });
        it('should print on the prod log when running prod env', () => {
            process.env.log_dir = 'production';
            const logger = new Logger();
            const tested = logger.log('Test log message');
            const loggedFile = fs.readFileSync('@/logs/prod_logs.log', 'utf-8');

            expect(tested).toBe(false);
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