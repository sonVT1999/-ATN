using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Areas.Client.Controllers
{
    public class CartsController : Controller
    {
        // GET: Client/Carts
        public ActionResult Index()
        {
            return View();
        }
    }
}