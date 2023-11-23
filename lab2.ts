// Абстрактний клас Creator, який визначає фабричний метод
abstract class SocialNetworkPublisher {
    // Фабричний метод, який повинен бути перевизначений у підкласах
    abstract createPublisher(credentials: SocialNetworkCredentials): SocialNetwork;

    public publishMessage(message: string): void {
        // Викликає фабричний метод для створення об'єкта соціальної мережі
        const socialNetwork = this.createPublisher(this.getCredentials());
        socialNetwork.postMessage(message);
    }

    // Метод для отримання облікових даних
    protected abstract getCredentials(): SocialNetworkCredentials;
}

// Конкретний клас для Facebook
class FacebookPublisher extends SocialNetworkPublisher {
    protected createPublisher(credentials: SocialNetworkCredentials): SocialNetwork {
        return new Facebook(credentials);
    }

    protected getCredentials(): SocialNetworkCredentials {
        return { login: "facebook_login", password: "facebook_password" };
    }
}

// Конкретний клас для LinkedIn
class LinkedInPublisher extends SocialNetworkPublisher {
    protected createPublisher(credentials: SocialNetworkCredentials): SocialNetwork {
        return new LinkedIn(credentials);
    }

    protected getCredentials(): SocialNetworkCredentials {
        return { email: "linkedin_email", password: "linkedin_password" };
    }
}

// Інтерфейс для соціальних мереж
interface SocialNetwork {
    postMessage(message: string): void;
}

// Конкретний клас соціальної мережі Facebook
class Facebook implements SocialNetwork {
    constructor(private credentials: SocialNetworkCredentials) {}

    public postMessage(message: string): void {
        console.log(`Posting message to Facebook: ${message}`);
        // Логіка публікації повідомлення у Facebook
    }
}

// Конкретний клас соціальної мережі LinkedIn
class LinkedIn implements SocialNetwork {
    constructor(private credentials: SocialNetworkCredentials) {}

    public postMessage(message: string): void {
        console.log(`Posting message to LinkedIn: ${message}`);
        // Логіка публікації повідомлення у LinkedIn
    }
}

// Тип для облікових даних
type SocialNetworkCredentials = {
    login?: string;
    email?: string;
    password: string;
};

// Використання
const facebookPublisher = new FacebookPublisher();
facebookPublisher.publishMessage("Hello, Facebook!");

const linkedInPublisher = new LinkedInPublisher();
linkedInPublisher.publishMessage("Hello, LinkedIn!");

/**
 * SocialNetworkPublisher - абстрактний клас, який визначає фабричний метод createPublisher та метод publishMessage.
 * FacebookPublisher та LinkedInPublisher - конкретні реалізації SocialNetworkPublisher, які визначають, як створюється екземпляр конкретної соціальної мережі.
 * SocialNetwork - інтерфейс для соціальних мереж, що має метод postMessage.
 * Facebook та LinkedIn - класи, що реалізують інтерфейс SocialNetwork.
 *
 * Цей код ілюструє використання паттерну Фабричний метод для створення об'єктів різних соціальних мереж з можливістю легкого розширення для підключення до інших мереж у майбутньому.
 */