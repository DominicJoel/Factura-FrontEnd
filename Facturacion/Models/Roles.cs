using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Roles
    {
        public Roles()
        {
            Usuario = new HashSet<Usuario>();
        }

        public int IdRole { get; set; }
        public string Descripcion { get; set; }

        public ICollection<Usuario> Usuario { get; set; }
    }
}
