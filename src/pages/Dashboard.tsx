import React from 'react';
import { Car, Wrench, Fuel, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Car className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Veículos Ativos</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Wrench className="text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600">Em Manutenção</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Fuel className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Consumo Mensal</p>
              <p className="text-2xl font-semibold">2.450L</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" />
            </div>
            <div>
              <p className="text-gray-600">Alertas</p>
              <p className="text-2xl font-semibold">5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Próximas Manutenções</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">ABC-{1234 + i}</p>
                  <p className="text-sm text-gray-600">Troca de Óleo</p>
                </div>
                <p className="text-sm text-gray-600">Em 3 dias</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Alertas Recentes</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                <AlertTriangle className="text-red-500" size={20} />
                <div>
                  <p className="font-medium">Pneu com Desgaste</p>
                  <p className="text-sm text-gray-600">Veículo XYZ-{7890 - i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}