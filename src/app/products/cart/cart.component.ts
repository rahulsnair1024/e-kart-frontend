import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
// paypal import
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //  paypal property
  public payPalConfig ? : IPayPalConfig;


   cartitems:any=[]
   cartTotalPrice:number=0
   offerStatus:boolean = false
   finalPrice:number = 0
   offertagStatus:boolean  = true
   paymentbtn:boolean = false
   makepaymentstatus:boolean = false
   showSuccess:boolean = false
   showCancel:boolean = false
   showError:boolean = false

  user:any={}
  addressForm = this.fb.group({
    username:[''],
    addr1:[''],
    addr2:[''],
    state:['']
  })
  


  constructor(private api:ApiService, private fb:FormBuilder){

  }
  ngOnInit(): void {
   this.getcart() 
    // call paypal
    this.initConfig();
  }
  getcart(){
    this.api.getcart().subscribe((result:any)=>{
      console.log(result)
      this.cartitems = result
      // call cart price
      this.getcarttotalprice()
      },
     (result:any)=>{
      console.log(result.error);
      } 
    )
  }

  //getcarttotalprice
  getcarttotalprice(){
    let total = 0
  this.cartitems.forEach((item:any)=>{
  total+= item.grandTotal
  this.cartTotalPrice = Math.ceil(total)
  this.finalPrice = this.cartTotalPrice
  })
  }
  
  // remove cart item
  removecartitem(id:any){
  this.api.removeCartitem(id).subscribe((result:any)=>{
    this.cartitems = result
    //call cart price
    this.getcarttotalprice()
    // to change cart count
    this.api.cartcount()
  },
  (result:any)=>{
    alert(result.error)
  }
  )
  }



  //increment cart item
  incrCartItem(id:any){
    this.api.incrCartitem(id).subscribe((result)=>{
      this.cartitems = result
      //call cart price
      this.getcarttotalprice()
      // to change cart count
      this.api.cartcount()
    },
    (result:any)=>{
      alert(result.error)
    })
}




// decrement cart item
decrCartItem(id:any){
  this.api.decrCartitem(id).subscribe((result)=>{
    this.cartitems = result
    //call cart price
    this.getcarttotalprice()
    // to change cart count
    this.api.cartcount()
  },
  (result:any)=>{
    alert(result.error)
  })
}


//empty cart
emptycart(){
  this.api.emptycart().subscribe((result:any)=>{
 this.cartitems = []
 //call cart price
 this.getcarttotalprice()
 // to change cart count
 this.api.cartcount()
  },
  (result:any)=>{
    alert(result.error)
})
}

//view offers()
viewOffers(){
this.offerStatus = true
}

// discount10()
discount10(){
  let discount = this.cartTotalPrice *10/100
  this.finalPrice = this.cartTotalPrice - discount
  this.offerStatus = false
  this.offertagStatus = false
}

// discount50()
discount50(){
  let discount = this.cartTotalPrice *50/100
  this.finalPrice = this.cartTotalPrice - discount
  this.offerStatus = false
  this.offertagStatus = false
}

//submit
submit(){
  if(this.addressForm.valid){
   this.paymentbtn = true
   this.user.username = this.addressForm.value.username
  this.user. addr1 = this.addressForm.value.addr1
   this.user. addr2 = this.addressForm.value.addr2
   this.user. state = this.addressForm.value.state
  }
  else{
    alert('invalid form')
  }
}

// make payment status
makepayment(){
  this.makepaymentstatus = true
}

// paypal function
private initConfig(): void {
  this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                  breakdown: {
                      item_total: {
                          currency_code: 'EUR',
                          value: '9.99'
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'EUR',
                      value: '9.99',
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details:any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
          });

      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          this.showSuccess = true;
          //alert('payment successfully completed... Your order is confirmed!!!!)
          //empty cart
          this.emptycart()
          this.makepaymentstatus = false
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          this.showCancel = true;
           this.makepaymentstatus = false

      },
      onError: err => {
          console.log('OnError', err);
          this.showError = true;
           this.makepaymentstatus = false
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
          // this.resetStatus();
           
      }
  };
}

//modelClose()
modalClose(){
  this.addressForm.reset()
  this.paymentbtn = false
  this.makepaymentstatus = false
  this.showSuccess = false
  this.showCancel = false
  this.showError = false

}

}



