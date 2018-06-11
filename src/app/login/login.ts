/* Definir la clase para el registro */
export class ILogin {

  constructor(
      public IdUsuario:number = 0,
      public Nombre:string = '',
      public Correo:string = '',
      public Pass:string = '',
      public IdRole: number= 2,
  ) { }

}
