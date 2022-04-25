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

        [StringLength(200)]
        public string customer_name { get; set; }

        [StringLength(100)]
        public string addresss { get; set; }

        [StringLength(15)]
        public string phone_number { get; set; }

        [StringLength(100)]
        public string email { get; set; }

        [Column(TypeName = "date")]
        public DateTime? createAt { get; set; }

        [StringLength(200)]
        public string createBy { get; set; }

        [Column(TypeName = "date")]
        public DateTime? updateAt { get; set; }

        [StringLength(200)]
        public string updateBy { get; set; }
    }
}
