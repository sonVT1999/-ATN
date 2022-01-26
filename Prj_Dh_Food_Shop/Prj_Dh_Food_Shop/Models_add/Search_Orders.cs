using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class Search_Orders
    {
        public int id { get; set; }

        public string name { get; set; }

        public double? total { get; set; }

        public int price { get; set; }

        public DateTime? order_date { get; set; }

        public int? statuss { get; set; }

        public List<Search_Orders> lstData { get; set; }

        public int? id_user { get; set; }

        public string user_name { get; set; }

        public virtual Users users { get; set; }

        public int? id_customer { get; set; }

        public string customer_name { get; set; }

        public virtual Customers customers { get; set; }

        public int? id_payment_method { get; set; }

        public string payment_method_name { get; set; }

        public virtual Payment_methods payment_methods { get; set; }

        public string txbCustomername { get; set; }

        public DateTime? txbDateFrom { get; set; }

        public DateTime? txbDateTo { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalRecord { get; set; }

        public int totalPage { get; set; }
    }
}