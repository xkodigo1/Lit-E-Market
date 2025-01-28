import { LitElement, html } from 'lit';
import { SummaryController } from '../../controllers/summary/summaryController.js';

export class SummaryComponent extends LitElement {
  static properties = {
    totals: { type: Object }
  };

  constructor() {
    super();
    this.controller = new SummaryController();
    this.totals = { subtotal: 0, iva: 0, total: 0 };
  }

  render() {
    return html`
      <table>
        <tr>
          <th colspan="2">Resumen</th>
        </tr>
        <tr>
          <td>Subtotal:</td>
          <td>$${this.totals.subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td>IVA (19%):</td>
          <td>$${this.totals.iva.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>$${this.totals.total.toFixed(2)}</td>
        </tr>
      </table>
    `;
  }
}
customElements.define('summary-component', SummaryComponent);