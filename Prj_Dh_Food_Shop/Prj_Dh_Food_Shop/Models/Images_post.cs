namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Images_post
    {
        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string link { get; set; }

        public int? id_post { get; set; }

        public virtual Posts Posts { get; set; }
    }
}
