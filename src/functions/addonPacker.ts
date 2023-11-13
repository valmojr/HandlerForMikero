import { Addon } from "../types/entities";
import Logger from "./util/logger";
import run from "./util/run";

export default async function AddonPacker(changedAddons: Addon[]) {
    const logger = new Logger();

    changedAddons.forEach(async (addon) => {
        logger.log(`Packing ${addon.name}`);
        if (addon.obfuscated) {
            logger.log(`${addon.name} is obfuscated`);
            await run('echo "Obfuscated"');
            return;
        } else if (addon.binarized) {
            logger.log(`${addon.name} is binarized`);
            await run('echo "Binarized"');
            return;
        } else {
            logger.log(`${addon.name} is not obfuscated or binarized`);
            await run('echo "Not obfuscated or binarized"');
        }
        await run(`echo ${addon.name}`);
    });
}