export type Addon = {
    name: string;
    binarized?: boolean;
    obfuscated?: boolean;
}

export type Data = Addon[];

export type Builder = {
    obfuscatedAddons: string[];
    binarizedAddons: string[];
}