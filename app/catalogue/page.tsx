'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/CartContext';

const products = [
  { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 19.99 },
  { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 29.99 },
  { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 39.99 },
  { id: 4, name: 'Product 4', description: 'Description for Product 4', price: 49.99 },
  { id: 5, name: 'Product 5', description: 'Description for Product 5', price: 59.99 },
  { id: 6, name: 'Product 6', description: 'Description for Product 6', price: 69.99 },
  { id: 7, name: 'Product 7', description: 'Description for Product 7', price: 79.99 },
  { id: 8, name: 'Product 8', description: 'Description for Product 8', price: 89.99 },
  { id: 9, name: 'Product 9', description: 'Description for Product 9', price: 99.99 },
];

export default function Catalogue() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (id: number, value: string) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      setQuantities((prev) => ({ ...prev, [id]: quantity }));
    }
  };

  const handleAddToCart = (product: typeof products[0]) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });
    setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Product Catalogue</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 w-full mb-4 bg-gray-300">
                <Image
                  src="/placeholder.png"
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 w-full">
                <Input
                  type="number"
                  min="0"
                  value={quantities[product.id] || 0}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  className="w-20"
                />
                <Button 
                  className="flex-grow"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}