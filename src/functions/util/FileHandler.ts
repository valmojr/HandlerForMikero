import { Builder, Data } from "../../types/entities";

// separate only the root directory from the filepath
export function GetRootDir(file: string) {
    return file.split("/")[0];
}

// Check if the addon is already in the changed addons array, if not, add it
export function CheckAndAddToChangedAddons(changedAddons: string[],addonName: string) {
    if(changedAddons.includes(addonName)) {
        changedAddons.push(addonName);
    }

    return changedAddons;
}

// return the addons from data that are on changedAddons
export function ChangedAddonHandler(changedAddons: string[], data: Builder | null) {
    const allAddons: Data = [];

    if (data) {
        data.obfuscatedAddons.forEach((addon) => {
            allAddons.push({
                name: addon,
                binarized: true,
                obfuscated: true,
            });
        });

        data.binarizedAddons.forEach((addon) => {
            allAddons.push({
                name: addon,
                binarized: true,
                obfuscated: false,
            });
        });
    }

    return allAddons.filter((addon) => changedAddons.includes(addon.name));
}