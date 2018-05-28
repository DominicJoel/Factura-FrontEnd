using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Productos
    {
        public int IdProductos { get; set; }
        public int IdFabricante { get; set; }
        public string Nombre { get; set; }
        public decimal Precio { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public int Stock { get; set; }
        public string Modelo { get; set; }

        public Fabricantes IdFabricanteNavigation { get; set; }
    }
}
