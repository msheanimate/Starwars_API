
export module Person {
    export interface IPerson {
        name: string
    }

    export class Product implements IPerson {
        constructor(public name: string) {
        }
    }
}