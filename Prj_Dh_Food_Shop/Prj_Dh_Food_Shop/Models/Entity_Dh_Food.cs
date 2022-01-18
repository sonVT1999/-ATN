namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Entity_Dh_Food : DbContext
    {
        public Entity_Dh_Food()
            : base("name=Entity_Dh_Food")
        {
        }

        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<Cities> Cities { get; set; }
        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<Customers_potential> Customers_potential { get; set; }
        public virtual DbSet<Districts> Districts { get; set; }
        public virtual DbSet<Feedbacks> Feedbacks { get; set; }
        public virtual DbSet<Images_post> Images_post { get; set; }
        public virtual DbSet<Images_product> Images_product { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Orders_detail> Orders_detail { get; set; }
        public virtual DbSet<Payment_methods> Payment_methods { get; set; }
        public virtual DbSet<Posts> Posts { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<Provinces> Provinces { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categories>()
                .HasMany(e => e.Products)
                .WithOptional(e => e.Categories)
                .HasForeignKey(e => e.id_category);

            modelBuilder.Entity<Cities>()
                .HasMany(e => e.Districts)
                .WithOptional(e => e.Cities)
                .HasForeignKey(e => e.id_city);

            modelBuilder.Entity<Customers>()
                .Property(e => e.username)
                .IsUnicode(false);

            modelBuilder.Entity<Customers>()
                .Property(e => e.passwords)
                .IsUnicode(false);

            modelBuilder.Entity<Customers>()
                .Property(e => e.phone_number)
                .IsUnicode(false);

            modelBuilder.Entity<Customers>()
                .HasMany(e => e.Feedbacks)
                .WithOptional(e => e.Customers)
                .HasForeignKey(e => e.id_customer);

            modelBuilder.Entity<Customers>()
                .HasMany(e => e.Orders)
                .WithOptional(e => e.Customers)
                .HasForeignKey(e => e.id_customer);

            modelBuilder.Entity<Customers_potential>()
                .Property(e => e.phone_number)
                .IsUnicode(false);

            modelBuilder.Entity<Districts>()
                .HasMany(e => e.Customers)
                .WithOptional(e => e.Districts)
                .HasForeignKey(e => e.id_district);

            modelBuilder.Entity<Districts>()
                .HasMany(e => e.Users)
                .WithOptional(e => e.Districts)
                .HasForeignKey(e => e.id_district);

            modelBuilder.Entity<Orders>()
                .HasMany(e => e.Orders_detail)
                .WithOptional(e => e.Orders)
                .HasForeignKey(e => e.id_order);

            modelBuilder.Entity<Payment_methods>()
                .HasMany(e => e.Orders)
                .WithOptional(e => e.Payment_methods)
                .HasForeignKey(e => e.id_payment_method);

            modelBuilder.Entity<Posts>()
                .HasMany(e => e.Images_post)
                .WithOptional(e => e.Posts)
                .HasForeignKey(e => e.id_post);

            modelBuilder.Entity<Products>()
                .HasMany(e => e.Images_product)
                .WithOptional(e => e.Products)
                .HasForeignKey(e => e.id_product)
                .WillCascadeOnDelete();

            modelBuilder.Entity<Products>()
                .HasMany(e => e.Orders_detail)
                .WithOptional(e => e.Products)
                .HasForeignKey(e => e.id_product);

            modelBuilder.Entity<Provinces>()
                .HasMany(e => e.Cities)
                .WithOptional(e => e.Provinces)
                .HasForeignKey(e => e.id_province);

            modelBuilder.Entity<Users>()
                .Property(e => e.username)
                .IsUnicode(false);

            modelBuilder.Entity<Users>()
                .Property(e => e.passwords)
                .IsUnicode(false);

            modelBuilder.Entity<Users>()
                .Property(e => e.phone_number)
                .IsUnicode(false);

            modelBuilder.Entity<Users>()
                .HasMany(e => e.Orders)
                .WithOptional(e => e.Users)
                .HasForeignKey(e => e.id_user);

            modelBuilder.Entity<Users>()
                .HasMany(e => e.Posts)
                .WithOptional(e => e.Users)
                .HasForeignKey(e => e.id_user);
        }
    }
}
