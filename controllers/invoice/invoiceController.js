export class DetailInvoiceController {
    constructor() {
      this.items = [];
    }
    
    addItem(product, quantity) {
      const subtotal = product.unitPrice * quantity;
      this.items.push({
        ...product,
        quantity,
        subtotal
      });
      return this.items;
    }
    
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      return this.items;
    }
  }
  