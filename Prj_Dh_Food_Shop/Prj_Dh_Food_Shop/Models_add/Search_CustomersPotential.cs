using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class Search_CustomersPotential
    {
        public int id { get; set; }

        public string name { get; set; }

        public string phone_number { get; set; }

        public string statuss { get; set; }

        public string note { get; set; }

        public List<Search_CustomersPotential> lstData { get; set; }

        public string txbName { get; set; }

        public string txbPhone { get; set; }

        public string txbStatus { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalRecord { get; set; }

        public int totalPage { get; set; }
    }
}