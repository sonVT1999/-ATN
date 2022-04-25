using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Areas.Client.Controllers
{
    public class CartsController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();
        private const string CartSession = "CartSession";
        // GET: Client/Carts
        public ActionResult Index()
        {
            ViewBag.categoryList = db.Categories.ToList();
            var cart = Session[CartSession];
            var list = new List<CartItem>();
            if (cart != null)
            {
                list = (List<CartItem>)cart;
            }
            return View();
        }

        public ActionResult AddItem(int productId, int quantity)
        {
            var product = new ProductController().VỉewDetail(productId);
            var cart = Session[CartSession];
            if(cart != null)
            {
                var list = (List<CartItem>)cart;
                if (list.Exists(x => x.Product.id == productId))
                {
                    foreach (var item in list)
                    {
                        if (item.Product.id == productId)
                        {
                            item.Quantity += quantity;
                        }
                    }
                }
                else
                {
                    var item = new CartItem();
                    item.Product = product;
                    item.Quantity = quantity;
                    list.Add(item);
                }

            }
            else
            {
                var item = new CartItem();
                item.Product = product;
                item.Quantity = quantity;
                var list = new List<CartItem>();
                list.Add(item);

                Session[CartSession] = list;
            }
            return RedirectToAction("Index");
        }

        public ActionResult CheckoutComplete()
        {
            return View();
        }
    }
}