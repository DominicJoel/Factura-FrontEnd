using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class CodigoFactura
    {
        public CodigoFactura()
        {
            FacturaLista = new HashSet<FacturaLista>();
        }

        public int IdFactura { get; set; }
        public DateTime Fecha { get; set; }

        public ICollection<FacturaLista> FacturaLista { get; set; }
    }
}
