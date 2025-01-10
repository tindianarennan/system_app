import React, { useState } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import type { MaintenanceOrder, MaintenancePart, MaintenanceLabor } from '../../../types/fleet';

interface MaintenanceOrderFormProps {
  onClose: () => void;
  onSave: (order: Partial<MaintenanceOrder>) => void;
  initialData?: Partial<MaintenanceOrder>;
}

export default function MaintenanceOrderForm({ onClose, onSave, initialData }: MaintenanceOrderFormProps) {
  const [formData, setFormData] = useState<Partial<MaintenanceOrder>>(initialData || {
    type: 'preventive',
    priority: 'medium',
    status: 'open',
    parts: [],
    labor: []
  });

  const [parts, setParts] = useState<MaintenancePart[]>(initialData?.parts || []);
  const [labor, setLabor] = useState<MaintenanceLabor[]>(initialData?.labor || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, parts, labor });
  };

  const addPart = () => {
    setParts([...parts, {
      id: crypto.randomUUID(),
      name: '',
      quantity: 1,
      unitCost: 0,
      totalCost: 0
    }]);
  };

  const addLabor = () => {
    setLabor([...labor, {
      id: crypto.randomUUID(),
      description: '',
      hours: 0,
      ratePerHour: 0,
      totalCost: 0
    }]);
  };

  const updatePart = (index: number, updates: Partial<MaintenancePart>) => {
    const newParts = [...parts];
    newParts[index] = {
      ...newParts[index],
      ...updates,
      totalCost: (updates.quantity || parts[index].quantity) * (updates.unitCost || parts[index].unitCost)
    };
    setParts(newParts);
  };

  const updateLabor = (index: number, updates: Partial<MaintenanceLabor>) => {
    const newLabor = [...labor];
    newLabor[index] = {
      ...newLabor[index],
      ...updates,
      totalCost: (updates.hours || labor[index].hours) * (updates.ratePerHour || labor[index].ratePerHour)
    };
    setLabor(newLabor);
  };

  const removePart = (index: number) => {
    setParts(parts.filter((_, i) => i !== index));
  };

  const removeLabor = (index: number) => {
    setLabor(labor.filter((_, i) => i !== index));
  };

  const totalCost = [...parts, ...labor].reduce((sum, item) => sum + (item.totalCost || 0), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {initialData ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Veículo
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={formData.vehicleId}
                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                required
              >
                <option value="">Selecione um veículo</option>
                <option value="1">ABC-1234 - Volkswagen Constellation</option>
                <option value="2">DEF-5678 - Mercedes-Benz Actros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsável
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                required
              >
                <option value="">Selecione um responsável</option>
                <option value="1">João Silva - Mecânico</option>
                <option value="2">Maria Santos - Mecânica</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'preventive' | 'corrective' })}
                required
              >
                <option value="preventive">Preventiva</option>
                <option value="corrective">Corretiva</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
                required
              >
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Início
              </label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.startDate?.toString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Previsão de Término
              </label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                value={formData.estimatedEndDate?.toString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, estimatedEndDate: new Date(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 h-24"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Peças */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Peças</h3>
              <button
                type="button"
                onClick={addPart}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Plus size={20} />
                Adicionar Peça
              </button>
            </div>
            
            <div className="space-y-4">
              {parts.map((part, index) => (
                <div key={part.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <input
                      type="text"
                      placeholder="Nome da Peça"
                      className="w-full border rounded-lg px-3 py-2"
                      value={part.name}
                      onChange={(e) => updatePart(index, { name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Qtd"
                      className="w-full border rounded-lg px-3 py-2"
                      value={part.quantity}
                      onChange={(e) => updatePart(index, { quantity: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Valor Unit."
                      className="w-full border rounded-lg px-3 py-2"
                      value={part.unitCost}
                      onChange={(e) => updatePart(index, { unitCost: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Total"
                      className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                      value={part.totalCost}
                      readOnly
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => removePart(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mão de Obra */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Mão de Obra</h3>
              <button
                type="button"
                onClick={addLabor}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Plus size={20} />
                Adicionar Serviço
              </button>
            </div>
            
            <div className="space-y-4">
              {labor.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <input
                      type="text"
                      placeholder="Descrição do Serviço"
                      className="w-full border rounded-lg px-3 py-2"
                      value={item.description}
                      onChange={(e) => updateLabor(index, { description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Horas"
                      className="w-full border rounded-lg px-3 py-2"
                      value={item.hours}
                      onChange={(e) => updateLabor(index, { hours: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Valor/Hora"
                      className="w-full border rounded-lg px-3 py-2"
                      value={item.ratePerHour}
                      onChange={(e) => updateLabor(index, { ratePerHour: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Total"
                      className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                      value={item.totalCost}
                      readOnly
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => removeLabor(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 h-24"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-lg font-semibold">
              Custo Total: R$ {totalCost.toFixed(2)}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={20} />
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}