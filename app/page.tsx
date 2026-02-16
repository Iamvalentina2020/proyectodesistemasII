"use client";
import { useState } from 'react';
import { ControlParking, ReservaComida } from '../lib/servicios';
import { Avestruz } from '../lib/aves';

export default function Home() {
  // --- ESTADOS (Para poder editar) ---
  const [horas, setHoras] = useState(3);
  const [precioComida, setPrecioComida] = useState(15);
  const [paciente, setPaciente] = useState("Valentina");
  const [nuevoSintoma, setNuevoSintoma] = useState("");
  const [historial, setHistorial] = useState(["Chequeo de rutina", "Presión normal"]);

  // --- LÓGICA SOLID ---
  const parking = new ControlParking("Parking VIP", 5, horas);
  const comida = new ReservaComida("Menú Ejecutivo", precioComida);
  const ave = new Avestruz();

  const manejarHistorial = () => {
    if (nuevoSintoma.trim()) {
      setHistorial([...historial, nuevoSintoma]);
      setNuevoSintoma("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-black text-center text-indigo-800 uppercase tracking-tighter">
          Panel de Control Sistemas II
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* TARJETA PARKING Y COMIDA */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border-b-4 border-orange-500 transition-all hover:shadow-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🚗 Parking y 🍔 Comida</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400">HORAS DE PARKING</label>
                <input type="number" value={horas} onChange={(e) => setHoras(Number(e.target.value))} className="w-full p-2 bg-gray-50 rounded border" />
                <p className="text-orange-600 font-bold mt-1">Total: ${parking.calcularPrecioFinal()}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400">PRECIO COMIDA</label>
                <input type="number" value={precioComida} onChange={(e) => setPrecioComida(Number(e.target.value))} className="w-full p-2 bg-gray-50 rounded border" />
                <p className="text-blue-600 font-bold mt-1">Total + Reserva: ${comida.calcularPrecioFinal()}</p>
              </div>
            </div>
          </div>

          {/* TARJETA SALUD (EDITABLE) */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border-b-4 border-emerald-500 transition-all hover:shadow-2xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🏥 Historia Clínica</h2>
            <input type="text" value={paciente} onChange={(e) => setPaciente(e.target.value)} className="w-full p-2 mb-4 font-bold text-emerald-700 bg-emerald-50 rounded italic" />
            <div className="max-h-32 overflow-y-auto mb-4 space-y-1">
              {historial.map((h, i) => (
                <div key={i} className="text-xs p-2 bg-slate-50 rounded border-l-2 border-emerald-300">✓ {h}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Añadir nota..." value={nuevoSintoma} onChange={(e) => setNuevoSintoma(e.target.value)} className="flex-1 p-2 text-sm border rounded" />
              <button onClick={manejarHistorial} className="bg-emerald-500 text-white px-3 rounded text-xl">+</button>
            </div>
          </div>

          {/* TARJETA AVES (SOLID) */}
          <div className="bg-slate-800 p-6 rounded-3xl shadow-xl border-b-4 border-purple-500 text-white transition-all hover:shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-purple-400">🐦 Lógica de Aves</h2>
            <div className="bg-slate-700 p-4 rounded-xl mb-4 border-l-4 border-purple-500">
              <p className="italic text-lg">"{ave.correr()}"</p>
            </div>
            <div className="p-3 bg-purple-900/40 rounded-lg">
              <p className="text-[10px] leading-tight text-purple-200 uppercase font-bold tracking-widest mb-1">Principio ISP:</p>
              <p className="text-[10px] text-gray-300">El avestruz no tiene botón de "Volar" porque no implementa esa interfaz. Esto evita errores en tiempo de ejecución.</p>
            </div>
          </div>

        </div>

        <footer className="text-center py-10">
          <button onClick={() => window.print()} className="bg-indigo-600 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all">
             GENERAR PDF DE LA TAREA
          </button>
        </footer>
      </div>
    </main>
  );
}