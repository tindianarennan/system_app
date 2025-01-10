import React from 'react';
import { Clock, Tool, User, Car } from 'lucide-react';
import { MaintenanceStatus } from '../../../types/fleet';

interface MaintenanceListProps {
  status: MaintenanceStatus;
}

export default function MaintenanceList({ status }: MaintenanceListProps) {
  const maintenanceOrders = [
    {
      id: '1',
      vehicle: 'ABC-1234',
      description: 'Troca de óleo e filtros',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'João Silva',
      startDate: '2024-03-15',
      estimatedEnd: '2024-03-16',
    },
    {
      id: '2',
      vehicle: 'XYZ-5678',
      description: 'Revisão dos freios',
      status: 'open',
      priority: 'medium',
      assignedTo: 'Carlos Santos',
      startDate: '2024-03-16',
      estimatedEnd: '2024-03-17',
    },
    {
      id: '3',
      vehicle: 'DEF-9012',
      description: 'Alinhamento e balanceamento',
      status: 'completed',
      priority: 'low',
      assignedTo: 'Pedro Oliveira',
      startDate: '2024-03-14',
      estimatedEnd: '2024-03-14',
    },
  ];

  const filteredOrders = status === 'all' 
    ? maintenanceOrders 
    : maintenanceOrders.filter(order => order.status === status);

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || colors.open;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  return (
    <div className="space-y-4">
      {filteredOrders.map((order) => (
        <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status === 'in_progress' ? 'Em Andamento' : 
                 order.status === 'open' ? 'Em Aberto' : 
                 order.status === 'completed' ? 'Concluída' : 'Cancelada'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(order.priority)}`}>
                {order.priority === 'high' ? 'Alta' : 
                 order.priority === 'medium' ? 'Média' : 'Baixa'}
              </span>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              Ver Detalhes
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-2">
              <Car size={20} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Veículo</p>
                <p className="font-medium">{order.vehicle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Tool size={20} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Serviço</p>
                <p className="font-medium">{order.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User size={20} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Responsável</p>
                <p className="font-medium">{order.assignedTo}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={20} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Prazo</p>
                <p className="font-medium">{order.estimatedEnd}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}