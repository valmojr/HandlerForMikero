import AddonPacker from "./functions/AddonPacker";
import DataImporter from "./functions/DataImporter";
import { CheckAndAddToChangedAddons, GetRootDir, ChangedAddonHandler } from "./functions/util/FileHandler";
import Logger from "./functions/log/logger";
import run from "./functions/util/run";

export default async function Bootstrap (logger: Logger) {
    const rootDir = process.argv[2];

    const builderJson = process.argv[3];

    let data = null;

    if (builderJson) data = await DataImporter(builderJson);

    await run(`cd ${rootDir}`)

    if (!rootDir) {
        const rootDirError = new Error("Root dir not found");
        logger.error(rootDirError);
        throw rootDirError;
    }

    const commitOnPull = await run("git rev-parse HEAD");

    const commitOnOrigin = (await run("git ls-remote origin -h refs/heads/main"))
        ?.replace("refs/heads/main", "")
        .trim();

    const changedFiles = (await run(`git diff --name-only ${commitOnPull} ${commitOnOrigin}`))?.split("\n");

    const changedAddonsPathes: string[] = [];

    changedFiles?.forEach(async (file) => {
        CheckAndAddToChangedAddons(changedAddonsPathes, GetRootDir(file));
    })

    const changedAddons = ChangedAddonHandler(changedAddonsPathes, data);

    await AddonPacker(changedAddons);
};
