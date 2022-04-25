namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Payment_methods
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Payment_methods()
        {
            Orders = new HashSet<Orders>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string name { get; set; }

        public int is_active { get; set; }

        [Column(TypeName = "date")]
        public DateTime? createAt { get; set; }

        [StringLength(200)]
        public string createBy { get; set; }

        [Column(TypeName = "date")]
        public DateTime? updateAt { get; set; }

        [StringLength(200)]
        public string updateBy { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
