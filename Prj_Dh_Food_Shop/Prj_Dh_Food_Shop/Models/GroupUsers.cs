namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class GroupUsers
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(20)]
        public string id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string Name { get; set; }
    }
}
