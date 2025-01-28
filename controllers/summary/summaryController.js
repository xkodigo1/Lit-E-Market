export class SummaryController {
    constructor() {
      this.IVA_RATE = 0.19;
    }
    
    calculateTotals(items) {
      const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
      const iva = subtotal * this.IVA_RATE;
      const total = subtotal + iva;
      
      return {
        subtotal,
        iva,
        total
      };
    }
  }