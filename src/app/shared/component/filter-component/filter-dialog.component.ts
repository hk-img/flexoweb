import { Options } from '@angular-slider/ngx-slider';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatRadioChange } from '@angular/material/radio';
import { SpaceService } from 'src/app/services/space.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})
export class FilterDialog implements OnInit {
  public ref;
  public filter;
  amenities:any;
  distance:any;
  customer_rating:any;
  rating:any;
  priceRange:any
  Distvalue: number = 0;
  value: any;
  highValue: any;
  options: Options= {
    floor:500,
    ceil:50000
  }
  option: Options = {
    floor: 0,
    ceil: 50,
  };

  constructor(
    public dialogRef: MatDialogRef<any>,
    public snackBar: MatSnackBar,
    private service:SpaceService,
    @Inject(MAT_DIALOG_DATA) public data,
  ){}

  ngOnInit() {
    this.getAmenities();
    this.Distvalue = Number(localStorage.getItem("distance"))
    this.priceRange = localStorage.getItem("range")
    if (this.data.type === "coworking" || this.data.type === "shortterm"){
      this.options.step = 500
      this.options.floor = 500
      this.options.ceil = 50000
      this.value = Number(localStorage.getItem("min_price")) || 500
      this.highValue = Number(localStorage.getItem("max_price")) || 50000
    } 
    if (this.data.type === "longterm"){
      this.options.step = 50000
      this.options.floor = 50000
      this.options.ceil = 50000000
      this.value = Number(localStorage.getItem("min_price")) || 50000
      this.highValue = Number(localStorage.getItem("max_price")) || 5_00_00_000
    }
    
  }

  formatLabel(value: number) {
    return value;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  public closeDialog(options) {
    this.ref.close(options);
  }

  loadAmenties=false;
  getAmenities(){
    this.loadAmenties=true
    this.service.getAllAmenities().subscribe((res:any) => {
      this.amenities = res;
      setTimeout(() => {
        this.loadAmenties=false;
      }, 500);
    })
  }

  setAmenity(id, event) {
    const index = this.filter.amenities.indexOf(id);
    if (event.checked) {
      this.filter.amenities.push(id);
    }
    if (index > -1) {
      this.filter.amenities.splice(index, 1);
    }
  }

  getPriceRange(event:any){
    localStorage.setItem("min_price", JSON.stringify(this.value))
    localStorage.setItem("max_price", JSON.stringify(this.highValue))
    this.min_price = this.value;
    this.max_price = this.highValue;
  }

  priceSort:any;
  min_price:any
  max_price:any
  radioChange($event: MatRadioChange) {
    localStorage.setItem("range", $event.value)
    this.priceSort = $event.value;
  }

  getDistanceVal(event:any){
    localStorage.setItem("distance", event)
    this.distance = event;
  }

  setType(id) {
    if (this.filter.type == id) {
      this.filter.type = null;
    } else {
      this.filter.type = id;
    }
  }

  clear = false
  filters() {
    if(this.clear){
      localStorage.removeItem("distance")
      localStorage.removeItem("range")
      localStorage.removeItem("min_price")
      localStorage.removeItem("max_price")
      this.filter = {
        min_price: null,
        max_price: null,
        amenities: [],
        distance: null,
        priceSort: null
      }
      this.closeDialog({ success: true, filter: this.filter });
    } else {
      this.filter = {
        min_price: this.min_price ?? localStorage.getItem("min_price"),
        max_price: this.max_price ?? localStorage.getItem("max_price"),
        amenities: this.filter.amenities,
        distance: this.distance ?? localStorage.getItem("distance"),
        priceSort: this.priceSort ?? localStorage.getItem("range")
      }
      this.closeDialog({ success: true, filter: this.filter });
    }
    this.clear = false
  }


  clearFilters(){
    this.clear = true
    if (this.data.type === "coworking" || this.data.type === "shortterm"){
      this.value=500;
      this.highValue=50000;
    } 
    if (this.data.type === "longterm"){
      this.value=50000;
      this.highValue=5_00_00_000;
    }
    this.Distvalue = 0;
    this.filter.amenities = []
    this.priceRange = null
  }


  

  
}
