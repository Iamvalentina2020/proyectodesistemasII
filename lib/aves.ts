// Principio de Segregación de Interfaces (ISP)
interface Corredor { correr(): string; }

export class Avestruz implements Corredor {
  correr() {
    return "El avestruz corre velozmente a 70 km/h";
  }
}