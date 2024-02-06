import { WatchedList } from "../../../shared/domain/WatchedList";

export class Devices extends WatchedList<string> {
    private constructor(initialMatch: Array<string>) {
        super(initialMatch);
    }

    public compareItems(a: string, b: string): boolean {
        return a === b;
    }

    public static create(devices: Array<string> = []): Devices {
        return new Devices(devices);
    }
}
