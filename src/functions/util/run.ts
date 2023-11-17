import { exec } from "child_process";
import { promisify } from "util";
import Logger from "../log/logger";

const logger = new Logger();
const execPromise = promisify(exec);

const Run = async (command: string) => {
    try {
        const { stdout } = await execPromise(command);
        return stdout.trim(); // Trim any extra whitespace
    } catch (error) {
        logger.error(error);
}};

export default Run;