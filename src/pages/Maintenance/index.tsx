import React, { useState } from 'react';
import { Plus, Filter, Clock, History, DollarSign } from 'lucide-react';
import MaintenanceList from './components/MaintenanceList';
import MaintenanceStats from './components/MaintenanceStats';
import MaintenanceOrderForm from './components/MaintenanceOrderForm';
import type { MaintenanceOrder, MaintenanceStatus } from '../../types/fleet';

export default function Maintenance() {
  const [selectedStatus, setSelectedStatus] = useState<MaintenanceStatus>('all');
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleSaveOrder = (order: Partial<MaintenanceOrder>) => {
    console.log('Ordem de serviço salva:', order);
    setShowOrderForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manutenção</h1>
        <button
          onClick={() => setShowOrderForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Nova O.S.
        </button>
      </div>

      <MaintenanceStats />

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as MaintenanceStatus)}
              className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Status</option>
              <option value="open">Em Aberto</option>
              <option value="in_progress">Em Andamento</option>
              <option value="completed">Concluída</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Clock size={20} />
              Agendadas
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <History size={20} />
              Histórico
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <DollarSign size={20} />
              Custos
            </button>
          </div>
        </div>

        <MaintenanceList status={selectedStatus} />
      </div>

      {showOrderForm && (
        <MaintenanceOrderForm
          onClose={() => setShowOrderForm(false)}
          onSave={handleSaveOrder}
        />
      )}
    </div>
  );
}