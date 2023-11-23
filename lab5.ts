// Інтерфейс Renderer визначає методи для рендерингу сторінок
interface Renderer {
    renderTitle(title: string): string;
    renderText(text: string): string;
    renderImage(url: string): string;
}

// Конкретні реалізації Renderer
class HTMLRenderer implements Renderer {
    renderTitle(title: string): string {
        return `<h1>${title}</h1>`;
    }

    renderText(text: string): string {
        return `<p>${text}</p>`;
    }

    renderImage(url: string): string {
        return `<img src="${url}" />`;
    }
}

class JsonRenderer implements Renderer {
    renderTitle(title: string): string {
        return `{"title": "${title}"}`;
    }

    renderText(text: string): string {
        return `{"text": "${text}"}`;
    }

    renderImage(url: string): string {
        return `{"image": "${url}"}`;
    }
}

class XmlRenderer implements Renderer {
    renderTitle(title: string): string {
        return `<title>${title}</title>`;
    }

    renderText(text: string): string {
        return `<text>${text}</text>`;
    }

    renderImage(url: string): string {
        return `<image src="${url}" />`;
    }
}

// Абстрактний клас Page, який містить спільну логіку для всіх сторінок
abstract class Page {
    protected renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    public abstract render(): string;
}

// Конкретні реалізації сторінок
class SimplePage extends Page {
    private title: string;
    private content: string;

    constructor(renderer: Renderer, title: string, content: string) {
        super(renderer);
        this.title = title;
        this.content = content;
    }

    public render(): string {
        const renderedTitle = this.renderer.renderTitle(this.title);
        const renderedContent = this.renderer.renderText(this.content);
        return renderedTitle + renderedContent;
    }
}

class Product {
    constructor(public name: string, public description: string, public imageUrl: string, public id: number) {}
}

class ProductPage extends Page {
    private product: Product;

    constructor(renderer: Renderer, product: Product) {
        super(renderer);
        this.product = product;
    }

    public render(): string {
        const renderedTitle = this.renderer.renderTitle(this.product.name);
        const renderedDescription = this.renderer.renderText(this.product.description);
        const renderedImage = this.renderer.renderImage(this.product.imageUrl);
        return renderedTitle + renderedDescription + renderedImage;
    }
}

// Клієнтський код
function clientCode() {
    const htmlRenderer = new HTMLRenderer();
    const simplePage = new SimplePage(htmlRenderer, "Simple Title", "This is a simple page.");
    console.log(simplePage.render());

    const product = new Product("Product 1", "Description of Product 1", "image-url.jpg", 1);
    const productPage = new ProductPage(htmlRenderer, product);
    console.log(productPage.render());

    const jsonRenderer = new JsonRenderer();
    const xmlRenderer = new XmlRenderer();
    // Подальше використання jsonRenderer та xmlRenderer для рендерингу сторінок
}

clientCode();

/**
 * Renderer - інтерфейс, який описує методи для рендерингу різних елементів сторінки.
 * HTMLRenderer, JsonRenderer, XmlRenderer - конкретні реалізації Renderer.
 * Page - абстрактний клас, який містить спільну логіку для всіх типів сторінок.
 * SimplePage, ProductPage - конкретні реалізації Page, які використовують різні рендери для виведення контенту.
 * Клієнтський код демонструє використання цих класів для рендерингу різних типів сторінок у різних форматах.
 *
 * Цей код ілюструє використання паттерну Міст для розділення абстракції (сторінки) від її реалізації (рендерингу), що дозволяє незалежно від себе змінювати обидва аспекти.
 */