using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Facturacion.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Facturacion.Pages
{
    public class ContactModel : PageModel
    {
        public string Message { get; set; }

        public void OnGet()
        {
            using (var context = new FacturaContext() )
            {
                var Usuario = context.Empresa.ToList();
            }

            Message = "Your contact page.";
        }
    }
}
