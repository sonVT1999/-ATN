using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class Search_Orders_Detail
    {
        public int id { get; set; }

        public int counts { get; set; }

        public double amount { get; set; }

        public double prices { get; set; }

        public int? id_order { get; set; }

        public string product_name { get; set; }

        public int? id_product { get; set; }

        public virtual Orders Orders { get; set; }

        public virtual Products Products { get; set; }

        public List<Search_Orders_Detail> lstData { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalRecord { get; set; }

        public int totalPage { get; set; }
    }
}