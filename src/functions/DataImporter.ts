import { Builder } from "../types/entities";

export default async function DataImporter(jsonFilePath: string): Promise<Builder> {
    const { default: data } = await import(jsonFilePath);

    if (!data) {
        throw new Error("Data is not provided");
    }

    return data;
}