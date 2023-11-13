import data from "./data/addons";
import AddonPacker from "./functions/addonPacker";
import { CheckAndAddToChangedAddons, GetRootDir, ChangedAddonHandler } from "./functions/util/FileHandler";
import run from "./functions/util/run";

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

    await AddonPacker(changedAddons);
})();
