using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Areas.Client.Controllers
{
    public class ProductTypeController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();
        // GET: Client/LienHe
        public ActionResult Index()
        {
            ViewBag.category = db.Categories.ToList();
            ViewBag.categoryList = db.Categories.ToList();
            return View();
        }
    }
}