import { Observable, Frame } from '@nativescript/core';
import { Product } from '../models/product.model';

export class ShopViewModel extends Observable {
    private _selectedTabIndex: number = 0;
    private _cartItemCount: number = 0;
    private _allProducts: Array<Product> = [];
    private _rackets: Array<Product> = [];
    private _bags: Array<Product> = [];
    private _shoes: Array<Product> = [];
    private _accessories: Array<Product> = [];
    private _balls: Array<Product> = [];

    constructor() {
        super();
        this.loadProducts();
    }

    private loadProducts() {
        // Sample data - in a real app, this would come from an API
        this._rackets = [
            {
                id: '1',
                name: 'Pro Carbon Racket',
                description: 'Professional grade padel racket with carbon fiber construction',
                price: 299.99,
                image: '~/images/products/racket1.jpg',
                category: 'rackets'
            },
            // Add more rackets
        ];

        this._bags = [
            {
                id: '2',
                name: 'Premium Padel Bag',
                description: 'Spacious bag with multiple compartments',
                price: 89.99,
                image: '~/images/products/bag1.jpg',
                category: 'bags'
            },
            // Add more bags
        ];

        // Similar arrays for other categories
        this._allProducts = [
            ...this._rackets,
            ...this._bags,
            ...this._shoes,
            ...this._accessories,
            ...this._balls
        ];

        this.notifyPropertyChange('allProducts', this._allProducts);
    }

    get selectedTabIndex(): number {
        return this._selectedTabIndex;
    }

    set selectedTabIndex(value: number) {
        if (this._selectedTabIndex !== value) {
            this._selectedTabIndex = value;
            this.notifyPropertyChange('selectedTabIndex', value);
        }
    }

    get cartItemCount(): number {
        return this._cartItemCount;
    }

    get allProducts(): Array<Product> {
        return this._allProducts;
    }

    get rackets(): Array<Product> {
        return this._rackets;
    }

    get bags(): Array<Product> {
        return this._bags;
    }

    get shoes(): Array<Product> {
        return this._shoes;
    }

    get accessories(): Array<Product> {
        return this._accessories;
    }

    get balls(): Array<Product> {
        return this._balls;
    }

    onAddToCart(args: any) {
        const product = args.object.bindingContext;
        this._cartItemCount++;
        this.notifyPropertyChange('cartItemCount', this._cartItemCount);
        // Add to cart logic here
    }

    showCart() {
        Frame.topmost().navigate({
            moduleName: 'pages/cart-page',
            transition: { name: 'slide' }
        });
    }
}