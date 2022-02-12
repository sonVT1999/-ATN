using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class OrdersController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();

        public ActionResult Index(Search_Orders model)
        {
            model.txbCustomername = model.txbCustomername == null ? string.Empty : model.txbCustomername.Trim();
            if (model.txbDateFrom != null)
            {
                model.txbDateFrom = model.txbDateFrom;
            }
            if (model.txbDateTo < model.txbDateTo && model.txbDateTo != null)
            {
                DateTime? temp = model.txbDateFrom;
                model.txbDateFrom = model.txbDateFrom;
                model.txbDateFrom = temp;
            }
            else
            {
                model.txbDateTo = model.txbDateTo;
            }

            model.page = model.page == 0 ? 1 : model.page;
            model.pageSize = model.pageSize == 0 ? 3 : model.pageSize;

            var data = from o in db.Orders
                       join c in db.Customers on o.id_customer equals c.id
                       join u in db.Users on o.id_user equals u.id
                       join p in db.Payment_methods on o.id_payment_method equals p.id
                       where (string.IsNullOrEmpty(model.txbCustomername) || c.name.Contains(model.txbCustomername))
                       && (!model.txbDateFrom.HasValue || o.order_date >= model.txbDateFrom) && (!model.txbDateFrom.HasValue || o.order_date <= model.txbDateTo)
                       select new Search_Orders()
                       {
                           id = o.id,
                           name = o.name,
                           total = o.total,
                           order_date = o.order_date,
                           statuss = o.statuss,
                           user_name = u.name,
                           customer_name = c.name,
                           payment_method_name = p.name,

                       };

            var rs = data.OrderBy(x => x.id).Skip(((model.page - 1) * model.pageSize)).Take(model.pageSize).ToList() ?? new List<Search_Orders>();

            ViewBag.customer = new OrdersController().getCustomers();
            ViewBag.user = new OrdersController().getUsers();
            ViewBag.payment = new OrdersController().getPayments();

            model.lstData = rs;
            model.totalRecord = data.Count();
            model.totalPage = (int)Math.Ceiling((decimal)model.totalRecord / model.pageSize);
            return View(model);
        }

        public List<Customers> getCustomers()
        {
            var model = db.Customers.ToList();
            return model;
        }

        public List<Users> getUsers()
        {
            var model = db.Users.ToList();
            return model;
        }

        public List<Payment_methods> getPayments()
        {
            var model = db.Payment_methods.ToList();
            return model;
        }

        public List<Products> getProducts()
        {
            var model = db.Products.ToList();
            return model;
        }

        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var ord = from od in db.Orders_detail
                      join o in db.Orders on od.id_order equals o.id
                      join p in db.Products on od.id_product equals p.id
                      where od.id_order == o.id
                      where od.id_product == p.id
                      where od.id_order == id
                      select new Search_Orders_Detail()
                      {
                          id = od.id,
                          product_name = p.name,
                          counts = od.counts,
                          amount = od.amount,
                      };

            var rs = ord.OrderBy(x => x.id).ToList() ?? new List<Search_Orders_Detail>();

            ViewBag.product = new OrdersController().getProducts();
            if (ord == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDetail", ord);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Orders ord = db.Orders.Find(id);

            ViewBag.customer = new OrdersController().getCustomers();
            ViewBag.user = new OrdersController().getUsers();
            ViewBag.payment = new OrdersController().getPayments();
            if (ord == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialEdit", ord);
        }

        [HttpPost]
        public ActionResult Edit(Orders ord)
        {
            var msg = "";
            var status = 0;
            var result = db.Orders.SingleOrDefault(b => b.id == ord.id);

            ViewBag.customer = new OrdersController().getCustomers();
            ViewBag.user = new OrdersController().getUsers();
            ViewBag.payment = new OrdersController().getPayments();

            if (result != null)
            {
                result.statuss = ord.statuss;

                db.SaveChanges();
                msg = "Cập nhật thông tin đơn hàng thành công!";
                status = 1;
            }
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Orders ord = db.Orders.Find(id);
            if (ord == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDelete", ord);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            var msgDel = "";
            var status = 0;
            Orders ord = db.Orders.Find(id);
            db.Orders.Remove(ord);
            db.SaveChanges();
            msgDel = "Xóa đơn đặt hàng thành công!";
            status = 1;

            return Json(new { msg = msgDel, status = status }, JsonRequestBehavior.AllowGet);
        }
    }
}