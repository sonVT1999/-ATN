using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

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
            return View(list);
        }

        public ActionResult AddItem(int productId, int quantity)
        {
            var product = new ProductController().VỉewDetail(productId);

            var cart = Session[CartSession];

            var list = (List<CartItem>)cart?? new List<CartItem>();
            if(cart != null)
            {
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
                list.Add(item);
                
                Session[CartSession] = list;
            }
            return RedirectToAction("Index", list );
        }

        public JsonResult Delete(int id)
        {
            var sessionCart = (List<CartItem>)Session[CartSession];
            sessionCart.RemoveAll(x => x.Product.id == id);
            Session[CartSession] = sessionCart;
            return Json(new
            {
                status = true
             });
        }

        public JsonResult Edit(string cartModel)
        {
            var jsonCart = new JavaScriptSerializer().Deserialize<List<CartItem>>(cartModel);
            var sessionCart = (List<CartItem>)Session[CartSession];
            foreach (var item in sessionCart)
            {
                var jsonItem = jsonCart.SingleOrDefault(x => x.Product.id == item.Product.id);
                if (jsonItem != null)
                {
                    if (jsonItem.Quantity > 0)
                    item.Quantity = jsonItem.Quantity;
                    else
                    {
                        return Json(new
                        {
                            status = false
                        });
                    }
                }
            }
            Session[CartSession] = sessionCart;
            return Json(new
            {
                status = true
            });
        }

        public ActionResult CheckoutComplete()
        {
            return View();
        }
    }
}