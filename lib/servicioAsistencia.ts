import { Servicio } from "./servicio";

export class ServicioAsistencia implements Servicio {
  constructor(private precio: number) {}

  calcularPrecio(): number {
    return this.precio;
  }
}
