namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("GenCode")]
    public partial class GenCode
    {
        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string KeyCode { get; set; }

        public int StartValue { get; set; }

        public int LengthValue { get; set; }

        [StringLength(50)]
        public string Prefix { get; set; }

        public bool? GenByMonth { get; set; }

        public bool? GenByYear { get; set; }

        public bool? GenByDate { get; set; }

        [StringLength(200)]
        public string TableName { get; set; }

        [StringLength(200)]
        public string ColumnName { get; set; }
    }
}
