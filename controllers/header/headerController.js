export class HeaderController {
    generateInvoiceId() {
      return 'INV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    saveCustomerInfo(customerData) {
      if (!this.validateEmail(customerData.email)) {
        throw new Error('Email inválido');
      }
      return {
        invoiceId: this.generateInvoiceId(),
        ...customerData
      };
    }
  }