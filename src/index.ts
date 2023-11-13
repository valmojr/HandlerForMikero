import AddonPacker from "./functions/AddonPacker";
import DataImporter from "./functions/DataImporter";
import { CheckAndAddToChangedAddons, GetRootDir, ChangedAddonHandler } from "./functions/util/FileHandler";
import run from "./functions/util/run";

(async () => {
    const rootDir = process.argv[2];

    const builderJson = process.argv[3];

    let data = null;

    if (builderJson) data = await DataImporter(builderJson);

    await run (`cd ${rootDir}`)

    if (!rootDir) {
        console.error("Root dir is not provided");
        process.exit(1);
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
})();
