export type CartItem = {
  id: string
  name: string
  slug: string
  image: string
  price: number
  qty: number
}

export const initialCartItems: CartItem[] = []
