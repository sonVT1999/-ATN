using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class Search_Users
    {
        public int id { get; set; }

        public string name { get; set; }

        public string username { get; set; }

        public string passwords { get; set; }

        public string phone_number { get; set; }

        public string addresss { get; set; }

        public DateTime create_date { get; set; }

        public int is_active { get; set; }

        public string permission { get; set; }

        public int id_district { get; set; }

        public int id_category { get; set; }

        public string district_name { get; set; }

        public virtual Districts Districts { get; set; }

        public List<Search_Users> lstData { get; set; }

        public string txbName { get; set; }

        public string txbUsername { get; set; }

        public string txbPhoneNumber { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalRecord { get; set; }

        public int totalPage { get; set; }
    }
}