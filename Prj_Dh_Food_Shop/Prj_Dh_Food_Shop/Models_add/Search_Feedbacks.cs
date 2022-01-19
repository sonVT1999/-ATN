using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop.Models_add
{
    public class Search_Feedbacks
    {
        public int id { get; set; }

        public string title { get; set; }

        public string descriptions { get; set; }

        public DateTime feedback_date { get; set; }

        public int? is_active { get; set; }

        public int? id_customer { get; set; }

        public string customer_name { get; set; }

        public virtual Customers Customers { get; set; }

        public List<Search_Feedbacks> lstData { get; set; }

        public string txbName { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalRecord { get; set; }

        public int totalPage { get; set; }
    }
}