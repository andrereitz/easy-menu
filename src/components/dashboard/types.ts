export interface BusinessData {
  business_color: string,
  business_logo: string,
  business_name: string,
  business_url: string,
  email: string,
  id: number,
}

export interface Category {
  id: number,
  title: string,
  user: number
}

export interface MenuItem {
  id: number,
  user: number,
  category: number,
  title: string,
  description: string,
  price: number,
  media_id: number,
}