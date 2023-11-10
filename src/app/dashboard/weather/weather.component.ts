import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, map, switchMap, take } from 'rxjs';
import { LazyLoadScriptService } from 'src/app/services/lazy-load-script';

import colorlist from 'src/fake-data/color.json';
import placelist from 'src/fake-data/place.json';
import Chart from 'chart.js/auto';

declare var $: any;

interface weather{
  gridId: any
  gridX: any
  gridY: any
  data?:any
  name?:any
}


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent  implements OnInit{
  id:string
  sub;
  vari:any
  listCPoint : weather[] = placelist
  time = 'Day'
   chart: any;
   chartline: any;

  listShow=[]

  listTempChart=[]

  constructor(private activatedroute: ActivatedRoute,
    private router: Router,private http: HttpClient,private lazyLoadService: LazyLoadScriptService){

    }

    public domain = 'https://api.weather.gov'



    changeTime(e:any){
      this.time=e
      let lis = []
      this.vari?.data?.properties['periods'].forEach(element => {
        if((element.name.includes('night') || element.name.includes('Night')) && this.time=='Night'){
          this.listShow.push(element)
        }else if(!element.name.includes('night') && !element.name.includes('Night')  && this.time=='Day'){
          this.listShow.push(element)
        }
      });
      // this.listShow=lis

      setTimeout(() => {
         $('.center').slick('unslick');
         $('.center').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      });
      }, 500);
    }
  weatherrecuest(aux: weather): Observable<any> {
    // this.getCodVend();
    // aux.codVend = DataService.codVend;
    const serverName = this.domain + '/gridpoints/'+aux.gridId+'/'+aux.gridX+','+aux.gridY+'/forecast';
    console.log(serverName);


    return this.http.get<any>(serverName);
  }


  createChartTemperature(labels,data: any,unit ='F'){

    this.chartline = new Chart("MybarTemp", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labels,
	       datasets: [
          {
            label: "Day",
            data: data.day,
            backgroundColor: 'rgba(255, 205, 86, 0.4)',
            borderColor:'rgb(255, 205, 86)',
            borderWidth: 1
          },
          {
            label: "Night",
            data: data.night,
            backgroundColor: 'rgba(54, 162, 235, 0.4)',
            borderColor:'rgb(54, 162, 235)',
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        scales: {

          y: {title: {
            display: true,
            text: 'Temperature'
          },
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, ticks) {
                      return  value + ' '+unit;
                  }
              }
          }
      }
    }

    });
  }

  createChartHumidy(labels,data: any){

    this.chart = new Chart("MyLineHum", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labels,
	       datasets: [
          {
            label: "Day",
            data: data.day,
            backgroundColor: 'rgba(255, 205, 86, 0.4)',
            borderColor:'rgb(255, 205, 86)',
            borderWidth: 1
          },
          {
            label: "Night",
            data: data.night,
            backgroundColor: 'rgba(54, 162, 235, 0.4)',
            borderColor:'rgb(54, 162, 235)',
            borderWidth: 1
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        scales: {
          y: {title: {
            display: true,
            text: 'Humidity'
          },
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, ticks) {
                      return  value+' %';
                  }
              }
          }
      }
    }

    });
  }

    ngOnInit() {
      this.sub = this.activatedroute.paramMap.subscribe((params) => {
        console.log(params);
        this.id = params.get('id');
      });

      this.listCPoint.forEach((element,i) => {
        if(element.gridId==this.id){
          this.weatherrecuest(element).subscribe((data: any)=>{
          this.listCPoint[i].data=data
        console.log(data)

        const colors = colorlist

        let lat = 0
        let long = 0
        data.geometry.coordinates[0].forEach((element) => {
          lat+=element[1]
          long+=element[0]
        });

        this.listCPoint[i]['lat']=lat
        this.listCPoint[i]['lon']=long
        this.vari=this.listCPoint[i]
        console.log(this.vari)
        let first = false
        let label = []
        let daytemp = []
        let dayhumidy = []
        let nightTemp = []
        let nighthumidy = []
        this.vari?.data?.properties['periods'].forEach((element,i) => {

          if(first){
            if(element.isDaytime){
              label.push(element.name)
              daytemp.push(element.temperature)
              dayhumidy.push(element.relativeHumidity.value)

            }else{
              nightTemp.push(element.temperature)
              nighthumidy.push(element.relativeHumidity.value)
            }
          }else{
            if(element.name.includes('Tonight') || element.name.includes("Overnight")){
              first=true
              if(i==0){
                daytemp.push('0')
                dayhumidy.push('0')
              }
              }
            if(!element.isDaytime){
              label.push('Today')
              nightTemp.push(element.temperature)
              nighthumidy.push(element.relativeHumidity.value)

            }

          }
          if((element.name.includes('night') || element.name.includes('Night')) && this.time=='Night'){
            this.listShow.push(element)
          }else if(!element.name.includes('night') && !element.name.includes('Night')  && this.time=='Day'){
            this.listShow.push(element)
          }
        });

        const datause = {day:daytemp, night:nightTemp}
        this.createChartTemperature(label,datause)

        const datause1 = {day:dayhumidy, night:nighthumidy}
        this.createChartHumidy(label,datause1)
        setTimeout(() => {

           $('.center').slick({
          centerMode: true,
          centerPadding: '60px',
          slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,

      autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 1
              }
            }
          ]
        });
        }, 500);


        })
        }

      });

      //You can also use this
      //this.sub=this._Activatedroute.params.subscribe(params => {
      //    this.id = params['id'];
      //    let products=this._productService.getProducts();
      //    this.product=products.find(p => p.productID==this.id);
      //});
    }

    ngOnDestroy() {
      if (this.sub) this.sub.unsubscribe();
    }

    onBack(): void {
      this.router.navigate(['home']);
    }
}
