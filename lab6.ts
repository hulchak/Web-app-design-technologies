// Інтерфейс Downloader
interface Downloader {
    download(url: string): void;
}

// Конкретна реалізація Downloader
class SimpleDownloader implements Downloader {
    public download(url: string): void {
        console.log(`Downloading file from: ${url}`);
        // Логіка завантаження файлу
    }
}

// Proxy для кешування
class CachedDownloader implements Downloader {
    private cache: Map<string, string> = new Map();
    private downloader: SimpleDownloader;

    constructor(downloader: SimpleDownloader) {
        this.downloader = downloader;
    }

    public download(url: string): void {
        if (this.cache.has(url)) {
            console.log(`Returning cached content for: ${url}`);
            // Повертати кешований вміст
        } else {
            console.log(`Caching content for: ${url}`);
            this.downloader.download(url);
            // Кешувати вміст, який завантажує SimpleDownloader
            this.cache.set(url, 'Cached content');
        }
    }
}

// Клієнтський код
function clientCode(downloader: Downloader) {
    const url = 'http://example.com/file';
    downloader.download(url);
    // Повторне завантаження (з кешу, якщо використовується Proxy)
    downloader.download(url);
}

const simpleDownloader = new SimpleDownloader();
const cachedDownloader = new CachedDownloader(simpleDownloader);

console.log('Executing client code with SimpleDownloader:');
clientCode(simpleDownloader);

console.log('\nExecuting client code with CachedDownloader:');
clientCode(cachedDownloader);

/**
 * SimpleDownloader - реалізує основну логіку завантаження файлів.
 * CachedDownloader - є Proxy для SimpleDownloader, додає функціональність кешування, проксіюючи виклики до SimpleDownloader.
 * Клієнтський код використовує об'єкти через інтерфейс Downloader, що дозволяє йому бути незалежним від того, чи використовується реальний завантажувач або замісник з кешуванням.
 *
 * Цей код ілюструє використання паттерну Замісник для додавання нових можливостей (у цьому випадку кешування) до існуючого класу без зміни його основного функціоналу.
 */