import type { DirectusUser } from '@directus/sdk';

export interface Schema {
  user_vehicles: UserVehicle[];
  vehicle_owners: VehicleOwner[];
}

export interface UserVehicle {
  id: string;
  status: 'published' | 'draft' | 'archived';
  user_created: DirectusUser<Schema> | string | null;
  date_created: 'datetime' | null;
  user_updated: DirectusUser<Schema> | string | null;
  date_updated: 'datetime' | null;

  license_plate: string;
  vin: string;
  make: string;
  model: string;
  year: string;
  color: string;
  last_service_date: 'datetime';
  mileage: number;
  next_service_due_date: 'datetime';
  next_service_due_mileage: number;
  registration_date: 'datetime';
  primary_image: string;
  owners: number[] | VehicleOwner[];
}

interface VehicleOwner {
  id: number;
  vehicle: string | UserVehicle;
  user: string | DirectusUser<Schema>;
}
