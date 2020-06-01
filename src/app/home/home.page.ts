import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';;
import { Chart } from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  @ViewChild("lineCanvas") lineCanvas:ElementRef;
  private lineChart: Chart;


  data:any[] = [];
  chart:Chart;
  image:any = '../../assets/icon/avatar.png' ;
  constructor(private poop: DataService) {}


  ngAfterViewInit(): void {
    this.chart = new Chart(this.lineCanvas.nativeElement.getContext("2d"), { 
      type: 'line',
      data: {
          datasets: [{
              label: 'temperatura da tita',
              borderColor: 'rgb(255, 99, 132)',
              data: this.data
          }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                min: 26,
                max: 29
              }
          }],
         
        }
      }
    });
  }


  getData(){
    var item: any = this.poop.getSumData().subscribe(e =>{

      if(this.data.length >= 1800){
        this.data.pop()
        this.removeData(this.chart);
      }

      this.data.push(e);
      this.addData(this.chart, this.data.length, e);
     
     
      console.log(this.data);
      
    } );

  }

  addData(chart:any, label:any, data:any) {

    chart.data.labels.push(label);
    
    chart.data.datasets[0].data.push(data);
    this.chart.options.scales.yAxes[0].ticks.min = data - 0.5;
    this.chart.options.scales.yAxes[0].ticks.max = data + 0.5;
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
