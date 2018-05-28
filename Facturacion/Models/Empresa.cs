using System;
using System.Collections.Generic;

namespace Facturacion.Models
{
    public partial class Empresa
    {
        public int Rnc { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public int Iva { get; set; }
        public string Logo { get; set; }
        public string Calle { get; set; }
        public string Ciudad { get; set; }
        public string Region { get; set; }
        public int CodigoPostal { get; set; }
        public string Pais { get; set; }
    }
}
