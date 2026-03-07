interface PriceItem {
  service: string;
  price: string;
  note?: string;
}

export interface PriceList {
  id: string;
  title: string;
  valid_from: string;
  items: PriceItem[];
  icon: React.ReactNode;
}