using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class Search_Customers
    {
        public int id { get; set; }

        public string name { get; set; }

        public string birth_date { get; set; }

        public int? gender { get; set; }

        public string email { get; set; }

        public string username { get; set; }

        public string passwords { get; set; }

        public string phone_number { get; set; }

        public string addresss { get; set; }

        public DateTime? create_date { get; set; }

        public int is_active { get; set; }

        public int id_district { get; set; }

        public string district_name { get; set; }

        public virtual Districts Districts { get; set; }

        public List<Search_Customers> lstData { get; set; }

        public string txbName { get; set; }

        public string txbUsername { get; set; }

        public string txbPhoneNumber { get; set; }

        public string txbEmail { get; set; }

        public string txbAddress { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalRecord { get; set; }

        public int totalPage { get; set; }
    }
}