import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  f1:boolean = true;
  f2:boolean = false;
  f3:boolean = false;

  constructor() { }

  ngOnInit(): void {

    setInterval(() => {


      if(this.f1){
        this.f1 = false;
        this.f2 = true;
        this.f3 = false;
        return;
      }

      if(this.f2){
        this.f1 = false;
        this.f2 = false;
        this.f3 = true;
        return;
      }

      if(this.f3){
        this.f1 = true;
        this.f2 = false;
        this.f3 = false;
        return;
      }


    }, 5000)

  }

}
