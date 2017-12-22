import { Component, OnInit } from '@angular/core';
import { distService } from './district.service';
import { KeysPipe } from './../key.pipe';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css'],
  providers:[distService]
})

export class DistrictComponent implements OnInit {
  constructor(private distservice: distService) { }
  selProvince;
  selCity;
  selDistrict;
  provinces;cities;districts;

  compareSel(a,b){
      return a&&b?a.key === b.key:a === b;
  }

  transform(value):any {
    let keys = [];
    for(let key in value){
      keys.push({key:key,value:value[key]});
    }
    return keys;
  }

  updateSel(pCode,type){
    switch(type){
      case "p":
        this.cities = this.distservice.getSelAreas(pCode);
        let cities_ = this.transform(this.cities);
        this.selCity = cities_[0];
        this.districts = this.distservice.getSelAreas(this.selCity.key);
        this.selDistrict = this.transform(this.districts)[0];
      break;
      case "c":
        this.districts = this.distservice.getSelAreas(this.selCity.key);
        this.selDistrict = this.transform(this.districts)[0];
      break;
    }

  }

  ngOnInit() {
    this.provinces = this.distservice.getSelAreas('1');
    this.selProvince = {
      key:"310000"
    };
    this.cities = this.distservice.getSelAreas(this.selProvince.key);
    this.selCity = this.transform(this.cities)[0];
    this.districts = this.distservice.getSelAreas(this.selCity.key);
    this.selDistrict = this.transform(this.districts)[0];
  }
}
