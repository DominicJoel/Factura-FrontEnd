using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Clientes
    {
        public Clientes()
        {
            FacturaLista = new HashSet<FacturaLista>();
        }

        public int Id { get; set; }
        public string CedulaClientes { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public string Dirreccion { get; set; }
        public string Ciudad { get; set; }
        public string Pais { get; set; }
        public string NombreEmpresa { get; set; }
        public string SitioWebEmpresa { get; set; }
        public string TelefonoEmpresa { get; set; }
        public DateTime Fecha { get; set; }

        public ICollection<FacturaLista> FacturaLista { get; set; }
    }
}
