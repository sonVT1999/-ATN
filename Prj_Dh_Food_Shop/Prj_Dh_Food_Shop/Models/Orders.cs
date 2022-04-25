namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Orders
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Orders()
        {
            Orders_detail = new HashSet<Orders_detail>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string name { get; set; }

        public double total { get; set; }

        [Column(TypeName = "date")]
        public DateTime order_date { get; set; }

        public int? statuss { get; set; }

        [Column(TypeName = "date")]
        public DateTime? createAt { get; set; }

        [StringLength(200)]
        public string createBy { get; set; }

        [Column(TypeName = "date")]
        public DateTime? updateAt { get; set; }

        [StringLength(200)]
        public string updateBy { get; set; }

        public int? id_user { get; set; }

        public int? id_customer { get; set; }

        public int? id_payment_method { get; set; }

        public virtual Customers Customers { get; set; }

        public virtual Payment_methods Payment_methods { get; set; }

        public virtual Users Users { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Orders_detail> Orders_detail { get; set; }
    }
}
