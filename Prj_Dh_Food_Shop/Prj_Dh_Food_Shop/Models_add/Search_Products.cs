using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop
{
    public class Search_Products
    {
        public int id { get; set; }

        public string name { get; set; }

        public int price { get; set; }

        public string descriptions { get; set; }

        public string promotion { get; set; }

        public DateTime? create_date { get; set; }

        public int? is_hot { get; set; }

        public int? is_new { get; set; }

        public int? is_active { get; set; }

        public int? id_category { get; set; }

        public string category_name { get; set; }

        public virtual Categories categories { get; set; }

        public List<Search_Products> lstData { get; set; }

        public List<SelectListItem> lstloai { get; set; }

        public string txbProductname { get; set; }

        public int txbPriceFrom { get; set; }

        public int txbPriceTo { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalRecord { get; set; }

        public int totalPage { get; set; }
    }
}