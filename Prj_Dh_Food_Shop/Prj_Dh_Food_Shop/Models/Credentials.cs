namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Credentials
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(20)]
        public string GroupUserId { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(20)]
        public string RoleId { get; set; }
    }
}
