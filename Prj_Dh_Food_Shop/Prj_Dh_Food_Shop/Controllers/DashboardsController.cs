using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class DashboardsController : Controller
    {
        // GET: Dashboards
        private Entity_Dh_Food db = new Entity_Dh_Food();
        public ActionResult Index()
        {
            ViewData["soluongOrder"] = db.Orders.Where(x => x.statuss == 0).Count();
            ViewData["soluongKH"] = db.Customers.Where(x => x.id != 0).Count();
            ViewData["soluongKHTN"] = db.Customers_potential.Where(x => x.statuss != "Đã gọi").Count();
            ViewData["soluongFeedback"] = db.Feedbacks.Where(x => x.is_active == 2).Count();
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
    }
}