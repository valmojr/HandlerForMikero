import data from "./data/addons";
import { CheckAndAddToChangedAddons, GetRootDir, ChangedAddonHandler } from "./functions/util/FileHandler";
import Logger from "./functions/util/logger";
import run from "./functions/util/run";

const logger = new Logger();

(async () => {
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

    logger.log(changedAddons)
})();
