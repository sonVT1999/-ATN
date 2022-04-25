namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Districts
    {
        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string name { get; set; }

        [Column(TypeName = "date")]
        public DateTime? createAt { get; set; }

        [StringLength(200)]
        public string createBy { get; set; }

        [Column(TypeName = "date")]
        public DateTime? updateAt { get; set; }

        [StringLength(200)]
        public string updateBy { get; set; }

        public int? id_city { get; set; }

        public virtual Cities Cities { get; set; }
    }
}
