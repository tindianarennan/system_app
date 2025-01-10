import React from 'react';
import { Wrench, Clock, AlertTriangle, DollarSign } from 'lucide-react';

export default function MaintenanceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Wrench className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600">O.S. Abertas</p>
            <p className="text-2xl font-semibold">12</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Clock className="text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-600">Em Andamento</p>
            <p className="text-2xl font-semibold">5</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertTriangle className="text-red-600" />
          </div>
          <div>
            <p className="text-gray-600">Atrasadas</p>
            <p className="text-2xl font-semibold">3</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <DollarSign className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-600">Custo Mensal</p>
            <p className="text-2xl font-semibold">R$ 15.450</p>
          </div>
        </div>
      </div>
    </div>
  );
}