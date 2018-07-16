export class FacturaLista {

  constructor(
    public  IdFactura:number = 0,
    public  IdCliente:number = 0,
    public  IdProductos:number = 0,
    public  Cantidad: number = 0,
    public  Vendedor:string ='',
    public  Neto: number = 0,
    public  Iva: number = 0,
    public  PrecioTotal: number = 0,
    public  Numero: number = 0
  ) { }

}
