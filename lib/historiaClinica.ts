import { RegistroClinico } from "./registro";

export class HistoriaClinica {
  agregarRegistro(registro: RegistroClinico): string {
    return `Registro "${registro.descripcion}" guardado exitosamente.`;
  }
}
