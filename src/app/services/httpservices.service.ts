import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpClient, HttpClientModule } from '@angular/common/http';

  interface weather{
  gridId: any
  gridX: any
  gridY: any
}

@Injectable()
export  class HttpservicesService   {


  public domain = 'https://api.weather.gov'
  constructor(private http: HttpClient, private router: Router) { }


  weatherrecuest(aux: weather): Observable<any> {
    // this.getCodVend();
    // aux.codVend = DataService.codVend;
    const serverName = this.domain + '/gridpoints/'+aux.gridId+'/'+aux.gridX+','+aux.gridY+'/forecast';
    console.log(serverName);


    return this.http.get<any>(serverName );
  }
}
