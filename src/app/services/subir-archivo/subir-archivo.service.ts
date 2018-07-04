import { Injectable } from '@angular/core';

@Injectable()
export class SubirArchivoService {

  constructor() { }

   subirArchivo( archivo: File, tipo:string, id:number ){//Capturamos el archivo el nombre y el Id de de lo que estamos subiendo

     let formData = new FormData();//ESO ES LO QUE QUEREMOS MANDAR A SUBIR
     let xhr = new XMLHttpRequest(); //Para una peticion Ajax

    // formData

    formData.append( 'imagen',archivo )
   }
}
