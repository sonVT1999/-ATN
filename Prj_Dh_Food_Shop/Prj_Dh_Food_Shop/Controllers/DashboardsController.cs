using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class DashboardsController : BaseController
    {
        // GET: Dashboards
        private Entity_Dh_Food db = new Entity_Dh_Food();
        public ActionResult Index()
        {

            ViewBag.Inner = new DashboardsController().SelectTop5Product();
            return View();
        }

        public List<SearchTop_Products> SelectTop5Product()
        {
            var rs = db.Database.SqlQuery<SearchTop_Products>("select top 5 Products.id, Products.name as TenSP, Categories.name as category_name, SUM(Orders_detail.amount) as doanhthu "
                                                              + "from Products, Orders, Orders_detail, Categories "
                                                              + "where Products.id_category = Categories.id "
                                                              + "and Products.id = Orders_detail.id_product "
                                                              + "and Orders_detail.id_order = Orders.id "
                                                              + "and Orders.statuss = 2 "
                                                              + "GROUP BY Products.id, Products.name, Categories.name "
                                                              + "ORDER BY doanhthu DESC").ToList();
            return rs;
        }

        public List<Categories> Loai()
        {
            var model = db.Categories.ToList();
            return model;
        }

        public JsonResult PieChart()
        {
            var rs = db.Database.SqlQuery<pieChart>("select Orders.id_customer, Count(Orders.id_customer) as solan from Orders Group by Orders.id_customer").ToList();
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

    }
}