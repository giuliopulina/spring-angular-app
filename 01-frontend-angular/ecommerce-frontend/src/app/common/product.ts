export class Product {
    constructor(
        public id: number,
        public sku: string,
        public name: string,
        public description: string,
        public price: number,
        public active: boolean,
        public imageUrl: string,
        public unitsInStock: number,
        public dateCreated: Date,
        public dateUpdated: Date) {
    }
}
