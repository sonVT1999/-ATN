using System;
using System.Collections.Generic;
using System.Linq;
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
            if (model.txbDateFrom == null)
            {
                model.txbDateFrom = model.txbDateFrom;
            }
            if (model.txbDateTo < model.txbDateTo && model.txbDateTo != null)
            {
                DateTime temp = model.txbDateFrom;
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
                       //&& (model.txbDateFrom == null || o.order_date >= model.txbDateFrom) && (model.txbDateTo == null || o.order_date <= model.txbDateTo)
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
    }
}