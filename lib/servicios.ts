export abstract class ProductoBase {
  constructor(public nombre: string, public precioBase: number) {}
  abstract calcularPrecioFinal(): number;
}

export class ControlParking extends ProductoBase {
  constructor(nombre: string, precioBase: number, private horas: number) {
    super(nombre, precioBase);
  }
  calcularPrecioFinal() { return this.precioBase * this.horas; }
}

export class ReservaComida extends ProductoBase {
  calcularPrecioFinal() { return this.precioBase + 5.00; }
}