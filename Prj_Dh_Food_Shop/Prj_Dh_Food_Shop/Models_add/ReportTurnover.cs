using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class ReportTurnover
    {

        public int id { get; set; }

        public string name { get; set; }

        public double total { get; set; }

        public int? statuss { get; set; }

        public int? id_user { get; set; }

        public int? id_customer { get; set; }

        public int? id_payment_method { get; set; }

        public virtual Customers Customers { get; set; }

        public virtual Payment_methods Payment_methods { get; set; }

        public virtual Users Users { get; set; }

        public int soluong { get; set; }

        public double? doanhthu { get; set; }

        public int? FilterValue { get; set; }

        public DateTime? order_date { get; set; }

        public List<ReportTurnover> lstData { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalRecord { get; set; }

        public int totalPage { get; set; }


    }
}