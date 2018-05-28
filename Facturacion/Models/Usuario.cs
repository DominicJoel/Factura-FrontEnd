using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }
        public string Dirreccion { get; set; }
        public string Cedula { get; set; }
        public string Correo { get; set; }
        public string User { get; set; }
        public string Pass { get; set; }
        public int IdRole { get; set; }

        public Roles IdRoleNavigation { get; set; }
    }
}
