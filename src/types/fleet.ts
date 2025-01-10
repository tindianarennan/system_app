export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  year: number;
  status: 'active' | 'maintenance' | 'inactive';
  lastMaintenance?: Date;
  fuelLevel: number;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: Date;
  type: 'preventive' | 'corrective';
  description: string;
  cost: number;
  status: 'scheduled' | 'in-progress' | 'completed';
}

export interface FuelRecord {
  id: string;
  vehicleId: string;
  date: Date;
  liters: number;
  cost: number;
  odometer: number;
}

export interface TireRecord {
  id: string;
  vehicleId: string;
  position: string;
  brand: string;
  installDate: Date;
  treadDepth: number;
  status: 'good' | 'warning' | 'critical';
}

export interface ChecklistItem {
  id: string;
  vehicleId: string;
  date: Date;
  items: {
    name: string;
    status: 'ok' | 'attention' | 'critical';
    notes?: string;
  }[];
  inspector: string;
}

export type MaintenanceStatus = 'all' | 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface MaintenanceOrder {
  id: string;
  vehicleId: string;
  description: string;
  type: 'preventive' | 'corrective';
  priority: 'high' | 'medium' | 'low';
  status: Exclude<MaintenanceStatus, 'all'>;
  assignedTo: string;
  startDate: Date;
  estimatedEndDate: Date;
  actualEndDate?: Date;
  cost?: number;
  parts: MaintenancePart[];
  labor: MaintenanceLabor[];
  notes?: string;
}

export interface MaintenancePart {
  id: string;
  name: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface MaintenanceLabor {
  id: string;
  description: string;
  hours: number;
  ratePerHour: number;
  totalCost: number;
}