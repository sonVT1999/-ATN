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
            return View();
        }
    }
}