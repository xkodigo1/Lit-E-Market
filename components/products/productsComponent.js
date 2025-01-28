import { LitElement, html } from 'lit';
import { ProductsController } from '../../controllers/products/productsController.js';

export class ProductsComponent extends LitElement {
  static properties = {
    selectedProduct: { type: Object },
    quantity: { type: Number }
  };

  constructor() {
    super();
    this.controller = new ProductsController();
    this.quantity = 1;
  }

  handleProductSelect(e) {
    const productId = e.target.value;
    this.selectedProduct = this.controller.getProduct(productId);
  }

  addToInvoice() {
    const event = new CustomEvent('add-product', {
      detail: {
        product: this.selectedProduct,
        quantity: this.quantity
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <table>
        <tr>
          <th colspan="2">Selección de Productos</th>
        </tr>
        <tr>
          <td>Producto:</td>
          <td>
            <select @change=${this.handleProductSelect}>
              <option value="">Seleccione un producto</option>
              ${this.controller.products.map(product => 
                html`<option value=${product.id}>${product.name}</option>`
              )}
            </select>
          </td>
        </tr>
        <tr>
          <td>ID:</td>
          <td><input type="text" .value=${this.selectedProduct?.id || ''} readonly></td>
        </tr>
        <tr>
          <td>Precio Unitario:</td>
          <td><input type="number" .value=${this.selectedProduct?.unitPrice || 0} readonly></td>
        </tr>
        <tr>
          <td>Cantidad:</td>
          <td><input type="number" min="1" .value=${this.quantity} 
            @input=${e => this.quantity = parseInt(e.target.value)}></td>
        </tr>
        <tr>
          <td colspan="2">
            <button @click=${this.addToInvoice}>Agregar a la factura</button>
          </td>
        </tr>
      </table>
    `;
  }
}
customElements.define('products-component', ProductsComponent);