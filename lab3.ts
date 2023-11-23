// Інтерфейс Builder для QueryBuilder
interface QueryBuilder {
    select(columns: string[]): QueryBuilder;
    where(condition: string): QueryBuilder;
    limit(rowCount: number): QueryBuilder;
    getSQL(): string;
}

// Конкретний Builder для PostgreSQL
class PostgresQueryBuilder implements QueryBuilder {
    private query = "";

    public select(columns: string[]): QueryBuilder {
        this.query += `SELECT ${columns.join(", ")} `;
        return this;
    }

    public where(condition: string): QueryBuilder {
        this.query += `WHERE ${condition} `;
        return this;
    }

    public limit(rowCount: number): QueryBuilder {
        this.query += `LIMIT ${rowCount} `;
        return this;
    }

    public getSQL(): string {
        return this.query;
    }
}

// Конкретний Builder для MySQL
class MySQLQueryBuilder implements QueryBuilder {
    private query = "";

    public select(columns: string[]): QueryBuilder {
        this.query += `SELECT ${columns.join(", ")} `;
        return this;
    }

    public where(condition: string): QueryBuilder {
        this.query += `WHERE ${condition} `;
        return this;
    }

    public limit(rowCount: number): QueryBuilder {
        this.query += `LIMIT ${rowCount} `;
        return this;
    }

    public getSQL(): string {
        return this.query;
    }
}

// Клієнтський код
function clientCode() {
    const postgresQuery = new PostgresQueryBuilder()
        .select(["name", "age"])
        .where("age > 18")
        .limit(10)
        .getSQL();
    console.log("Postgres query:", postgresQuery);

    const mysqlQuery = new MySQLQueryBuilder()
        .select(["name", "email"])
        .where("email LIKE '%@example.com'")
        .limit(5)
        .getSQL();
    console.log("MySQL query:", mysqlQuery);
}

clientCode();


/**
 * QueryBuilder - інтерфейс для створення запитів, який описує методи select, where, limit та getSQL.
 * PostgresQueryBuilder та MySQLQueryBuilder - конкретні реалізації QueryBuilder, які створюють SQL-запити відповідно до синтаксису PostgreSQL та MySQL.
 * Клієнтський код демонструє використання цих класів для побудови SQL-запитів для обох СУБД.
 *
 * Цей код ілюструє використання паттерну Будівельник для створення складних об'єктів (у цьому випадку SQL-запитів), забезпечуючи при цьому гнучкість та чітку відокремленість між представленням і логікою побудови.
 */