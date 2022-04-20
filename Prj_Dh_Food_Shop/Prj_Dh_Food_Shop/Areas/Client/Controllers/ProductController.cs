using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Areas.Client.Controllers
{
    public class ProductController : Controller
    {
        // GET: Client/Product
        public ActionResult Index()
        {
            return View();
        }

        // GET: Client/Product/Nuoc_mam_phu_quoc
        public ActionResult Nuoc_mam_phu_quoc()
        {
            return View();
        }
    }
}