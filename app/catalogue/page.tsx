'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ShoppingCart, Search, Plus, Minus, Upload, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

type Product = {
  id: number;
  PartNum: string;
  PartDescription: string;
  WebPart: boolean;
  WebInStock: number;
  ImageFileName: string;
}

function FileUpload({onFileChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
      >
        <Upload className="h-4 w-4" />
        <span>Télécharger un fichier</span>
      </label>
    </div>
  );
}

function Pagination({ currentPage, pageCount, onPageChange }) {
  const maxVisiblePages = 5;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - halfVisiblePages, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, pageCount);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {startPage > 1 && (
        <>
          <Button variant="outline" size="sm" onClick={() => onPageChange(1)}>1</Button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      {endPage < pageCount && (
        <>
          {endPage < pageCount - 1 && <span className="px-2">...</span>}
          <Button variant="outline" size="sm" onClick={() => onPageChange(pageCount)}>{pageCount}</Button>
        </>
      )}
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

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('PartNum')
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState('12')
  const [currentPage, setCurrentPage] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false)
  const [quoteEmail, setQuoteEmail] = useState('')
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [quantities, setQuantities] = useState<{[key: number]: string}>({})
  const [uploadedFile, setUploadedFile] = useState(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const filteredProducts = products.filter(product => 
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

  const pageCount = Math.ceil(filteredProducts.length / parseInt(itemsPerPage))
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * parseInt(itemsPerPage),
    currentPage * parseInt(itemsPerPage)
  )

  const addToCart = (productId: number, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        )
      } else {
        return [...prevCart, { id: productId, quantity }]
      }
    })
    setQuantities(prev => ({ ...prev, [productId]: '' }))
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      } else {
        return prevCart.filter(item => item.id !== productId)
      }
    })
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Quote requested for email:', quoteEmail)
    console.log('Uploaded file:', uploadedFile)
    setQuoteSubmitted(true)
    setCart([])
    setTimeout(() => {
      setQuoteSubmitted(false)
      setIsQuoteFormOpen(false)
      setQuoteEmail('')
      setUploadedFile(null)
      setIsCartOpen(false)
    }, 3000)
  }

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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductDetailOpen(true)
  }

  const handleFileChange = (file) => {
    setUploadedFile(file)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
  }

  const handleCartClose = () => {
    setIsCartOpen(false)
    setIsQuoteFormOpen(false)
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Produits UM</h1>
          <Button variant="outline" size="icon" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
        
        <div className="w-full mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Rechercher par nom ou référence..."
              className="pl-8 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
            <p>{filteredProducts.length} produits trouvés</p>
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
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Produits par page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 par page</SelectItem>
                  <SelectItem value="24">24 par page</SelectItem>
                  <SelectItem value="36">36 par page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Top Pagination */}
          <div className="my-4">
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedProducts.map(product => (
              <Card key={product.id} className="relative overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-md">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-1/2 h-48 md:h-full relative">
                    <Image
                      src={product.ImageFileName || "/placeholder.svg?height=400&width=300"}
                      alt={product.PartDescription}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                    {product.WebInStock > 0 && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                        En stock
                      </span>
                    )}
                  </div>
                  <CardContent 
                    className="p-4 flex flex-col justify-between w-full md:w-1/2"
                    onClick={(e) => {
                      if (!(e.target as HTMLElement).closest('button') && !(e.target as HTMLElement).closest('input')) {
                        handleProductClick(product)
                      }
                    }}
                  >
                    <div>
                      <h3 className="font-semibold text-lg  mb-1">{product.PartNum}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.PartDescription}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mt-auto">
                      <div className="flex items-center justify-between bg-gray-100 rounded-md p-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            decrementQuantity(product.id)
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="0"
                          value={quantities[product.id] || ''}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          className="w-12 text-center bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          onClick={(e) => e.stopPropagation()}
                          placeholder="0"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            incrementQuantity(product.id)
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product.id, parseInt(quantities[product.id] || '0'))
                        }} 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Bottom Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Shopping Cart Modal */}
      <Dialog open={isCartOpen} onOpenChange={handleCartClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Votre panier</DialogTitle>
          </DialogHeader>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-lg font-semibold mb-2">Votre panier est vide</p>
              <p className="text-sm text-gray-500 mb-4">Ajoutez des produits pour commencer vos achats</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => setIsCartOpen(false)}>
                  Découvrir nos produits
                </Button>
                <Button onClick={() => setIsQuoteFormOpen(true)} variant="outline">
                  Demander un devis
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-4 max-h-[300px] overflow-y-auto">
                {cart.map((item) => {
                  const product = products.find(p => p.id === item.id)
                  if (!product) return null
                  return (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-semibold">{product.PartNum}</p>
                        <p className="text-sm text-gray-600">{product.PartDescription}</p>
                        <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => addToCart(product.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <DialogFooter>
                {!isQuoteFormOpen && (
                  <Button onClick={() => setIsQuoteFormOpen(true)}>Demander un devis</Button>
                )}
              </DialogFooter>
            </>
          )}
          {isQuoteFormOpen && (
            <form onSubmit={handleQuoteSubmit} className="w-full">
              <div className="flex flex-col space-y-4">
                <label htmlFor="email">E-mail</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Votre adresse e-mail"
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  required
                />
                <FileUpload onFileChange={handleFileChange} />
                {uploadedFile && (
                  <p className="text-sm text-gray-500">
                    Fichier téléchargé : {uploadedFile.name}
                  </p>
                )}
                <Button type="submit">Envoyer la demande de devis</Button>
              </div>
            </form>
          )}
          {quoteSubmitted && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
              Votre demande de devis a bien été envoyée. Nous vous contacterons bientôt.
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Product Detail Modal */}
      <Dialog open={isProductDetailOpen} onOpenChange={setIsProductDetailOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.PartNum}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="bg-gray-200 h-60 w-60 mb-4 flex items-center justify-center mx-auto">
              <Image
                src={selectedProduct?.ImageFileName || "/placeholder.svg?height=240&width=240"}
                alt={selectedProduct?.PartDescription || "Product image"}
                width={240}
                height={240}
              />
            </div>
            <p className="text-lg font-semibold mb-2">{selectedProduct?.PartDescription}</p>
            <p className="text-sm font-semibold mb-2">En stock: {selectedProduct?.WebInStock}</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between bg-gray-100 rounded-md p-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                  onClick={() => selectedProduct && decrementQuantity(selectedProduct.id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="0"
                  value={selectedProduct ? (quantities[selectedProduct.id] || '') : ''}
                  onChange={(e) => selectedProduct && handleQuantityChange(selectedProduct.id, e.target.value)}
                  className="w-16 text-center bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                  onClick={() => selectedProduct && incrementQuantity(selectedProduct.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={() => selectedProduct && addToCart(selectedProduct.id, parseInt(quantities[selectedProduct.id] || '0'))} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> Ajouter au panier
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}