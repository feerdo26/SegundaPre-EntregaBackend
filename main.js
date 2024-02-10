import fs from "fs";
import defaultProducts from "./datos.js";

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error.message);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
      console.log("Productos guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar los productos:", error.message);
    }
  }

  getProducts() {
    return this.products;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    const productId = this.products.length + 1; //
    const newProduct = {
      id: productId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.saveProducts(); //
    return newProduct;
  }

  getProductById(productId) {
    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  getHeladoProducts() {
    return this.products.filter((product) => product.gusto === "Helado");
  }

  generateProductId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}

const filePath = "productos.json";

const productManager = new ProductManager(filePath);
defaultProducts.forEach((product) => productManager.addProduct(product));

console.log("Productos:", productManager.getProducts());

console.log(
  "Productos con gusto de Helado:",
  productManager.getHeladoProducts()
);
