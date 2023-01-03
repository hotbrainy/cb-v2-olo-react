export function asCurrency(value: number, locale?: string, currency?: string): string {
    return value.toLocaleString(locale || 'en-AU', {
        style    : 'currency',
        currency : currency || 'AUD'
    });
}