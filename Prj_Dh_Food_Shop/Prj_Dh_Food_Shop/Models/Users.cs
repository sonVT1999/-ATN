namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Users
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Users()
        {
            Orders = new HashSet<Orders>();
            Posts = new HashSet<Posts>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string name { get; set; }

        [Required]
        [StringLength(100)]
        public string username { get; set; }

        [Required]
        [StringLength(100)]
        public string passwords { get; set; }

        [StringLength(15)]
        public string phone_number { get; set; }

        [StringLength(100)]
        public string addresss { get; set; }

        [Column(TypeName = "date")]
        public DateTime create_date { get; set; }

        public int is_active { get; set; }

        [Required]
        [StringLength(100)]
        public string permission { get; set; }

        public int id_district { get; set; }

        public virtual Districts Districts { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Orders> Orders { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Posts> Posts { get; set; }
    }
}
