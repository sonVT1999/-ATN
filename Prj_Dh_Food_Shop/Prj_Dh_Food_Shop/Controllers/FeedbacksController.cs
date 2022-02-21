using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class FeedbacksController : Controller
    {
        // GET: Feedbacks
        private Entity_Dh_Food db = new Entity_Dh_Food();
        public ActionResult Index(Search_Feedbacks model)
        {
            model.txbName = model.txbName == null ? string.Empty : model.txbName.Trim();

            model.page = model.page == 0 ? 1 : model.page;
            model.pageSize = model.pageSize == 0 ? 3 : model.pageSize;

            var data = from f in db.Feedbacks
                       join c in db.Customers on f.id_customer equals c.id
                       where (string.IsNullOrEmpty(model.txbName) || c.name.Contains(model.txbName))
                       && ((model.txb_is_active) == 0 || f.is_active == model.txb_is_active )
                       select new Search_Feedbacks()
                       {
                           id = f.id,
                           customer_name = c.name,
                           title = f.title,
                           descriptions = f.descriptions,
                           feedback_date = f.feedback_date,
                           is_active = f.is_active
                       };

            var rs = data.OrderBy(x => x.is_active).Skip(((model.page - 1) * model.pageSize)).Take(model.pageSize).ToList() ?? new List<Search_Feedbacks>();

            ViewBag.customer = new FeedbacksController().getCustomers();

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
    }
}