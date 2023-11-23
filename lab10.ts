// Інтерфейс посередника
interface Mediator {
    notify(sender: object, event: string): void;
}

// Клас посередника, що координує взаємодію компонентів
class OrderFormMediator implements Mediator {
    private dateSelector: DateSelector;
    private timeSlotSelector: TimeSlotSelector;
    private recipientCheckbox: RecipientCheckbox;
    private nameField: NameField;
    private phoneField: PhoneField;
    private pickupCheckbox: PickupCheckbox;

    constructor(
        dateSelector: DateSelector,
        timeSlotSelector: TimeSlotSelector,
        recipientCheckbox: RecipientCheckbox,
        nameField: NameField,
        phoneField: PhoneField,
        pickupCheckbox: PickupCheckbox
    ) {
        this.dateSelector = dateSelector;
        this.timeSlotSelector = timeSlotSelector;
        this.recipientCheckbox = recipientCheckbox;
        this.nameField = nameField;
        this.phoneField = phoneField;
        this.pickupCheckbox = pickupCheckbox;
    }

    public notify(sender: object, event: string): void {
        switch (event) {
            case 'dateChanged':
                this.timeSlotSelector.updateTimeSlots(this.dateSelector.getDate());
                break;
            case 'recipientChanged':
                const isOtherRecipient = this.recipientCheckbox.isChecked();
                this.nameField.setRequired(isOtherRecipient);
                this.phoneField.setRequired(isOtherRecipient);
                break;
            case 'pickupChanged':
                const isPickup = this.pickupCheckbox.isChecked();
                this.disableDeliveryOptions(isPickup);
                break;
        }
    }

    private disableDeliveryOptions(disable: boolean): void {
        this.dateSelector.setEnabled(!disable);
        this.timeSlotSelector.setEnabled(!disable);
    }
}

// Базовий клас компонентів форми
abstract class BaseComponent {
    protected mediator: Mediator;

    constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    public setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }
}

// Конкретні класи компонентів
class DateSelector extends BaseComponent {
    public getDate(): Date {
        // Повертає обрану дату
        return new Date();
    }

    public setEnabled(enabled: boolean): void {
        // Включає або виключає компонент
    }
}

class TimeSlotSelector extends BaseComponent {
    public updateTimeSlots(date: Date): void {
        // Оновлює список часових проміжків залежно від дати
    }

    public setEnabled(enabled: boolean): void {
        // Включає або виключає компонент
    }
}

class RecipientCheckbox extends BaseComponent {
    public isChecked(): boolean {
        // Повертає стан чекбокса
        return true;
    }
}

class NameField extends BaseComponent {
    public setRequired(required: boolean): void {
        // Встановлює поле як обов'язкове
    }
}

class PhoneField extends BaseComponent {
    public setRequired(required: boolean): void {
        // Встановлює поле як обов'язкове
    }
}

class PickupCheckbox extends BaseComponent {
    public isChecked(): boolean {
        // Повертає стан чекбокса
        return false;
    }
}

// Клієнтський код
const dateSelector = new DateSelector(/* mediator */);
const timeSlotSelector = new TimeSlotSelector(/* mediator */);
const recipientCheckbox = new RecipientCheckbox(/* mediator */);
const nameField = new NameField(/* mediator */);
const phoneField = new PhoneField(/* mediator */);
const pickupCheckbox = new PickupCheckbox(/* mediator */);

const mediator = new OrderFormMediator(
    dateSelector,
    timeSlotSelector,
    recipientCheckbox,
    nameField,
    phoneField,
    pickupCheckbox
);

// Установка посередника для компонентів
dateSelector.setMediator(mediator);
timeSlotSelector.setMediator(mediator);
recipientCheckbox.setMediator(mediator);
nameField.setMediator(mediator);
phoneField.setMediator(mediator);
pickupCheckbox.setMediator(mediator);

// Припустимо, користувач змінює дату доставки
dateSelector.setDate(new Date());

/**
 * Mediator - інтерфейс для посередника, який визначає метод notify.
 * OrderFormMediator - клас посередника, який координує взаємодію між компонентами форми.
 * BaseComponent - базовий клас для компонентів форми, що зберігає посилання на посередника.
 * Класи DateSelector, TimeSlotSelector, RecipientCheckbox, NameField, PhoneField, PickupCheckbox - конкретні компоненти форми, які взаємодіють через посередника.
 *
 * Цей код ілюструє застосування паттерну Посередник для управління складною взаємодією між компонентами форми, що спрощує їх взаємозв'язки та сприяє більшій гнучкості та легшій підтримці коду.
 */