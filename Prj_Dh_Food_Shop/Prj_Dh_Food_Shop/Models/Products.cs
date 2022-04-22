namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Products
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Products()
        {
            Images_product = new HashSet<Images_product>();
            Orders_detail = new HashSet<Orders_detail>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string name { get; set; }

        public int price { get; set; }

        [Column(TypeName = "date")]
        public DateTime create_date { get; set; }

        public string descriptions { get; set; }

        [StringLength(200)]
        public string promotion { get; set; }

        public string ingredient { get; set; }

        public string HDSD { get; set; }

        public int? is_hot { get; set; }

        public int? is_new { get; set; }

        public int? is_active { get; set; }

        public int? id_category { get; set; }

        public virtual Categories Categories { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Images_product> Images_product { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Orders_detail> Orders_detail { get; set; }
    }
}
