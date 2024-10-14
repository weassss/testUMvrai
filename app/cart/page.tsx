'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
      <div className="max-w-4xl mx-auto">
        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="mt-8 text-right">
          <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
          <Button className="mt-4" disabled={cart.length === 0}>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
}