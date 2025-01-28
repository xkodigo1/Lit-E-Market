import { products } from '../../data/products.js';
export class ProductsController {
    constructor() {
      this.products = products;
    }
    
    getProduct(productId) {
      return this.products.find(p => p.id === productId);
    }
    
    calculateSubtotal(product, quantity) {
      return product.unitPrice * quantity;
    }
  }