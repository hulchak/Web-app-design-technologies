// Інтерфейс Notification, який необхідно використовувати
interface Notification {
    send(title: string, message: string): void;
}

// Клас EmailNotification, який вже існує
class EmailNotification implements Notification {
    private adminEmail: string;

    constructor(adminEmail: string) {
        this.adminEmail = adminEmail;
    }

    public send(title: string, message: string): void {
        // Логіка відправки email
        console.log(`Sent email with title '${title}' to '${this.adminEmail}' that says '${message}'.`);
    }
}

// Адаптер для Slack
class SlackNotificationAdapter implements Notification {
    private slackService: SlackService;

    constructor(slackService: SlackService) {
        this.slackService = slackService;
    }

    public send(title: string, message: string): void {
        const slackMessage = `${title}: ${message}`;
        this.slackService.sendMessage(slackMessage);
    }
}

// Клас для взаємодії з Slack (припустимо, що він вже існує)
class SlackService {
    constructor(private login: string, private apiKey: string, private chatId: string) {}

    public sendMessage(message: string): void {
        // Логіка відправки повідомлення у Slack
        console.log(`Sending Slack message to chat '${this.chatId}': ${message}`);
    }
}

// Адаптер для SMS
class SmsNotificationAdapter implements Notification {
    private smsService: SmsService;

    constructor(smsService: SmsService) {
        this.smsService = smsService;
    }

    public send(title: string, message: string): void {
        const smsMessage = `${title}: ${message}`;
        this.smsService.sendSms(smsMessage);
    }
}

// Клас для взаємодії з SMS сервісом (припустимо, що він вже існує)
class SmsService {
    constructor(private phone: string, private sender: string) {}

    public sendSms(message: string): void {
        // Логіка відправки SMS
        console.log(`Sending SMS to '${this.phone}' from '${this.sender}': ${message}`);
    }
}

// Клієнтський код
function clientCode(notification: Notification) {
    notification.send("Test Title", "Test Message");
}

// Використання
const emailNotification = new EmailNotification("admin@example.com");
clientCode(emailNotification);

const slackService = new SlackService("user_login", "api_key", "chat_id");
const slackNotification = new SlackNotificationAdapter(slackService);
clientCode(slackNotification);

const smsService = new SmsService("1234567890", "SenderName");
const smsNotification = new SmsNotificationAdapter(smsService);
clientCode(smsNotification);

/**
 * EmailNotification - існуючий клас, який відправляє email-сповіщення.
 * SlackNotificationAdapter та SmsNotificationAdapter - адаптери, які роблять інтерфейси Slack та SMS сервісів сумісними з інтерфейсом Notification.
 * SlackService та SmsService - класи, що надають специфічну логіку для відправки повідомлень у Slack та SMS відповідно.
 * Клієнтський код використовує об'єкти через інтерфейс Notification, не залежно від їх конкретної реалізації.
 *
 * Цей код ілюструє використання паттерну Адаптер для інтеграції системи з різними сервісами сповіщень, зберігаючи при цьому єдиний інтерфейс для клієнтського коду.
 */