// separate only the root directory from the filepath
export function GetRootDir(file: string) {
    return file.split("/")[0];
}