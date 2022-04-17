using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class CustomersController : Controller
    {
        // GET: Customers
        private Entity_Dh_Food db = new Entity_Dh_Food();
        public ActionResult Index(Search_Customers model)
        {
            model.txbName = model.txbName == null ? string.Empty : model.txbName.Trim();
            model.txbUsername = model.txbUsername == null ? string.Empty : model.txbUsername.Trim();
            model.txbPhoneNumber = model.txbPhoneNumber == null ? string.Empty : model.txbPhoneNumber.Trim();
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
                           gender = c.gender,
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
            else if (model.phone_number == null || !Regex.Match(model.phone_number, @"^[0,+84][0-9]{9}$").Success || model.phone_number.Length != 10)
            {
                msg = "Tạo mới không thành công! Số điện thoại của quý khách không đúng định dạng!";
                status = -1;
            }
            else if (sqlSDT != null)
            {
                msg = "Tạo mới không thành công! Số điện thoại của quý khách đã được đăng ký!";
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

        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customers cus = db.Customers.Find(id);
            ViewBag.district = new CustomersController().getDistricts();
            if (cus == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDetail", cus);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customers cus = db.Customers.Find(id);
            ViewBag.district = new CustomersController().getDistricts();
            if (cus == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialEdit", cus);
        }

        [HttpPost]
        public ActionResult Edit(Customers cus)
        {
            var msg = "";
            var status = 0;
            var sqlSDT = db.Customers.Where(x => x.phone_number == cus.phone_number).ToList();
            var result = db.Customers.SingleOrDefault(b => b.id == cus.id);
            ViewBag.district = new CustomersController().getDistricts();

            if (result != null)
            {
                result.name = cus.name;
                result.username = cus.username;
                if (cus.passwords.Length < 8)
                {
                    msg = "Cập nhật không thành công! Password phải có nhiều hơn 8 kí tự!";
                    status = -1;
                }
                else
                {
                    result.passwords = cus.passwords;
                    if (cus.phone_number == null || !Regex.Match(cus.phone_number, @"^[0-9]+$").Success || cus.phone_number.Length != 10)
                    {
                        msg = "Cập nhật không thành công! Số điện thoại của quý khách không đúng định dạng!";
                        status = -1;
                    }
                    else if (sqlSDT.Count() > 1)
                    {
                        msg = "Cập nhật không thành công! Số điện thoại của quý khách đã được đăng ký!";
                        status = -1;
                    }
                    else
                    {
                        result.phone_number = cus.phone_number;
                        result.birth_date = cus.birth_date;
                        result.email = cus.email;
                        result.addresss = cus.addresss;
                        result.gender = cus.gender;
                        result.is_active = cus.is_active;
                        result.id_district = cus.id_district;

                        db.SaveChanges();
                        msg = "Cập nhật thông tin khách hàng thành công!";
                        status = 1;
                    }
                }
            }
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customers cus = db.Customers.Find(id);
            if (cus == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDelete", cus);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            Orders Od = db.Orders.Where(x => x.id_customer == id).FirstOrDefault();
            Customers cuss = db.Customers.Where(x => x.id == id).FirstOrDefault();
            var msgDel = "";
            var status = 0;
            if (Od != null)
            {
                msgDel = "Khách hàng đã, đang có đơn hàng. Không thể xóa!";
                status = -1;
            }
            else if (cuss.is_active == 1)
            {
                msgDel = "khách hàng đang được kích hoạt. Không thể xóa!";
                status = -1;
            }
            else
            {
                Customers cus = db.Customers.Find(id);
                db.Customers.Remove(cus);
                db.SaveChanges();
                msgDel = "Xóa khách hàng thành công!";
                status = 1;
            }

            return Json(new { msg = msgDel, status = status }, JsonRequestBehavior.AllowGet);
        }
    }
}