﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class Search_Payments
    {
        public int id { get; set; }

        public string name { get; set; }

        public int is_active { get; set; }

        public List<Search_Payments> lstData { get; set; }

        public string txbName { get; set; }

        public int page { get; set; }

        public int pageSize { get; set; }

        public int totalRecord { get; set; }

        public int totalPage { get; set; }
    }
}