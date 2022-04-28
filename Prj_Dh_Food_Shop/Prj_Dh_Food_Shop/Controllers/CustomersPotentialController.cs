using Prj_Dh_Food_Shop.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class CustomersPotentialController : BaseController
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();

        [HasCredential(RoleId = "VIEW_CUS")]
        public ActionResult Index(Search_CustomersPotential model)
        {
            model.txbName = model.txbName == null ? string.Empty : model.txbName.Trim();
            model.txbPhone = model.txbPhone == null ? string.Empty : model.txbPhone.Trim();

            model.page = model.page == 0 ? 1 : model.page;
            model.pageSize = model.pageSize == 0 ? 3 : model.pageSize;

            var data = from c in db.Customers_potential
                       where (string.IsNullOrEmpty(model.txbName) || c.name.Contains(model.txbName))
                       && (string.IsNullOrEmpty(model.txbPhone) || c.name.Contains(model.txbPhone))
                       && (string.IsNullOrEmpty(model.txbStatus) || c.statuss == model.txbStatus)
                       select new Search_CustomersPotential()
                       {
                           id = c.id,
                           name = c.name,
                           phone_number = c.phone_number,
                           statuss = c.statuss,
                           note = c.note,
                       };

            var rs = data.OrderBy(x => x.statuss).Skip(((model.page - 1) * model.pageSize)).Take(model.pageSize).ToList() ?? new List<Search_CustomersPotential>();
            model.lstData = rs;
            model.totalRecord = data.Count();
            model.totalPage = (int)Math.Ceiling((decimal)model.totalRecord / model.pageSize);
            return View(model);
        }

        [HasCredential(RoleId = "EDIT_CUS")]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customers_potential cus_pot = db.Customers_potential.Find(id);
            if (cus_pot == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialEdit", cus_pot);
        }

        [HasCredential(RoleId = "EDIT_CUS")]
        [HttpPost]
        public ActionResult Edit(Customers_potential cus_pot)
        {
            var msg = "";
            var status = 0;
            var result = db.Customers_potential.SingleOrDefault(b => b.id == cus_pot.id);

            if (result != null)
            {
                result.statuss = cus_pot.statuss;
                result.note = cus_pot.note;

                db.SaveChanges();
                msg = "Cập nhật thông tin khách hàng thành công!";
                status = 1;
            }
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }


        [HasCredential(RoleId = "DEL_CUS")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customers_potential cus_pot = db.Customers_potential.Find(id);
            if (cus_pot == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDelete", cus_pot);
        }

        [HasCredential(RoleId = "DEL_CUS")]
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var msgDel = "";
            var status = 0;
            Customers_potential cus_pot = db.Customers_potential.Find(id);
            db.Customers_potential.Remove(cus_pot);
            db.SaveChanges();
            msgDel = "Xóa khách hàng thành công!";
            status = 1;

            return Json(new { msg = msgDel, status = status }, JsonRequestBehavior.AllowGet);
        }
    }
}