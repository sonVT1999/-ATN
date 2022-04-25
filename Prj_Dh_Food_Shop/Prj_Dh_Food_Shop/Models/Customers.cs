namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Customers
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Customers()
        {
            Orders = new HashSet<Orders>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string name { get; set; }

        [StringLength(200)]
        public string email { get; set; }

        [Column(TypeName = "date")]
        public DateTime? birth_date { get; set; }

        public int? gender { get; set; }

        [Required]
        [StringLength(100)]
        public string username { get; set; }

        [Required]
        [StringLength(100)]
        public string passwords { get; set; }

        [StringLength(100)]
        public string addresss { get; set; }

        [StringLength(15)]
        public string phone_number { get; set; }

        public int is_active { get; set; }

        [Column(TypeName = "date")]
        public DateTime? createAt { get; set; }

        [StringLength(200)]
        public string createBy { get; set; }

        [Column(TypeName = "date")]
        public DateTime? updateAt { get; set; }

        [StringLength(200)]
        public string updateBy { get; set; }

        public int? id_province { get; set; }

        public virtual Provinces Provinces { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
