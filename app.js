import { LitElement, html } from 'lit';
import './components/header/headerComponent.js';
import './components/products/productsComponent.js';
import './components/detailInvoice/detailInvoiceComponent.js';
import './components/summary/summaryComponent.js';

const invoices = [];

class InvoiceApp extends LitElement {
  static properties = {
    currentInvoice: { type: Object }
  };

  constructor() {
    super();
    this.currentInvoice = {
      customerInfo: null,
      items: [],
      summary: {
        subtotal: 0,
        iva: 0,
        total: 0
      }
    };
  }

  handleCustomerInfo(event) {
    this.currentInvoice.customerInfo = event.detail;
  }

  handleAddProduct(event) {
    const detailInvoice = this.shadowRoot.querySelector('detail-invoice-component');
    const summary = this.shadowRoot.querySelector('summary-component');
    
    detailInvoice.items = [...detailInvoice.items, {
      ...event.detail.product,
      quantity: event.detail.quantity,
      subtotal: event.detail.product.unitPrice * event.detail.quantity
    }];
    
    this.updateSummary(detailInvoice.items);
  }

  handleItemsUpdated(event) {
    this.updateSummary(event.detail);
  }

  updateSummary(items) {
    const summary = this.shadowRoot.querySelector('summary-component');
    summary.totals = summary.controller.calculateTotals(items);
  }

  saveInvoice() {
    invoices.push({
      ...this.currentInvoice,
      items: this.shadowRoot.querySelector('detail-invoice-component').items,
      summary: this.shadowRoot.querySelector('summary-component').totals
    });
  }

  render() {
    return html`
      <div class="invoice-container">
        <header-component 
          @customer-info=${this.handleCustomerInfo}>
        </header-component>
        
        <products-component
          @add-product=${this.handleAddProduct}>
        </products-component>
        
        <detail-invoice-component
          @items-updated=${this.handleItemsUpdated}>
        </detail-invoice-component>
        
        <summary-component></summary-component>
        
        <button @click=${this.saveInvoice}>Guardar Factura</button>
      </div>
    `;
  }
}
customElements.define('invoice-app', InvoiceApp);