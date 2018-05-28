using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Fabricantes
    {
        public Fabricantes()
        {
            Productos = new HashSet<Productos>();
        }

        public int IdFabricantes { get; set; }
        public string Nombre { get; set; }
        public string Estado { get; set; }
        public DateTime FechaAgregado { get; set; }

        public ICollection<Productos> Productos { get; set; }
    }
}
