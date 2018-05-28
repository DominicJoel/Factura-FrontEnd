using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class FacturaLista
    {
        public int IdFactura { get; set; }
        public int IdCliente { get; set; }
        public string Vendedor { get; set; }
        public decimal Neto { get; set; }
        public decimal Iva { get; set; }
        public decimal PrecioTotal { get; set; }
        public int Numero { get; set; }

        public Clientes IdClienteNavigation { get; set; }
        public CodigoFactura IdFacturaNavigation { get; set; }
    }
}
