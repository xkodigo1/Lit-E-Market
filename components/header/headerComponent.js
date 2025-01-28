import { LitElement, html } from 'lit';
import { HeaderController } from '../../controllers/header/headerController.js';

export class HeaderComponent extends LitElement {
  static properties = {
    customerInfo: { type: Object }
  };

  constructor() {
    super();
    this.controller = new HeaderController();
    this.customerInfo = {};
  }

  render() {
    return html`
      <table>
        <tr>
          <th colspan="2">Información de Factura</th>
        </tr>
        <tr>
          <td>ID:</td>
          <td><input type="text" .value=${this.controller.generateInvoiceId()} readonly></td>
        </tr>
        <tr>
          <td>Nombres:</td>
          <td><input type="text" @input=${e => this.customerInfo.firstName = e.target.value}></td>
        </tr>
        <tr>
          <td>Apellidos:</td>
          <td><input type="text" @input=${e => this.customerInfo.lastName = e.target.value}></td>
        </tr>
        <tr>
          <td>Dirección:</td>
          <td><input type="text" @input=${e => this.customerInfo.address = e.target.value}></td>
        </tr>
        <tr>
          <td>Email:</td>
          <td><input type="email" @input=${e => this.customerInfo.email = e.target.value}></td>
        </tr>
      </table>
    `;
  }
}
customElements.define('header-component', HeaderComponent);