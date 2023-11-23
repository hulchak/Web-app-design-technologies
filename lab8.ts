// Абстрактний базовий клас
abstract class EntityUpdater {
    // Шаблонний метод
    public updateEntity(entityData: any): void {
        const entity = this.getEntity(entityData);
        if (!this.validateData(entity)) {
            this.handleValidationError();
            return;
        }
        this.save(entity);
        this.respond();
    }

    // Методи, які повинні бути реалізовані в підкласах
    protected abstract getEntity(entityData: any): any;
    protected abstract validateData(entity: any): boolean;
    protected abstract save(entity: any): void;

    // Хуки
    protected handleValidationError(): void {
        // Порожня реалізація, може бути перевизначена в підкласах
    }

    protected respond(): void {
        console.log('Response: Status 200 OK');
    }
}

// Конкретний клас для Товару
class ProductUpdater extends EntityUpdater {
    protected getEntity(entityData: any): any {
        // Реалізація отримання товару
        return entityData;
    }

    protected validateData(entity: any): boolean {
        // Реалізація валідації даних
        return true;
    }

    protected save(entity: any): void {
        // Реалізація збереження товару
    }

    protected handleValidationError(): void {
        console.log('Notification: Validation failed for Product');
    }
}

// Конкретний клас для Користувача
class UserUpdater extends EntityUpdater {
    protected getEntity(entityData: any): any {
        // Реалізація отримання користувача
        return entityData;
    }

    protected validateData(entity: any): boolean {
        // Реалізація валідації даних (заборона зміни email)
        return entity.email === undefined;
    }

    protected save(entity: any): void {
        // Реалізація збереження користувача
    }
}

// Конкретний клас для Замовлення
class OrderUpdater extends EntityUpdater {
    protected getEntity(entityData: any): any {
        // Реалізація отримання замовлення
        return entityData;
    }

    protected validateData(entity: any): boolean {
        // Реалізація валідації даних
        return true;
    }

    protected save(entity: any): void {
        // Реалізація збереження замовлення
    }

    protected respond(): void {
        console.log('Response: Status 200 OK with Order JSON');
    }
}

// Клієнтський код
function clientCode(updater: EntityUpdater) {
    const entityData = {}; // Дані сутності
    updater.updateEntity(entityData);
}

// Використання
const productUpdater = new ProductUpdater();
const userUpdater = new UserUpdater();
const orderUpdater = new OrderUpdater();

clientCode(productUpdater);
clientCode(userUpdater);
clientCode(orderUpdater);

/**
 * EntityUpdater - абстрактний базовий клас, який визначає скелет алгоритму (шаблонний метод updateEntity) і деякі хуки.
 * ProductUpdater, UserUpdater, OrderUpdater - конкретні реалізації для різних сутностей, які перевизначають необхідні методи та хуки.
 * Клієнтський код демонструє використання різних реалізацій для оновлення різних сутностей.
 *
 * Цей код ілюструє застосування паттерну Шаблонний метод для створення уніфікованого алгоритму оновлення сутностей, дозволяючи підкласам адаптувати або розширювати окремі кроки без зміни загальної структури алгоритму.
 */