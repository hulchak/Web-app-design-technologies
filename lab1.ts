// Базовий інтерфейс для сховищ
interface IStorage {
    storeFile(userId: string, filePath: string): void;
    retrieveFile(userId: string, filePath: string): void;
}

// Клас для локального диску
class LocalDiskStorage implements IStorage {
    storeFile(userId: string, filePath: string): void {
        console.log(`[${userId}] Storing file to local disk: ${filePath}`);
        // Логіка зберігання файлу
    }

    retrieveFile(userId: string, filePath: string): void {
        console.log(`[${userId}] Retrieving file from local disk: ${filePath}`);
        // Логіка отримання файлу
    }
}

// Клас для Amazon S3
class AmazonS3Storage implements IStorage {
    storeFile(userId: string, filePath: string): void {
        console.log(`[${userId}] Storing file to Amazon S3: ${filePath}`);
        // Логіка зберігання файлу
    }

    retrieveFile(userId: string, filePath: string): void {
        console.log(`[${userId}] Retrieving file from Amazon S3: ${filePath}`);
        // Логіка отримання файлу
    }
}

// Одинак для управління сховищами
class StorageManager {
    private static instance: StorageManager;
    private storageMap: Map<string, IStorage> = new Map();
    private userStoragePreferences: Map<string, string> = new Map();

    private constructor() {
        this.storageMap.set("local", new LocalDiskStorage());
        this.storageMap.set("s3", new AmazonS3Storage());
    }

    public static getInstance(): StorageManager {
        if (!StorageManager.instance) {
            StorageManager.instance = new StorageManager();
        }

        return StorageManager.instance;
    }

    public setUserStoragePreference(userId: string, storageType: string): void {
        this.userStoragePreferences.set(userId, storageType);
    }

    public getUserStorage(userId: string): IStorage | undefined {
        const preferredStorageType = this.userStoragePreferences.get(userId);
        return preferredStorageType ? this.storageMap.get(preferredStorageType) : undefined;
    }

    public addStorage(storageType: string, storage: IStorage): void {
        this.storageMap.set(storageType, storage);
    }
}

// Використання
const storageManager = StorageManager.getInstance();

// Налаштування переваг користувача
storageManager.setUserStoragePreference("user1", "local");
storageManager.setUserStoragePreference("user2", "s3");

// Робота з файлами для різних користувачів
const user1Storage = storageManager.getUserStorage("user1");
user1Storage?.storeFile("user1", "/path/to/user1file.txt");

const user2Storage = storageManager.getUserStorage("user2");
user2Storage?.storeFile("user2", "/path/to/user2file.txt");

/**
 * Класи LocalDiskStorage та AmazonS3Storage використовують параметр userId для ідентифікації користувачів.
 * Клас StorageManager містить карту userStoragePreferences, що дозволяє зберігати переваги користувачів щодо типу сховища.
 * Метод setUserStoragePreference встановлює тип сховища для конкретного користувача.
 * Метод getUserStorage повертає сховище, вибране користувачем.
 *
 * Ця структура демонструє використання патерну Одинак для управління різними сховищами в контексті індивідуальних переваг користувачів.
 */