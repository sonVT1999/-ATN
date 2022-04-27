using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class Cart
    {
        Entity_Dh_Food db = null;
        public Cart()
        {
            db = new Entity_Dh_Food();
        }

        public int Insert(Orders order)
        {
            db.Orders.Add(order);
            db.SaveChanges();
            return order.id;
        }
    }
}