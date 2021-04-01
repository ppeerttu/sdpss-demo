
type TypeConverter<T> = (input: string) => T;

export class Environment {

    private static getValue(key: string, fallback?: string): string {
        const found = Deno.env.get(key);
        if (typeof found === "undefined") {
            if (typeof fallback === "undefined") {
                throw new Error(`Environment variable '${key}' required but not found`);
            }
            return fallback;
        }
        return found;
    }

    private static asString(val?: any): string | undefined {
        return typeof val === "undefined" ? undefined : "" + val;
    }

    static getString(key: string, fallback?: string): string {
        return this.getValue(key, fallback);
    }

    static getInteger(key: string, fallback?: number): number {
        return parseInt(this.getValue(key, this.asString(fallback)));
    }

    static getBoolean(key: string, fallback?: boolean): boolean {
        return this.getValue(key, this.asString(fallback)).toLowerCase() === "true";
    }
}