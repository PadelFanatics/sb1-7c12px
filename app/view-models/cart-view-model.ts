import { Observable, Frame } from '@nativescript/core';
import { Product } from '../models/product.model';

interface CartItem extends Product {
    quantity: number;
}

export class CartViewModel extends Observable {
    private _cartItems: Array<CartItem> = [];
    private _total: number = 0;

    constructor() {
        super();
        this.loadCartItems();
    }

    private loadCartItems() {
        // In a real app, this would load from storage or API
        this.calculateTotal();
    }

    private calculateTotal() {
        this._total = this._cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.notifyPropertyChange('total', this._total);
    }

    get cartItems(): Array<CartItem> {
        return this._cartItems;
    }

    get total(): number {
        return this._total;
    }

    increaseQuantity(args: any) {
        const item = args.object.bindingContext;
        item.quantity++;
        this.calculateTotal();
    }

    decreaseQuantity(args: any) {
        const item = args.object.bindingContext;
        if (item.quantity > 1) {
            item.quantity--;
            this.calculateTotal();
        }
    }

    onCheckout() {
        Frame.topmost().navigate({
            moduleName: 'pages/checkout-page',
            transition: { name: 'slide' }
        });
    }
}