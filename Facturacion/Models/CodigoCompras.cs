using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class CodigoCompras
    {
        public CodigoCompras()
        {
            ComprasLista = new HashSet<ComprasLista>();
        }

        public int IdCompra { get; set; }
        public DateTime Fecha { get; set; }

        public ICollection<ComprasLista> ComprasLista { get; set; }
    }
}
