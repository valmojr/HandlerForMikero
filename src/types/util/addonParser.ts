import { Addon } from "../entities";

export default function AddonParser(addon: Addon) {
    (addon.binarized === undefined) ? addon.binarized = true: null;
    (addon.obfuscated === undefined) ? addon.obfuscated = true : null;
    
    return addon;
}