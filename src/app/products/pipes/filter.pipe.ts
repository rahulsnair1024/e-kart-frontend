import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproducts:any[],searchterm:string,propertyname:string):any {
    const result:any =[]
    if(!allproducts || searchterm==""  || propertyname==""){
      return allproducts
    }
    allproducts.forEach((item:any)=>{
      if(item[propertyname].trim().toLowerCase().includes(searchterm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
