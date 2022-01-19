using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class PaymentsController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();
        public ActionResult Index(Search_Payments model)
        {
            model.txbName = model.txbName == null ? string.Empty : model.txbName.Trim();

            model.page = model.page == 0 ? 1 : model.page;
            model.pageSize = model.pageSize == 0 ? 3 : model.pageSize;

            var data = from c in db.Payment_methods
                       where (string.IsNullOrEmpty(model.txbName) || c.name.Contains(model.txbName))
                       select new Search_Payments()
                       {
                           id = c.id,
                           name = c.name,
                           is_active = c.is_active,
                       };

            var rs = data.OrderBy(x => x.id).Skip(((model.page - 1) * model.pageSize)).Take(model.pageSize).ToList() ?? new List<Search_Payments>();
            model.lstData = rs;
            model.totalRecord = data.Count();
            model.totalPage = (int)Math.Ceiling((decimal)model.totalRecord / model.pageSize);
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Payment_methods model)
        {
            db.Payment_methods.Add(model);
            var msg = "";
            var status = 0;
            model.is_active = 1;
            db.SaveChanges();
            msg = "Thêm mới phương thức thanh toán thành công!";
            status = 1;
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Payment_methods pays = db.Payment_methods.Find(id);
            if (pays == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialEdit", pays);
        }

        [HttpPost]
        public ActionResult Edit(Payment_methods pays)
        {
            var msg = "";
            var status = 0;
            var result = db.Payment_methods.SingleOrDefault(b => b.id == pays.id);

            result.name = pays.name;
            result.is_active = pays.is_active;

            db.SaveChanges();
            msg = "Cập nhật thông tin phương thức thanh toán thành công!";
            status = 1;
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Payment_methods pays = db.Payment_methods.Find(id);
            if (pays == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDelete", pays);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            Payment_methods pay = db.Payment_methods.Where(x => x.id == id).FirstOrDefault();
            Orders ord = db.Orders.Where(x => x.id_payment_method == id).FirstOrDefault();
            var msgDel = "";
            var status = 0;
            if (pay.is_active == 1)
            {
                msgDel = "Phương thức thanh toán đang kích hoạt. Không thể xóa!";
                status = -1;
            }
            else if (ord != null)
            {
                msgDel = "Phương thức thanh toán đang hoặc đã được khách hàng chọn để thanh toán. Không thể xóa!";
                status = -1;
            }
            else
            {
                Payment_methods pays = db.Payment_methods.Find(id);
                db.Payment_methods.Remove(pays);
                db.SaveChanges();
                msgDel = "Xóa phương thức thanh toán thành công!";
                status = 1;
            }

            return Json(new { msg = msgDel, status = status }, JsonRequestBehavior.AllowGet);
        }
    }
}