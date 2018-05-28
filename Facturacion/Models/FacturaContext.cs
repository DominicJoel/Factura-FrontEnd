using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Facturacion.Models
{
    public partial class FacturaContext : DbContext
    {
        public virtual DbSet<Clientes> Clientes { get; set; }
        public virtual DbSet<CodigoCompras> CodigoCompras { get; set; }
        public virtual DbSet<CodigoFactura> CodigoFactura { get; set; }
        public virtual DbSet<ComprasLista> ComprasLista { get; set; }
        public virtual DbSet<Empresa> Empresa { get; set; }
        public virtual DbSet<Fabricantes> Fabricantes { get; set; }
        public virtual DbSet<FacturaLista> FacturaLista { get; set; }
        public virtual DbSet<Productos> Productos { get; set; }
        public virtual DbSet<Proveedor> Proveedor { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Data Source= DTI-4; Initial Catalog = Factura; Integrated Security = true ");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clientes>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasColumnType("char(30)");

                entity.Property(e => e.CedulaClientes)
                    .IsRequired()
                    .HasColumnName("Cedula_Clientes")
                    .HasColumnType("char(13)");

                entity.Property(e => e.Ciudad).HasColumnType("char(25)");

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasColumnType("nchar(40)");

                entity.Property(e => e.Dirreccion)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnType("char(25)");

                entity.Property(e => e.NombreEmpresa)
                    .HasColumnName("Nombre_Empresa")
                    .HasColumnType("char(40)");

                entity.Property(e => e.Pais)
                    .IsRequired()
                    .HasColumnType("char(30)");

                entity.Property(e => e.SitioWebEmpresa)
                    .HasColumnName("Sitio_Web_Empresa")
                    .HasColumnType("nchar(40)");

                entity.Property(e => e.Telefono).HasColumnType("char(12)");

                entity.Property(e => e.TelefonoEmpresa)
                    .HasColumnName("Telefono_Empresa")
                    .HasColumnType("char(12)");
            });

            modelBuilder.Entity<CodigoCompras>(entity =>
            {
                entity.HasKey(e => e.IdCompra);

                entity.Property(e => e.IdCompra).HasColumnName("Id_Compra");

                entity.Property(e => e.Fecha).HasColumnType("date");
            });

            modelBuilder.Entity<CodigoFactura>(entity =>
            {
                entity.HasKey(e => e.IdFactura);

                entity.Property(e => e.IdFactura).HasColumnName("Id_Factura");

                entity.Property(e => e.Fecha).HasColumnType("date");
            });

            modelBuilder.Entity<ComprasLista>(entity =>
            {
                entity.HasKey(e => e.Numero);

                entity.Property(e => e.IdCompra).HasColumnName("Id_Compra");

                entity.Property(e => e.IdProveedor).HasColumnName("Id_Proveedor");

                entity.Property(e => e.Iva)
                    .HasColumnName("iva")
                    .HasColumnType("money");

                entity.Property(e => e.Neto)
                    .HasColumnName("neto")
                    .HasColumnType("money");

                entity.Property(e => e.PrecioTotal)
                    .HasColumnName("Precio_Total")
                    .HasColumnType("money");

                entity.HasOne(d => d.IdCompraNavigation)
                    .WithMany(p => p.ComprasLista)
                    .HasForeignKey(d => d.IdCompra)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName(" FK_Id_Compra");

                entity.HasOne(d => d.IdProveedorNavigation)
                    .WithMany(p => p.ComprasLista)
                    .HasForeignKey(d => d.IdProveedor)
                    .HasConstraintName("FK_Id_Proveedor");
            });

            modelBuilder.Entity<Empresa>(entity =>
            {
                entity.HasKey(e => e.Rnc);

                entity.Property(e => e.Rnc)
                    .HasColumnName("RNC")
                    .ValueGeneratedNever();

                entity.Property(e => e.Calle)
                    .IsRequired()
                    .HasColumnType("char(40)");

                entity.Property(e => e.Ciudad)
                    .IsRequired()
                    .HasColumnType("char(25)");

                entity.Property(e => e.CodigoPostal).HasColumnName("Codigo_Postal");

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasColumnType("nchar(40)");

                entity.Property(e => e.Logo)
                    .HasMaxLength(45)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Pais)
                    .IsRequired()
                    .HasColumnName("pais")
                    .HasColumnType("char(20)");

                entity.Property(e => e.Region)
                    .IsRequired()
                    .HasColumnType("char(30)");

                entity.Property(e => e.Telefono).HasColumnType("char(12)");
            });

            modelBuilder.Entity<Fabricantes>(entity =>
            {
                entity.HasKey(e => e.IdFabricantes);

                entity.ToTable("fabricantes");

                entity.Property(e => e.IdFabricantes).HasColumnName("Id_Fabricantes");

                entity.Property(e => e.Estado)
                    .IsRequired()
                    .HasColumnName("estado")
                    .HasColumnType("char(1)");

                entity.Property(e => e.FechaAgregado)
                    .HasColumnName("Fecha_Agregado")
                    .HasColumnType("date");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<FacturaLista>(entity =>
            {
                entity.HasKey(e => e.Numero);

                entity.Property(e => e.IdCliente).HasColumnName("Id_Cliente");

                entity.Property(e => e.IdFactura).HasColumnName("Id_Factura");

                entity.Property(e => e.Iva)
                    .HasColumnName("iva")
                    .HasColumnType("money");

                entity.Property(e => e.Neto)
                    .HasColumnName("neto")
                    .HasColumnType("money");

                entity.Property(e => e.PrecioTotal)
                    .HasColumnName("Precio_Total")
                    .HasColumnType("money");

                entity.Property(e => e.Vendedor)
                    .IsRequired()
                    .HasColumnType("char(25)");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.FacturaLista)
                    .HasForeignKey(d => d.IdCliente)
                    .HasConstraintName("FK_Id_Cliente");

                entity.HasOne(d => d.IdFacturaNavigation)
                    .WithMany(p => p.FacturaLista)
                    .HasForeignKey(d => d.IdFactura)
                    .HasConstraintName("FK_Id_Factura");
            });

            modelBuilder.Entity<Productos>(entity =>
            {
                entity.HasKey(e => e.IdProductos);

                entity.ToTable("productos");

                entity.Property(e => e.IdProductos).HasColumnName("Id_Productos");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Estado)
                    .IsRequired()
                    .HasColumnName("estado")
                    .HasColumnType("char(1)");

                entity.Property(e => e.IdFabricante).HasColumnName("Id_fabricante");

                entity.Property(e => e.Modelo)
                    .IsRequired()
                    .HasColumnType("char(10)");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnType("char(25)");

                entity.Property(e => e.Precio).HasColumnType("money");

                entity.Property(e => e.Stock).HasColumnName("stock");

                entity.HasOne(d => d.IdFabricanteNavigation)
                    .WithMany(p => p.Productos)
                    .HasForeignKey(d => d.IdFabricante)
                    .HasConstraintName("FK_Id_fabricante");
            });

            modelBuilder.Entity<Proveedor>(entity =>
            {
                entity.HasKey(e => e.IdProveedor);

                entity.Property(e => e.IdProveedor).HasColumnName("ID_Proveedor");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasColumnType("char(30)");

                entity.Property(e => e.CedulaProveedor)
                    .IsRequired()
                    .HasColumnName("Cedula_Proveedor")
                    .HasColumnType("char(13)");

                entity.Property(e => e.Ciudad).HasColumnType("char(25)");

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasColumnType("nchar(40)");

                entity.Property(e => e.Dirreccion)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("datetime");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnType("char(25)");

                entity.Property(e => e.NombreEmpresa)
                    .HasColumnName("Nombre_Empresa")
                    .HasColumnType("char(40)");

                entity.Property(e => e.Pais)
                    .IsRequired()
                    .HasColumnType("char(30)");

                entity.Property(e => e.SitioWebEmpresa)
                    .HasColumnName("Sitio_Web_Empresa")
                    .HasColumnType("nchar(40)");

                entity.Property(e => e.Telefono).HasColumnType("char(12)");

                entity.Property(e => e.TelefonoEmpresa)
                    .HasColumnName("Telefono_Empresa")
                    .HasColumnType("char(12)");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.IdRole);

                entity.ToTable("roles");

                entity.Property(e => e.IdRole).HasColumnName("Id_Role");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasColumnType("char(25)");

                entity.Property(e => e.Cedula).HasColumnType("char(11)");

                entity.Property(e => e.Correo).HasColumnType("nchar(45)");

                entity.Property(e => e.Dirreccion)
                    .HasMaxLength(125)
                    .IsUnicode(false);

                entity.Property(e => e.IdRole).HasColumnName("Id_Role");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnType("char(25)");

                entity.Property(e => e.Pass)
                    .IsRequired()
                    .HasColumnType("nchar(25)");

                entity.Property(e => e.Telefono).HasColumnType("char(12)");

                entity.Property(e => e.User)
                    .IsRequired()
                    .HasColumnType("nchar(25)");

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.Usuario)
                    .HasForeignKey(d => d.IdRole)
                    .HasConstraintName("Fk_Id_Role");
            });
        }
    }
}
