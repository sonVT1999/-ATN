using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class Orders_detailController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();

        // GET: Orders_detail
        public ActionResult Index(Search_Orders_Detail model, int? id)
        {

            var data = from od in db.Orders_detail
                       join o in db.Orders on od.id_order equals o.id
                       join p in db.Products on od.id_product equals p.id
                       select new Search_Orders_Detail()
                       {
                           id = od.id,
                           product_name = p.name,
                           counts = od.counts,
                           amount = od.amount,
                       };

            var rs = data.OrderBy(x => x.id).ToList() ?? new List<Search_Orders_Detail>();

            ViewBag.product = new Orders_detailController().getProducts();
            ViewBag.order = new Orders_detailController().getOrders();

            model.lstData = rs;
            model.totalRecord = data.Count();
            model.totalPage = (int)Math.Ceiling((decimal)model.totalRecord / model.pageSize);
            return View(model);
        }

        public List<Products> getProducts()
        {
            var model = db.Products.ToList();
            return model;
        }

        public List<Orders> getOrders()
        {
            var model = db.Orders.ToList();
            return model;
        }

    }
}