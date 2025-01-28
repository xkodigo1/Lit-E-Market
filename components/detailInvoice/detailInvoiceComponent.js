import { LitElement, html } from 'lit';
import { DetailInvoiceController } from '../../controllers/invoice/invoiceController.js';

export class DetailInvoiceComponent extends LitElement {
  static properties = {
    items: { type: Array }
  };

  constructor() {
    super();
    this.controller = new DetailInvoiceController();
    this.items = [];
  }

  removeItem(productId) {
    this.items = this.controller.removeItem(productId);
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('items-updated', { detail: this.items }));
  }

  render() {
    return html`
      <table>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio Unit.</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Acción</th>
        </tr>
        ${this.items.map(item => html`
          <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.unitPrice}</td>
            <td>${item.quantity}</td>
            <td>${item.subtotal}</td>
            <td>
              <button @click=${() => this.removeItem(item.id)}>Eliminar</button>
            </td>
          </tr>
        `)}
      </table>
    `;
  }
}
customElements.define('detail-invoice-component', DetailInvoiceComponent);