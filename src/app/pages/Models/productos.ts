export class Productos {

  constructor(
    public  IdProductos:number = 0,
    public  IdFabricante:number = 0,
    public  Nombre:string = '',
    public  Precio:number = 0,
    public  Descripcion:string = '',
    public  Estado:string = '',
    public  Stock:number = 0,
    public  Modelo :string = '',
    public UrlPhoto: string = ''
  ) { }

}
