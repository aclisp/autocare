import type { DirectusFile, DirectusUser } from '@directus/sdk';

export interface Schema {
  user_vehicles: UserVehicle[];
  products: Product[];
  product_category: ProductCategory[];
  sku: SKU[];
  inventory: Inventory[];
  inventory_changes: InventoryChange[];
  warehouse: Warehouse[];
  auto_service_stores: AutoServiceStore[];
  service_offerings: ServiceOffering[];
  technicians: Technician[];
}

export interface Inventory extends EntityShared {
  sku: string | SKU;
  warehouse: string | Warehouse;
  quantity: number;
  changes: string[] | InventoryChange[];
}

export interface InventoryChange extends EntityShared {
  inventory: string | Inventory;
  change_type: 'increasing' | 'decreasing';
  before_quantity: number;
  after_quantity: number;
}

export interface Warehouse extends EntityShared {
  name: string;
  stores: number[] | StoreWarehouse[];
}

interface StoreWarehouse {
  id: number;
  store: string | AutoServiceStore;
  warehouse: string | Warehouse;
}

export interface AutoServiceStore extends EntityShared {
  name: string;
  address: string;
  location: 'json';
  store_phone: string;
  opening_hours_start: 'datetime';
  opening_hours_end: 'datetime';
  primary_image: string;
  carousel_images: number[] | AutoServiceStoreImage[];
  technicians: number[] | StoreTechnician[];
  services: number[] | StoreService[];
  warehouse: number[] | StoreWarehouse[];
}

interface AutoServiceStoreImage {
  id: number;
  auto_service_stores_id: string | AutoServiceStore;
  directus_files_id: string | DirectusFile<Schema>;
}

interface StoreTechnician {
  id: number;
  store_id: string | AutoServiceStore;
  technician_id: string | Technician;
}

interface StoreService {
  id: number;
  store_id: string | AutoServiceStore;
  service_id: string | ServiceOffering;
  price: number;
}

export interface ServiceOffering extends EntityShared {
  name: string;
  default_price: number;
  primary_image: string;
}

export interface Technician extends EntityShared {
  first_name: string;
  last_name: string;
  specialty: string;
  phone_number: string;
  hire_date: 'datetime';
  primary_image: string;
  service_stores: number[] | StoreTechnician[];
}

interface EntityShared {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort: number;
  user_created: DirectusUser<Schema> | string | null;
  date_created: 'datetime' | null;
  user_updated: DirectusUser<Schema> | string | null;
  date_updated: 'datetime' | null;
}

export interface UserVehicle extends EntityShared {
  license_plate: string;
  vin: string | null;
  make: string | null;
  model: string | null;
  year: string | null;
  color: string | null;
  last_service_date: 'datetime' | null;
  mileage: number | null;
  next_service_due_date: 'datetime' | null;
  next_service_due_mileage: number | null;
  registration_date: 'datetime' | null;
  primary_image: string;
  owners: number[] | VehicleOwner[];
}

interface VehicleOwner {
  id: number;
  vehicle: string | UserVehicle;
  user: string | DirectusUser<Schema>;
}

export interface Product extends EntityShared {
  name: string;
  category: string | ProductCategory;
}

export interface ProductCategory extends EntityShared {
  name: string;
  parent: string | ProductCategory;
  children: string[] | ProductCategory[];
}

export interface SKU extends EntityShared {
  name: string;
  sku_code: string;
  product: string | Product;
  cost: number;
  price: number;
  primary_image: string;
  spec_options: number[] | SKUSpecOption[];
}

interface SKUSpecOption {
  id: number;
  sku: string | SKU;
  spec_option: string | ProductSpecOption;
}

export interface ProductSpecOption extends EntityShared {
  spec_attr: string | ProductSpecAttr;
  value: string;
}

export interface ProductSpecAttr extends EntityShared {
  product: string | Product;
  name: string;
}
