namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Serializable]
    public partial class Credentials
    {
        [Key]
        [StringLength(20)]
        public string GroupUserId { get; set; }


        [StringLength(20)]
        public string RoleId { get; set; }
    }
}
