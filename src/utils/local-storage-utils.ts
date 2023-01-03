export default class LocalStorageUtils
{
    private static get isSSR(): boolean {
        return (typeof (window) === 'undefined');
    }

    public static load<T>(key: string, defaultValue: any = null): T | null {
        if (LocalStorageUtils.isSSR) {
            // No localStorage available on server-side
            return defaultValue;
        }

        // TODO: consider decrypting/de-obfuscating the value
        const value = localStorage.getItem(key);
        return value
            ? (JSON.parse(value) as T)
            : defaultValue
            ;
    }

    public static save(key: string, value: any): void {
        if (LocalStorageUtils.isSSR) {
            // No localStorage available on server-side
            return;
        }

        if (value) {
            // TODO: consider encrypting/obfuscating the value
            localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            this.delete(key);
        }
    }

    public static delete(key: string): void {
        if (LocalStorageUtils.isSSR) {
            // No localStorage available on server-side
            return;
        }

        localStorage.removeItem(key);
    }
}
