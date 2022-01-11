namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class _1 : DbContext
    {
        public _1()
            : base("name=_1")
        {
        }

        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>()
                .Property(e => e.username)
                .IsUnicode(false);

            modelBuilder.Entity<Users>()
                .Property(e => e.passwords)
                .IsUnicode(false);

            modelBuilder.Entity<Users>()
                .Property(e => e.phone_number)
                .IsUnicode(false);
        }
    }
}
