import Logger from "./types/util/logger";
import run from "./types/util/run";

const logger = new Logger();

(async () => {
    const commitOnPull = await run("git rev-parse HEAD");
    const commitOnOrigin = (await run("git ls-remote origin -h refs/heads/main"))?.replace("refs/heads/main", "").trim();

    const changedFiles = (await run(`git diff --name-only ${commitOnPull} ${commitOnOrigin}`))?.split("\n");

    changedFiles?.forEach(async (file) => {
        logger.log(`${file}`);
    })
})();
