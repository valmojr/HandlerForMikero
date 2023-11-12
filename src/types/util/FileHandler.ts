// separate only the root directory from the filepath
export function GetRootDir(file: string) {
    return file.split("/")[0];
}

// Check if the addon is already in the changed addons array, if not, add it
export function CheckAndAddToChangedAddons(changedAddons: string[],addonName: string) {
    if(!changedAddons.includes(addonName)) {
        changedAddons.push(addonName);
    }

    return changedAddons;
}