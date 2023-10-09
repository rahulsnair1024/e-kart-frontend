import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allproducts: any = []
  searchKey: string = ''
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    //make api call to get all products
    this.api.getallproducts().subscribe((result: any) => {
      console.log(result);
      this.allproducts = result
    },
      (result: any) => {
        console.log(result.error);
      })

    //to get behaviour subject from api service
    this.api.searchTerm.subscribe((result) => {
      console.log(result);
      this.searchKey = result
    })
  }
  
  //add to cart(product)
  addtocart(product:any){
  console.log(product);
  //add quantity key to product object with value as 1 
  Object.assign(product,{quantity:1})

    //call api
    this.api.addToCart(product).subscribe((result:any)=>{
      //call method to get cart count
      this.api.cartcount()
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }
}

