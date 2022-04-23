using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop.Areas.Client
{
    public class CartItem
    {
        public Products Product { set; get; } 

        public int Quantity { set; get; } 
    }
}