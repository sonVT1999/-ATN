using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class SearchTop_Products
    {
        public int id { get; set; }

        public string tenSP { get; set; }

        public string category_name { get; set; }

        public virtual Categories categories { get; set; }

        public double? doanhthu { get; set; }
    }
}