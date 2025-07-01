
declare global {
  interface BluetoothDevice {
    readonly id: string;
    readonly name?: string;
  }

  interface BluetoothRequestDeviceOptions {
    filters?: any[];
    optionalServices?: string[];
    acceptAllDevices?: boolean;
  }

  interface Bluetooth {
    requestDevice(options?: BluetoothRequestDeviceOptions): Promise<BluetoothDevice>;
  }

  interface Navigator {
    readonly bluetooth: Bluetooth;
  }
}

export enum AppState {
  INITIAL,
  SCANNING,
  MERCHANT_LIST,
  PAYMENT,
  SUCCESS,
}

export interface Merchant {
  id: string;
  name: string;
  upiId: string;
  rssi: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Should be a hash in a real app
  profilePicture?: string;
}
