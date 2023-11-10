import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
declare const AmCharts: any;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

import dataJson from 'src/fake-data/map_data';
import mapColor from 'src/fake-data/map-color-data.json';
import colorlist from 'src/fake-data/color.json';
import placelist from 'src/fake-data/place.json';
import { AlertComponent } from 'src/app/resources/alert/alert.component';
import { HttpservicesService } from 'src/app/services/httpservices.service';



interface weather{
  gridId: any
  gridX: any
  gridY: any
  data?:any
  name?:any
}


@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export   class HomeComponent implements OnInit {

listCPoint : weather[] = placelist
public domain = 'https://api.weather.gov'
  constructor( private alert: AlertComponent, private servicefetch: HttpservicesService) { }




  ngOnInit() {
    const images = [];
    // setTimeout(() => {
    //   const latlong = dataJson;

    //   const mapData = mapColor;

    //   const minBulletSize = 3;
    //   const maxBulletSize = 70;
    //   let min = Infinity;
    //   let max = -Infinity;
    //   let i;
    //   let value;
    //   for (i = 0; i < mapData.length; i++) {
    //     value = mapData[i].value;
    //     if (value < min) {
    //       min = value;
    //     }
    //     if (value > max) {
    //       max = value;
    //     }
    //   }

    //   const maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
    //   const minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

    //   const images = [];
    //   for (i = 0; i < mapData.length; i++) {
    //     const dataItem = mapData[i];
    //     value = dataItem.value;

    //     let square =
    //       ((value - min) / (max - min)) * (maxSquare - minSquare) + minSquare;
    //     if (square < minSquare) {
    //       square = minSquare;
    //     }
    //     const size = Math.sqrt(square / (Math.PI * 8));
    //     const id = dataItem.code;

    //     images.push({
    //       type: 'circle',
    //       theme: 'light',
    //       width: size,
    //       height: size,
    //       color: dataItem.color,
    //       longitude: latlong[id].longitude,
    //       latitude: latlong[id].latitude,
    //       title: dataItem.name + '</br> [ ' + value + ' ]',
    //       value: value,
    //     });
    //   }

    //   // world-low chart
    //   AmCharts.makeChart('world-low', {
    //     type: 'map',
    //     projection: 'eckert6',

    //     dataProvider: {
    //       map: 'worldLow',
    //       images: images,
    //     },
    //     export: {
    //       enabled: true,
    //     },
    //   });

    //   const chartDatac = [
    //     {
    //       day: 'Mon',
    //       value: 60,
    //     },
    //     {
    //       day: 'Tue',
    //       value: 45,
    //     },
    //     {
    //       day: 'Wed',
    //       value: 70,
    //     },
    //     {
    //       day: 'Thu',
    //       value: 55,
    //     },
    //     {
    //       day: 'Fri',
    //       value: 70,
    //     },
    //     {
    //       day: 'Sat',
    //       value: 55,
    //     },
    //     {
    //       day: 'Sun',
    //       value: 70,
    //     },
    //   ];

    //   // widget-line-chart
    //   AmCharts.makeChart('widget-line-chart', {
    //     type: 'serial',
    //     addClassNames: true,
    //     defs: {
    //       filter: [
    //         {
    //           x: '-50%',
    //           y: '-50%',
    //           width: '200%',
    //           height: '200%',
    //           id: 'blur',
    //           feGaussianBlur: {
    //             in: 'SourceGraphic',
    //             stdDeviation: '30',
    //           },
    //         },
    //         {
    //           id: 'shadow',
    //           x: '-10%',
    //           y: '-10%',
    //           width: '120%',
    //           height: '120%',
    //           feOffset: {
    //             result: 'offOut',
    //             in: 'SourceAlpha',
    //             dx: '0',
    //             dy: '20',
    //           },
    //           feGaussianBlur: {
    //             result: 'blurOut',
    //             in: 'offOut',
    //             stdDeviation: '10',
    //           },
    //           feColorMatrix: {
    //             result: 'blurOut',
    //             type: 'matrix',
    //             values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .2 0',
    //           },
    //           feBlend: {
    //             in: 'SourceGraphic',
    //             in2: 'blurOut',
    //             mode: 'normal',
    //           },
    //         },
    //       ],
    //     },
    //     fontSize: 15,
    //     dataProvider: chartDatac,
    //     autoMarginOffset: 0,
    //     marginRight: 0,
    //     categoryField: 'day',
    //     categoryAxis: {
    //       color: '#fff',
    //       gridAlpha: 0,
    //       axisAlpha: 0,
    //       lineAlpha: 0,
    //       offset: -20,
    //       inside: true,
    //     },
    //     valueAxes: [
    //       {
    //         fontSize: 0,
    //         inside: true,
    //         gridAlpha: 0,
    //         axisAlpha: 0,
    //         lineAlpha: 0,
    //         minimum: 0,
    //         maximum: 100,
    //       },
    //     ],
    //     chartCursor: {
    //       valueLineEnabled: false,
    //       valueLineBalloonEnabled: false,
    //       cursorAlpha: 0,
    //       zoomable: false,
    //       valueZoomable: false,
    //       cursorColor: '#fff',
    //       categoryBalloonColor: '#51b4e6',
    //       valueLineAlpha: 0,
    //     },
    //     graphs: [
    //       {
    //         id: 'g1',
    //         type: 'line',
    //         valueField: 'value',
    //         lineColor: '#ffffff',
    //         lineAlpha: 1,
    //         lineThickness: 3,
    //         fillAlphas: 0,
    //         showBalloon: true,
    //         balloon: {
    //           drop: true,
    //           adjustBorderColor: false,
    //           color: '#ffffff',
    //           fillAlphas: 0.2,
    //           bullet: 'round',
    //           bulletBorderAlpha: 1,
    //           bulletSize: 5,
    //           hideBulletsCount: 50,
    //           lineThickness: 2,
    //           useLineColorForBulletBorder: true,
    //           valueField: 'value',
    //           balloonText: '<span style="font-size:18px;">[[value]]</span>',
    //         },
    //       },
    //     ],
    //   });
    // }, 500);


    setTimeout(() => {
      const latlong = dataJson;

      const mapData = mapColor;

      const minBulletSize = 3;
      const maxBulletSize = 70;
      let min = Infinity;
      let max = -Infinity;
      let i;
      let value;
      for (i = 0; i < mapData.length; i++) {
        value = mapData[i].value;
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      }

      const maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
      const minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

      let ima = []

      // world-low chart
      AmCharts.makeChart('world-low', {
        type: 'map',
        projection: 'eckert6',

        dataProvider: {
          map: 'worldLow',
          images: images,
        },
        export: {
          enabled: true,
        },
      });


    }, 500);



    this.listCPoint.forEach((element,i) => {
      this.servicefetch.weatherrecuest(element).subscribe((data: any)=>{
        this.listCPoint[i].data=data
      console.log(data)

      const colors = colorlist

      let lat = 0
      let long = 0
      data.geometry.coordinates[0].forEach(element => {
        lat+=element[1]
        long+=element[0]
      });

      images.push({
        type: 'circle',
        theme: 'light',
        width: 30,
        height: 30,
        color: colors[i%12].color,
        longitude: long/5,
        latitude: lat/5,
        title: this.listCPoint[i].gridId+' '+ '</br> [ ' + 'Name:'+this.listCPoint[i].name + ' ]',
        value: '',
      });

      },
      (error) => {
        // Handle errors
        if (error.status ===  500 || error.status === 502 ) {
          this.alert.presentErrorAlert('Internal Server Error: '+JSON.stringify(error), );
          // Additional error handling for 500 status
        } else {
          this.alert.presentErrorAlert('An error occurred: '+JSON.stringify(error), );

        }
      })
    });
  }






}
