// Інтерфейс стратегії доставки
interface DeliveryStrategy {
    calculateCost(orderDetails: OrderDetails): number;
}

// Клас для зберігання деталей замовлення
class OrderDetails {
    constructor(public weight: number, public distance: number) {}
}

// Конкретна стратегія: Самовивіз
class SelfPickupStrategy implements DeliveryStrategy {
    public calculateCost(orderDetails: OrderDetails): number {
        return 0; // Вартість самовивозу завжди 0
    }
}

// Конкретна стратегія: Доставка зовнішньою службою доставки
class ExternalDeliveryStrategy implements DeliveryStrategy {
    public calculateCost(orderDetails: OrderDetails): number {
        // Розрахунок вартості залежить від ваги та відстані
        return orderDetails.distance * 2 + orderDetails.weight;
    }
}

// Конкретна стратегія: Доставка власною службою доставки
class OwnDeliveryStrategy implements DeliveryStrategy {
    public calculateCost(orderDetails: OrderDetails): number {
        // Розрахунок вартості власною службою
        return orderDetails.distance * 1.5;
    }
}

// Контекст, який використовує стратегію
class DeliveryContext {
    private strategy: DeliveryStrategy;

    constructor(strategy: DeliveryStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: DeliveryStrategy) {
        this.strategy = strategy;
    }

    public calculateDeliveryCost(orderDetails: OrderDetails): number {
        return this.strategy.calculateCost(orderDetails);
    }
}

// Клієнтський код
function clientCode() {
    const orderDetails = new OrderDetails(5, 10); // Вага 5 кг, відстань 10 км
    const deliveryContext = new DeliveryContext(new SelfPickupStrategy());

    console.log(`Self Pickup Cost: ${deliveryContext.calculateDeliveryCost(orderDetails)}`);

    deliveryContext.setStrategy(new ExternalDeliveryStrategy());
    console.log(`External Delivery Cost: ${deliveryContext.calculateDeliveryCost(orderDetails)}`);

    deliveryContext.setStrategy(new OwnDeliveryStrategy());
    console.log(`Own Delivery Cost: ${deliveryContext.calculateDeliveryCost(orderDetails)}`);
}

clientCode();

/**
 * DeliveryStrategy - інтерфейс для стратегій, який визначає метод calculateCost.
 * SelfPickupStrategy, ExternalDeliveryStrategy, OwnDeliveryStrategy - конкретні реалізації стратегій доставки.
 * OrderDetails - клас, який зберігає деталі замовлення.
 * DeliveryContext - контекст, який використовує обрану стратегію доставки для розрахунку вартості.
 * Клієнтський код демонструє зміну стратегії та розрахунок вартості доставки для різних способів.
 *
 * Цей код ілюструє застосування паттерну Стратегія для забезпечення гнучкості у виборі алгоритму розрахунку вартості доставки в залежності від обраного способу доставки.
 */