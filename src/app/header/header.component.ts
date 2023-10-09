import { Component,OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   
   totalitemCount:number=0
  constructor(private api:ApiService){

  }
 
ngOnInit(): void {
  this.api.cartitemcount.subscribe((count:any)=>{
   this.totalitemCount = count
  })
}

search(event:any){
//next-method : assign value to behaviour subject
this.api.searchTerm.next(event.target.value)
}
}
