using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class ComprasLista
    {
        public int? IdCompra { get; set; }
        public int IdProveedor { get; set; }
        public decimal Neto { get; set; }
        public decimal Iva { get; set; }
        public decimal PrecioTotal { get; set; }
        public int Numero { get; set; }

        public CodigoCompras IdCompraNavigation { get; set; }
        public Proveedor IdProveedorNavigation { get; set; }
    }
}
