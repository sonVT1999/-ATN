namespace Prj_Dh_Food_Shop
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Customers_potential
    {
        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string name { get; set; }

        [Required]
        [StringLength(15)]
        public string phone_number { get; set; }

        [Required]
        [StringLength(200)]
        public string statuss { get; set; }

        [StringLength(200)]
        public string note { get; set; }
    }
}
