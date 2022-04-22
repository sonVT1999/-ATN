using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Areas.Client.Controllers
{
    public class ProductController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();
        // GET: Client/LienHe
        public ActionResult Index()
        {

            ViewBag.category = db.Categories.ToList();
            return View();
        }

        // GET: Client/Product/Nuoc_mam_phu_quoc
        public ActionResult product(int CategoryId)
        {
            ViewBag.category = db.Categories.FirstOrDefault(x => x.id == CategoryId);
            var data =  (from c in db.Products
                        join p in db.Categories on c.id_category equals p.id
                        join ima in db.Images_product on c.id equals ima.id_product
                        where p.id == CategoryId
                         select new Search_Products()
                                  {
                                      id = c.id,
                                      name = c.name,
                                      price = c.price,
                                      descriptions = c.descriptions,
                                      promotion = c.promotion,
                                      is_hot = c.is_hot,
                                      is_new = c.is_new,
                                      is_active = c.is_active,
                                      category_name = p.name,
                                      link = ima.link,
                                  }).ToList();

            return View("product", data);
        }
    }
}