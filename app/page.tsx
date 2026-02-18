"use client";
import { useState } from "react";

/* ============================
   MODELOS SOLID
============================ */

interface Corredor {
  correr(): string;
}

class Avestruz implements Corredor {
  correr(): string {
    return "El avestruz corre hasta 70 km/h 🐦";
  }
}

abstract class ProductoBase {
  constructor(
    protected nombre: string,
    protected precioBase: number
  ) {}

  abstract calcularPrecioFinal(): number;
}

class Parking extends ProductoBase {
  constructor(
    nombre: string,
    precioBase: number,
    private horas: number
  ) {
    super(nombre, precioBase);
  }

  calcularPrecioFinal(): number {
    return this.precioBase * this.horas;
  }
}

/* ============================
   COMPONENTE PRINCIPAL
============================ */

export default function Home() {

  /* -------- PARKING -------- */
  const [vehiculo, setVehiculo] = useState("Auto");
  const [placa, setPlaca] = useState("");
  const [horas, setHoras] = useState(1);
  const [registrosParking, setRegistrosParking] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const precioVehiculo = vehiculo === "Auto" ? 5 : 3;
  const parking = new Parking("Parking", precioVehiculo, horas);

  const validarPlaca = (valor: string) => {
    const regex = /^[A-Za-z0-9]{0,6}$/;
    if (regex.test(valor)) {
      setPlaca(valor.toUpperCase());
    }
  };

  const guardarParking = () => {
    if (!placa || horas < 1) {
      alert("Complete los datos correctamente");
      return;
    }

    const nuevoRegistro = {
      vehiculo,
      placa,
      horas,
      total: parking.calcularPrecioFinal(),
    };

    if (editIndex !== null) {
      const copia = [...registrosParking];
      copia[editIndex] = nuevoRegistro;
      setRegistrosParking(copia);
      setEditIndex(null);
    } else {
      setRegistrosParking([...registrosParking, nuevoRegistro]);
    }

    setPlaca("");
    setHoras(1);
  };

  const editarParking = (index: number) => {
    const reg = registrosParking[index];
    setVehiculo(reg.vehiculo);
    setPlaca(reg.placa);
    setHoras(reg.horas);
    setEditIndex(index);
  };

  /* -------- HISTORIA CLINICA -------- */
  const [paciente, setPaciente] = useState("");
  const [sangre, setSangre] = useState("O+");
  const [doctor, setDoctor] = useState("General");
  const [fecha, setFecha] = useState("");
  const [afeccion, setAfeccion] = useState("");
  const [historias, setHistorias] = useState<any[]>([]);

  const guardarHistoria = () => {
    if (!paciente || !fecha) {
      alert("Paciente y fecha son obligatorios");
      return;
    }

    const nuevaHistoria = {
      paciente,
      sangre,
      doctor,
      fecha,
      afeccion: afeccion || "Ninguna",
    };

    setHistorias([...historias, nuevaHistoria]);

    setPaciente("");
    setFecha("");
    setAfeccion("");
  };

  /* -------- IMPRIMIR -------- */
  const imprimir = () => {
    window.print();
  };

  const ave = new Avestruz();

  return (
    <main className="min-h-screen bg-yellow-50 p-10">

      <h1 className="text-4xl font-black text-center text-orange-600 mb-10">
        🍔 Sistema Completo Parking & Salud
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* PARKING */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-8 border-orange-400">
          <h2 className="text-xl font-bold text-orange-600 mb-4">
            🚗 Parking
          </h2>

          <select
            className="w-full p-2 mb-2 border rounded"
            value={vehiculo}
            onChange={(e) => setVehiculo(e.target.value)}
          >
            <option>Auto</option>
            <option>Moto</option>
          </select>

          <input
            className="w-full p-2 mb-2 border rounded"
            placeholder="Placa (máx 6 letras/números)"
            value={placa}
            onChange={(e) => validarPlaca(e.target.value)}
          />

          <input
            type="number"
            min={1}
            className="w-full p-2 mb-2 border rounded"
            value={horas}
            onChange={(e) => setHoras(Number(e.target.value))}
          />

          <p className="font-bold text-orange-700 mb-3">
            Total: Bs {parking.calcularPrecioFinal()}
          </p>

          <button
            onClick={guardarParking}
            className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
          >
            {editIndex !== null ? "Actualizar" : "Guardar"}
          </button>

          <button
            onClick={imprimir}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Imprimir
          </button>

          <div className="mt-4">
            {registrosParking.map((r, i) => (
              <div key={i} className="border p-2 mb-2 rounded">
                {r.vehiculo} - {r.placa} - {r.horas}h - Bs {r.total}
                <button
                  onClick={() => editarParking(i)}
                  className="ml-2 text-orange-600 underline"
                >
                  Editar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* HISTORIA CLINICA */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-8 border-yellow-400">
          <h2 className="text-xl font-bold text-yellow-600 mb-4">
            🏥 Historia Clínica
          </h2>

          <input
            className="w-full p-2 mb-2 border rounded"
            placeholder="Paciente"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
          />

          <input
            type="date"
            className="w-full p-2 mb-2 border rounded"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <select
            className="w-full p-2 mb-2 border rounded"
            value={sangre}
            onChange={(e) => setSangre(e.target.value)}
          >
            <option>O+</option>
            <option>A+</option>
            <option>B+</option>
          </select>

          <input
            className="w-full p-2 mb-2 border rounded"
            placeholder="Afección (opcional)"
            value={afeccion}
            onChange={(e) => setAfeccion(e.target.value)}
          />

          <button
            onClick={guardarHistoria}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Guardar Historia
          </button>

          <div className="mt-4">
            {historias.map((h, i) => (
              <div key={i} className="border p-2 mb-2 rounded">
                {h.paciente} - {h.fecha} - {h.afeccion}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ISP */}
      <div className="mt-10 text-center bg-orange-100 p-6 rounded-xl">
        <h2 className="font-bold text-orange-600 mb-2">
          🐦 Principio ISP
        </h2>
        <p className="text-orange-700 italic">
          {ave.correr()}
        </p>
      </div>

    </main>
  );
}
