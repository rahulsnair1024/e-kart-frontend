import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
   
  wishlistItems:any=[]
  constructor(private api:ApiService){

  }
  ngOnInit(): void {
   this.api.getwishlistitems().subscribe(
    (result:any)=>{
    console.log(result);
    this.wishlistItems = result
    },
    (result:any)=>{
      alert(result.error);
      }
  )
  }

  //remove item from wishlist
  removewishlistitem(id:any){
    //api call
    this.api.removewishlistitem(id).subscribe((result:any)=>{
      this.wishlistItems = result
   },
   (result:any)=>{
   console.log(result.error);
   }
   )
  }


  // add to cart(product)
  addtocart(product:any){
    console.log(product);
    //add quantity key to product object with value as 1 
    Object.assign(product,{quantity:1})
    console.log(product);
    
  
      //call api
      this.api.addToCart(product).subscribe((result:any)=>{
        //call method to get cart count
        this.api.cartcount()
        //to remove item from wishlist
        this.removewishlistitem(product.id)
        alert(result)
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }


}
