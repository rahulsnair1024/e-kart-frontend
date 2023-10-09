import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  //to hold searchterm as behavior subject
  searchTerm = new BehaviorSubject('')
  // to hold cart total count
  cartitemcount = new BehaviorSubject(0)
  //cartitems
  cartItems = []



    //  BASE_URL = 'http://localhost:3000'
  // deployed node server = https://cart-aax4.onrender.com/
 
     BASE_URL = 'https://cart-aax4.onrender.com'


  constructor(private http:HttpClient) {
    this.cartcount()
   }

  //get all product api
  getallproducts(){
    //call api
  return  this.http.get(`${this.BASE_URL}/products/get-all-products`)
  }

  //view product detail api
  viewAproduct(id:any){
    //call api
  return this.http.get(`${this.BASE_URL}/products/${id}`)
  }

  //product/add-to-wishlist api
  addtowishlist(product:any){
     const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image
     }
   return this.http.post(`${this.BASE_URL}/products/add-to-wishlist`,body)
  }

  //get all items from wishlist
  getwishlistitems(){
    //api call
  return this.http.get(`${this.BASE_URL}/wishlists/get-all-items`)
  }

  // removing an item from wishlist
  removewishlistitem(id:any){
  return this.http.delete(`${this.BASE_URL}/wishlists/remove-item/${id}`)
  }

  // add to cart
  addToCart(product:any){
    const body={
      id:product.id,
      title:product.title,
      image:product.image,
      price:product.price,
      quantity:product.quantity
  }
  //api call
  return this.http.post(`${this.BASE_URL}/products/add-to-cart`,body)
  }

  //get cart
  getcart(){
    return this.http.get(`${this.BASE_URL}/cart/get-all-items`)
  }

  //cartcount
  cartcount(){
    this.getcart().subscribe((result:any)=>{
      this.cartitemcount.next(result.length)
    })
  }

  //remove card item api
  removeCartitem(id:any){
    //api call
  return this.http.delete(`${this.BASE_URL}/cart/item/${id}`)
  }


  //increment cart item
  incrCartitem(id:any){
   //api call
   return this.http.get(`${this.BASE_URL}/cart/increment-item/${id}`)
  }

  //decrement cart item
  decrCartitem(id:any){
    //api call
    return this.http.get(`${this.BASE_URL}/cart/decrement-item/${id}`)
   }


   //empty cart
   emptycart(){
    //api call
    return this.http.delete(`${this.BASE_URL}/cart/empty-cart`)
   }

  }
