import person from '../../Assests/person.png'

export const ProductService = {
    getProductsData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Name',
                description: 'Product Description',
                image: person,
                price: "It's simple and easy",
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: '',
                rating: 5
            },
            {
                id: '1010',
                code: 'plb34234v',
                name: 'Name',
                description: 'Product Description',
                image: person,
                price: 'It is very affordable',
                category: 'Accessories',
                quantity: 0,
                inventoryStatus: '',
                rating: 4
            },
            {
                id: '1011',
                code: '4920nnc2d',
                name: 'Name',
                description: 'Product Description',
                image: person,
                price: 'Complete E-Reporting Service',
                category: 'Electronics',
                quantity: 23,
                inventoryStatus: '',
                rating: 4
            },
        ];
    },

    getProductsWithOrdersData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: '',
                rating: 5,
            },        
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 3));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

