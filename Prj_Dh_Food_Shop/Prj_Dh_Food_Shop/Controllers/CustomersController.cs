using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class CustomersController : Controller
    {
        // GET: Customers
        private Entity_Dh_Food db = new Entity_Dh_Food();

        // GET: Users
        public ActionResult Index(Search_Customers model)
        {
            model.txbName = model.txbName == null ? string.Empty : model.txbName.Trim();
            model.txbUsername = model.txbUsername == null ? string.Empty : model.txbUsername.Trim();
            model.txbPhoneNumber = model.txbPhoneNumber == null ? string.Empty : model.txbPhoneNumber.Trim();
            model.txbEmail = model.txbEmail == null ? string.Empty : model.txbEmail.Trim();
            model.txbAddress = model.txbAddress == null ? string.Empty : model.txbAddress.Trim();

            model.page = model.page == 0 ? 1 : model.page;
            model.pageSize = model.pageSize == 0 ? 3 : model.pageSize;

            var data = from c in db.Customers
                       join p in db.Districts on c.id_district equals p.id
                       where (string.IsNullOrEmpty(model.txbName) || c.name.Contains(model.txbName))
                       && (!string.IsNullOrEmpty(model.username) || c.username.Contains(model.txbUsername)) && (!string.IsNullOrEmpty(model.phone_number) || c.phone_number.Contains(model.txbPhoneNumber))
                       && (!string.IsNullOrEmpty(model.addresss) || c.addresss.Contains(model.txbAddress))
                       select new Search_Customers()
                       {
                           id = c.id,
                           name = c.name,
                           username = c.username,
                           passwords = c.passwords,
                           email = c.email,
                           phone_number = c.phone_number,
                           addresss = c.addresss,
                           is_active = c.is_active,
                           district_name = p.name,
                       };

            var rs = data.OrderBy(x => x.id).Skip(((model.page - 1) * model.pageSize)).Take(model.pageSize).ToList() ?? new List<Search_Customers>();

            ViewBag.district = new CustomersController().getDistricts();

            model.lstData = rs;
            model.totalRecord = data.Count();
            model.totalPage = (int)Math.Ceiling((decimal)model.totalRecord / model.pageSize);
            return View(model);
        }

        public List<Districts> getDistricts()
        {
            var model = db.Districts.ToList();
            return model;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Customers model)
        {
            var sqlSDT = db.Customers.Where(x => x.phone_number == model.phone_number).FirstOrDefault();
            var sqUser = db.Customers.Where(x => x.username == model.username).FirstOrDefault();
            db.Customers.Add(model);
            var msg = "";
            var status = 0;
            if (model.passwords.Length < 8)
            {
                msg = "Tạo mới không thành công! Password phải có nhiều hơn 8 kí tự!";
                status = -1;
            }
            else if (model.phone_number == null || !Regex.Match(model.phone_number, @"^[0-9]+$").Success || model.phone_number.Length != 10)
            {
                msg = "Tạo mới không thành công! Số điện thoại của quý khách không đúng định dạng!";
                status = -1;
            }
            else if (sqlSDT != null)
            {
                msg = "Tạo mới không thành công! Số điện thoại của quý khách đã tồn tại!";
                status = -1;
            }
            else if (sqUser != null)
            {
                msg = "Tạo mới không thành công! tên tài khoản của quý khách đã tồn tại!";
                status = -1;
            }
            else
            {
                model.is_active = 1;
                model.create_date = DateTime.Now;
                db.SaveChanges();
                msg = "Thêm mới khách hàng thành công!";
                status = 1;
            }
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }
    }
}