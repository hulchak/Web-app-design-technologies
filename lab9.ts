// Інтерфейс Component
interface Component {
    accept(visitor: Visitor): void;
}

// Клас Компанії
class Company implements Component {
    public departments: Department[];

    constructor(departments: Department[]) {
        this.departments = departments;
    }

    public accept(visitor: Visitor): void {
        visitor.visitCompany(this);
    }
}

// Клас Департаменту
class Department implements Component {
    public employees: Employee[];

    constructor(employees: Employee[]) {
        this.employees = employees;
    }

    public accept(visitor: Visitor): void {
        visitor.visitDepartment(this);
    }
}

// Клас Співробітника
class Employee implements Component {
    constructor(public position: string, public salary: number) {}

    public accept(visitor: Visitor): void {
        visitor.visitEmployee(this);
    }
}

// Інтерфейс Відвідувача
interface Visitor {
    visitCompany(company: Company): void;
    visitDepartment(department: Department): void;
    visitEmployee(employee: Employee): void;
}

// Конкретний Відвідувач для генерації Зарплатної відомості
class SalaryReportVisitor implements Visitor {
    public visitCompany(company: Company): void {
        console.log('Salary Report for the whole Company');
        company.departments.forEach(department => department.accept(this));
    }

    public visitDepartment(department: Department): void {
        console.log('Salary Report for Department');
        department.employees.forEach(employee => employee.accept(this));
    }

    public visitEmployee(employee: Employee): void {
        console.log(`Employee ${employee.position}: ${employee.salary}`);
    }
}

// Клієнтський код
function clientCode(component: Component, visitor: Visitor) {
    component.accept(visitor);
}

// Використання
const employees = [
    new Employee('Developer', 1000),
    new Employee('Manager', 1500)
];
const department = new Department(employees);
const company = new Company([department]);

const salaryReportVisitor = new SalaryReportVisitor();

console.log('Generating Salary Report for Department:');
clientCode(department, salaryReportVisitor);

console.log('\nGenerating Salary Report for Company:');
clientCode(company, salaryReportVisitor);

/**
 * Company, Department, Employee - класи, які реалізують інтерфейс Component і дозволяють відвідувачу Visitor виконувати операції з ними.
 * SalaryReportVisitor - конкретний відвідувач, який збирає інформацію про зарплати в компанії і департаментах.
 * Клієнтський код використовує відвідувача для генерації звіту про зарплати в компанії та департаменті.
 *
 * Цей код ілюструє використання паттерну Відвідувач для гнучкого виконання операцій над різними об'єктами, що належать до однієї структури, такої як компанія, департамент та співробітник.
 */