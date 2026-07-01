export type CartItem = {
  id: string
  name: string
  slug: string
  image: string
  price: number
  qty: number
}

export const initialCartItems: CartItem[] = [
  {
    id: '25421',
    name: 'Haier 12AntirustCool 1 Ton Inverter Air Conditioner',
    slug: 'haier-12antirustcool-inverter-ac',
    image:
      '/images/image/cache/catalog/Air-Conditioner/Haier/Antirustcool/antirustcool-47x47.png',
    price: 44990,
    qty: 1,
  },
  {
    id: '25422',
    name: 'Haier 19UltimateCool 1.6 Ton Inverter Pro Air Conditioner',
    slug: 'haier-19ultimatecool-inverter-ac',
    image:
      '/images/image/cache/catalog/AirRun/AC-haier/ultimatecool-inverter-27-2-25_1-47x47.jpg',
    price: 79990,
    qty: 1,
  },
]
