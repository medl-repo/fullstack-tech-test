export type InventoryItem = {
  id?: number;
  productName: string;
  price: number;
  totalQuantity: number;
  tax: boolean;
  taxPercentage?: number;
  lowStockCount: number;
  expiryDate?: Date;
  createdAt?: string;
  substituteItems?: InventoryItem[];
  isOutOfStock: boolean;
};

export class Inventory {
  store: InventoryItem[] = [];

  populateDB() {
    this.store = [];
    const inventory1 = {
      productName: "Paracetamol",
      price: 20,
      totalQuantity: 50,
      tax: false,
      taxPercentage: 2,
      lowStockCount: 10,
      isOutOfStock: false,
      id: Date.now(),
    };

    const inventory2 = {
      productName: "Panadol",
      price: 10,
      totalQuantity: 32,
      tax: true,
      taxPercentage: 6,
      lowStockCount: 4,
      isOutOfStock: true,
      id: Date.now() + 1,
    };

    this.store.push(inventory1);
    this.store.push(inventory2);
  }

  getItems(): InventoryItem[] {
    return this.store;
  }

  getItem(itemId: number): InventoryItem | null {
    return this.store.filter((item) => {
      return item.id == itemId;
    })[0];
  }

  addItem(item: InventoryItem): InventoryItem {
    this.store.push(item);
    return item;
  }

  removeItem(itemId: number): void {
    this.store = this.store.filter((item) => {
      return item.id != itemId;
    });
  }

  updateItem(id: number, details: InventoryItem): InventoryItem | null {
    // TODO: TASK 1 ====> Do updates operations here ---> Update single item

    return null;
  }
}
