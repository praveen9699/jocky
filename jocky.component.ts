import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jocky',
  templateUrl: './jocky.component.html',
  styleUrls: ['./jocky.component.css']
})
export class JockyComponent implements OnInit {
  basic:string =  ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5MGZkOWNkNS0yNDk5LTQ0MWMtODA3Yi1kZGZlZWNjNzczZGEiLCJhaWQiOiJDQUQ1MDU5MC1BMTg5LTQxNEYtQTJGNS0xMDMzOUQxRjlGOTciLCJkaWQiOiI0NDQ5NkIwMy0zNjQ3LTQ5MEMtQjJGMC0yRTE1OUIyN0QyNzgiLCJuYmYiOjE2NjQzNDU4NzUsImV4cCI6MTY2NDQzMjI3NSwiaWF0IjoxNjY0MzQ1ODc1fQ.lsrNFrTuu36_sWC-joWm2zy-_p31FCafiq_e8homXkA'
  count:any; 
  data:any;
  chunkedData: any;
  value:any;
  fecetData:any;
  Facets: any[] = [];
  sortBy= "";
  ctn:boolean =false;
  ctnPlstr:boolean =false;
  plstr:boolean =false;
  xyz: any;
  
  constructor( public http: HttpClient) { }
  
  ngOnInit(): void { 
    this.getData()
  // }this.items.push(this.value)
  }
  getData(){
    let headers = new HttpHeaders({
      'content-Type':'application/json',
      'Authorization':'Bearer '+this.basic
    });
    
    let option = {headers:headers};
    this.http.get('https://api.jockey.in/api/productsbystyles?cat1=men&cat2=apparel-tops&cat3=t-shirts&cat4=&pno=1&ps=12&by=&ctkn=&dir=&f=',option).subscribe((res:any) => {
      this.count = res.RowCount
      this.xyz = res.Data
      this.data = res.Data.StyleDetails
      this.fecetData = res.Data.Facets
      this.chunkedData = this.spliceIntoChunks(this.data, 3);
    })
  }
  changeImg(productId: any, colorName: any) {
    debugger
    let h = this.xyz
    let jhjk = this.data
    for (var i = 0; i < this.xyz.StyleDetails.length; i++) {
      if (this.data[i].ProductId == productId) {
        for (var j = 0; j < this.data[i].ProductDetails.length; j++) {
          if (this.data[i].ProductDetails[j].ColorName == colorName) {
            this.data[i].changetxt = true;
            this.data[i].activeImageUrl = this.data[i].ProductDetails[j].ListImagePath + this.data[i].ProductDetails[j].Images.split('|')[0];
            this.data[i].activeTitle = this.data[i].ProductDetails[j].ProductTitle;
          }
        }
      }
    }
  }
  addFilter(item:any, event:any){
    if(event.target.checked){
      this.Facets.push(item)
      } else {
      const index = this.Facets.indexOf(item);
      if (index > -1) { // only splice array when item is found
        this.Facets.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
   }
  spliceIntoChunks(arr: any[], chunkSize: number) {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
   }
  
  removeFilter(item: any){
    // debugger
    const index = this.Facets.indexOf(item);
    if (index > -1) { // only splice array when item is found
      this.Facets.splice(index, 1); // 2nd parameter means remove one item only
    }
  }
  sortingOrder( event:any){
    // debugger
    if(event.target.value){
      let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization':'Bearer '+this.basic
      });
      let sortParam=null;
      if(event.target.value == 'price-low-to-high'){
        sortParam = 'by=price&dir=asc';
      }
      else if(event.target.value == 'price-high-to-low'){
        sortParam = 'by=price&dir=desc';
      } else {
        sortParam = `by=${event.target.value}`
      }
      let option = {headers:headers};
      this.http.get(`https://api.jockey.in/api/productsbystyles?cat1=men&cat2=apparel-tops&cat3=t-shirts&cat4=&pno=1&ps=12&${sortParam}&ctkn=&dir=&f=`,option).subscribe((res:any) => {
        this.count = res.RowCount
        this.data = res.Data.StyleDetails
        this.fecetData = res.Data.Facets
        this.chunkedData = this.spliceIntoChunks(this.data, 3);
      })
    }
  }
  
  
}
 
