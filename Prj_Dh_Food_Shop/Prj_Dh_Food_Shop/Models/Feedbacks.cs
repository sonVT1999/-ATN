namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Feedbacks
    {
        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string title { get; set; }

        [Required]
        public string descriptions { get; set; }

        [Column(TypeName = "date")]
        public DateTime feedback_date { get; set; }

        public int? is_active { get; set; }

        public int? id_customer { get; set; }

        public virtual Customers Customers { get; set; }
    }
}
