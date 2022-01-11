namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Posts
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Posts()
        {
            Images_post = new HashSet<Images_post>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string title { get; set; }

        [Column(TypeName = "date")]
        public DateTime create_date { get; set; }

        public int? is_hot { get; set; }

        public int? is_new { get; set; }

        public int? id_user { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Images_post> Images_post { get; set; }

        public virtual Users Users { get; set; }
    }
}
