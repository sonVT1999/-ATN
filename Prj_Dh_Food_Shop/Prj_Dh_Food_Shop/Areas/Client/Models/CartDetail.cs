using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class CartDetail
    {
        Entity_Dh_Food db = null;
        public CartDetail()
        {
            db = new Entity_Dh_Food();
        }
        public bool Insert(Orders_detail detail)
        {
            try
            {
                db.Orders_detail.Add(detail);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}