import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';;
import { Chart } from "chart.js";
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  @ViewChild("lineCanvas") lineCanvas:ElementRef;
  private lineChart: Chart;
  chart:Chart;

  subscription: Subscription;
  data:any[] = [];
  previousTemperature:any=0;
  currentTemperature:any=0;

  hasStarted:boolean=false;
  hasExited:boolean=true;

  image:any = '../../assets/icon/avatar.png' ;


  constructor(private dataStream: DataService) {}


  ngAfterViewInit(): void {
    this.chart = new Chart(this.lineCanvas.nativeElement.getContext("2d"), { 
      type: 'line',
      data: {
          datasets: [{
              label: 'Temperature',
              borderColor: 'rgb(255, 99, 132)',
              data: this.data
          }]
      },
      options: {
        scales: {
          yAxes: [{
            stacked: true,
          }]  
        }
      }
    });
  }

  stopData(){
    this.subscription.unsubscribe();
    this.hasStarted= false;
    this.hasExited = true;
  }

  getData(){
   

   this.subscription = this.dataStream.getSumData().subscribe(e =>{
      this.hasStarted = true;
      this.hasExited = false;
      if(this.data.length >= 1800){
        this.data.pop()
        this.removeData(this.chart);
      }
      this.previousTemperature = this.currentTemperature;
      this.currentTemperature = e;
     
      this.data.push(e);
      this.addData(this.chart, this.data.length, e);
     
     
    } );

  }

  addData(chart:any, label:any, data:any) {

    chart.data.labels.push(label);
    
    chart.data.datasets[0].data.push(data);
    this.chart.canvas.parentNode.style.height = '200px';
   // this.chart.options.scales.yAxes[0].ticks.min = data - 0.5;
    //this.chart.options.scales.yAxes[0].ticks.max = data + 0.5;
    chart.update();
  }

  removeData(chart:any) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
  }
  

}
