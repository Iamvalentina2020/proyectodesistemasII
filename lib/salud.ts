import { ProductoBase } from './productoBase';

export class HistoriaClinica {
  agregarRegistro(reg: {id: string, descripcion: string, fecha: string}) {
    return `Registro "${reg.descripcion}" guardado exitosamente.`;
  }
}

export class ServicioAsistencia extends ProductoBase {
  calcularPrecioFinal() { return this.precioBase; }
}