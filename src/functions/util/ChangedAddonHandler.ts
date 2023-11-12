import { Data } from "../../types/entities";

// return the addons from data that are on changedAddons
export default function ChangedAddonHandler(changedAddons: string[], data: Data) {
    return data.filter((addon) => changedAddons.includes(addon.name));
}