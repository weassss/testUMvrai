'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { ShoppingCart, Search, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const SpiralLoader = () => {
  const dots = 8
  const radius = 20

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative h-16 w-16">
        {[...Array(dots)].map((_, index) => {
          const angle = (index / dots) * (2 * Math.PI)
          const x = radius * Math.cos(angle)
          const y = radius * Math.sin(angle)

          return (
            <motion.div
              key={index}
              className="absolute h-3 w-3 rounded-full"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                background: 'linear-gradient(135deg, #34D399 0%, #3B82F6 100%)',
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: (index / dots) * 1.5,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </div>
      <p className="absolute mt-24 text-gray-600">Chargement des produits...</p>
    </div>
  )
}


type Product = {
  id: number;
  PartNum: string;
  PartDescription: string;
  WebPart: boolean;
  WebInStock: number;
  ImageFileName: string;
}

function Pagination({ currentPage, pageCount, onPageChange }) {
  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span>{currentPage} of {pageCount}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
        disabled={currentPage === pageCount}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function Catalogue() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('PartNum')
  const [itemsPerPage, setItemsPerPage] = useState('12')
  const [currentPage, setCurrentPage] = useState(1)
  const [quantities, setQuantities] = useState<{[key: number]: string}>({})
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [columnCount, setColumnCount] = useState(4)
  const [isTableView, setIsTableView] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('https://um-pilot.epicorsaas.com/server/api/v2/odata/166476/Erp.BO.PartSvc/Parts?%24select=PartNum%2C%20PartDescription%2C%20WebPart%2C%20WebInStock%2C%20ImageFileName&%24count=true', {
          headers: {
            'Authorization': 'Basic ' + btoa('ladiba:Scolinfo2@'),
            'X-API-Key': '326AQDLjgKGgBdJ3OGYj1fl1BE6x2OuFNpvfjBxcnhvYe'
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data.value.map((item, index) => ({
          id: index + 1,
          ...item
        })))
      } catch (err) {
        setError('An error occurred while fetching products. Please try again later.')
        console.error('Error fetching products:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      searchQuery === '' || 
      product.PartDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.PartNum.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
      switch (sortBy) {
        case 'PartNum':
          return a.PartNum.localeCompare(b.PartNum)
        case 'PartDescription':
          return a.PartDescription.localeCompare(b.PartDescription)
        default:
          return 0
      }
    })
  }, [products, searchQuery, sortBy])

  const pageCount = Math.ceil(filteredProducts.length / parseInt(itemsPerPage))

  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * parseInt(itemsPerPage)
    return filteredProducts.slice(startIndex, startIndex + parseInt(itemsPerPage))
  }, [filteredProducts, currentPage, itemsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage, searchQuery, sortBy])

  const handleQuantityChange = (productId: number, value: string) => {
    setQuantities(prev => ({ ...prev, [productId]: value }))
  }

  const incrementQuantity = (productId: number) => {
    setQuantities(prev => {
      const currentValue = prev[productId] || ''
      const newValue = (parseInt(currentValue) || 0) + 1
      return { ...prev, [productId]: newValue.toString() }
    })
  }

  const decrementQuantity = (productId: number) => {
    setQuantities(prev => {
      const currentValue = prev[productId] || ''
      const newValue = Math.max((parseInt(currentValue) || 0) - 1, 0)
      return { ...prev, [productId]: newValue.toString() }
    })
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  const handleAddToCart = (productId: number) => {
    const quantity = parseInt(quantities[productId] || '0')
    if (quantity > 0) {
      console.log(`Added ${quantity} of product ${productId} to cart`)
      // Here you would typically update your cart state or send a request to your backend
      setQuantities(prev => ({ ...prev, [productId]: '0' }))
    }
  }

  const handleColumnCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setColumnCount(Math.max(1, Math.min(6, value)));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <SpiralLoader />
      </div>
    )
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Catalogue de Produits</h1>
        
        <div className="w-full mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher par nom ou référence..."
              className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
            <p className="text-gray-600">{filteredProducts.length} produits trouvés</p>
            <div className="flex flex-wrap items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PartNum">Référence</SelectItem>
                  <SelectItem value="PartDescription">Description</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <label htmlFor="itemsPerPage" className="text-sm font-medium">Produits par page:</label>
                <Input
                  id="itemsPerPage"
                  type="number"
                  min="1"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(e.target.value)}
                  className="w-20"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="columnCount" className="text-sm font-medium">Colonnes:</label>
                <Input
                  id="columnCount"
                  type="number"
                  min="1"
                  max="6"
                  value={columnCount}
                  onChange={handleColumnCountChange}
                  className="w-16"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Grid</span>
                <Switch
                  checked={isTableView}
                  onCheckedChange={setIsTableView}
                />
                <span className="text-sm font-medium">Table</span>
              </div>
            </div>
          </div>
          
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />

          {isTableView ? (
            <div className="overflow-hidden rounded-lg bg-white/10 backdrop-blur-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell>{product.PartNum}</TableCell>
                      <TableCell>{product.PartDescription}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => decrementQuantity(product.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="0"
                            value={quantities[product.id] || ''}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            className="w-16 text-center"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => incrementQuantity(product.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => handleAddToCart(product.id)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter au panier
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6`} style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
              {displayedProducts.map(product => (
                <Card key={product.id} className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
                  <div className="flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.ImageFileName || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/300x300-HIuIKytN8ir4XQvcGRqP7LfZj29o6q.svg"}
                        alt={product.PartDescription}
                        fill
                        className="object-cover rounded-t-lg"
                        sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                      {product.WebInStock > 0 && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                          En stock
                        </span>
                      )}
                    </div>
                    <CardContent className="p-4 flex flex-col justify-between flex-grow">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-base sm:text-lg text-primary line-clamp-1">{product.PartNum}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{product.PartDescription}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                        <div className="flex items-center space-x-2 w-full sm:w-auto">
                          <Button onClick={() => decrementQuantity(product.id)} className="p-2" variant="outline" size="sm">
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="text"
                            value={quantities[product.id] || ''}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            className="text-center w-16"
                          />
                          <Button onClick={() => incrementQuantity(product.id)} className="p-2" variant="outline" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          className="bg-primary text-white hover:bg-primary-dark w-full sm:w-auto" 
                          onClick={() => handleAddToCart(product.id)}
                          size="sm"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Ajouter
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}