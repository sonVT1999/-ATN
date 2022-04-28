using Prj_Dh_Food_Shop.Common;
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

            var sessionCart = (List<CartItem>)Session[CartSession];
            List<string> lst = new List<string>();
            List<int> lstInt = new List<int>();
            var jsonCart = new JavaScriptSerializer().Deserialize<List<CartItem>>(cartModel);

            foreach (var item in jsonCart)
            {
                var jsonItem = sessionCart.SingleOrDefault(x => x.Product.id == item.Product.id);
                if (jsonItem != null)
                {
                    if (jsonItem.Quantity > 0)
                        jsonItem.Quantity = item.Quantity;
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

            foreach (var item in jsonCart)
            {
                var jsonItem = sessionCart.SingleOrDefault(x => x.Product.id == item.Product.id);

                var money = jsonItem.Product.price * jsonItem.Quantity;
                var moneyStr = money.ToString("#,##");
                lst.Add(moneyStr);
                lstInt.Add(money);
            }
            var TotalMoneyString = lstInt.Sum().ToString("#,##");
            lst.Add(TotalMoneyString);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CheckoutComplete()
        {
            return View();
        }

        public ActionResult Payment()
        {
            var kh = (Customers)Session[CommonConstants.KH_SESSION];
            if (kh == null)
            {
                return RedirectToAction("Index", "Carts");
            }
            else
            {
                var cart = Session[CartSession];
                var list = new List<CartItem>();
                if (cart != null)
                {
                    list = (List<CartItem>)cart;
                }
                return View(list);
            }
        }

        [HttpPost]
        public ActionResult Checkout()
        {
            List<string> lst = new List<string>();
            List<int> lstInt = new List<int>();
            var cart = (List<CartItem>)Session[CartSession];

            foreach (var item in cart)
            {
                var jsonItem = cart.SingleOrDefault(x => x.Product.id == item.Product.id);

                var money = jsonItem.Product.price * jsonItem.Quantity;
                var moneyStr = money.ToString("#,##");
                lst.Add(moneyStr);
                lstInt.Add(money);
            }
            var TotalMoneyString = lstInt.Sum().ToString("#,##");
            lst.Add(TotalMoneyString);


            var code = GenerateCodeOrder("CodeOrder");
            var kh = (Customers)Session[CommonConstants.KH_SESSION];
            var order = new Orders();
            order.id_customer = kh.id;
            order.statuss = 0;
            order.createAt = DateTime.Now;
            order.name = code;
            order.order_date = DateTime.Now;
            order.total =Convert.ToDouble(TotalMoneyString);

            try
            {
                var id = new Cart().Insert(order);
                var cartDetail = new CartDetail();
                foreach (var item in cart)
                {
                    var orderDetail = new Orders_detail();
                    orderDetail.id_product = item.Product.id;
                    orderDetail.id_order = id;
                    orderDetail.counts = item.Quantity;
                    orderDetail.amount = item.Quantity * item.Product.price;
                    cartDetail.Insert(orderDetail);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            cart.Clear();
            return Redirect("/Client/Carts/CheckoutComplete");
        }


        public string GenerateCodeOrder(string KeyCode)
        {
            var code = "";
            var data = db.GenCode.Where(t => t.KeyCode == KeyCode).FirstOrDefault();
            if (data == null) return null;

            var StartValue = data.StartValue + 1;
            var gencode = data.Prefix + (code + StartValue).PadLeft(data.LengthValue, '0');

            //Cập nhật lại giá trị
            var uItem = db.GenCode.Where(t => t.id == data.id).FirstOrDefault();
            uItem.StartValue = StartValue;
            db.SaveChanges();

            return gencode;

        }

    }
}