using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.Entity;
using System.Net;
using Prj_Dh_Food_Shop;
using System.Text.RegularExpressions;
using Prj_Dh_Food_Shop.Common;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class UsersController : BaseController
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();

        // GET: Users
        [HasCredential(RoleId = "VIEW_USER")]
        public ActionResult Index(Search_Users model)
        {
            model.txbName = model.txbName == null ? string.Empty : model.txbName.Trim();
            model.txbUsername = model.txbUsername == null ? string.Empty : model.txbUsername.Trim();
            model.txbPhoneNumber = model.txbPhoneNumber == null ? string.Empty : model.txbPhoneNumber.Trim();

            model.page = model.page == 0 ? 1 : model.page;
            model.pageSize = model.pageSize == 0 ? 5 : model.pageSize;

            var data = from c in db.Users
                       join p in db.Provinces on c.id_province equals p.id
                       where (string.IsNullOrEmpty(model.txbName) || c.name.Contains(model.txbName))
                       && (!string.IsNullOrEmpty(model.username) || c.username.Contains(model.txbUsername)) && (!string.IsNullOrEmpty(model.phone_number) || c.phone_number.Contains(model.txbPhoneNumber))
                       select new Search_Users()
                       {
                           id = c.id,
                           name = c.name,
                           username = c.username,
                           passwords = c.passwords,
                           phone_number = c.phone_number,
                           addresss = c.addresss,
                           is_active = c.is_active,
                           permission = c.permission,
                           province_name = p.name,
                       };

            var rs = data.OrderBy(x => x.id).Skip(((model.page - 1) * model.pageSize)).Take(model.pageSize).ToList() ?? new List<Search_Users>();

            ViewBag.province = new UsersController().getProvinces();

            model.lstData = rs;
            model.totalRecord = data.Count();
            model.totalPage = (int)Math.Ceiling((decimal)model.totalRecord / model.pageSize);
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Users model)
        {
            var sqlSDT = db.Users.Where(x => x.phone_number == model.phone_number).FirstOrDefault();
            db.Users.Add(model);
            var msg = "";
            var status = 0;
            if (model.passwords.Length < 8)
            {
                msg = "Tạo mới không thành công! Password phải có nhiều hơn 8 kí tự!";
                status = -1;
            }
            else if (model.phone_number == null || !Regex.Match(model.phone_number, @"^[0,+84][0-9]{9}$").Success || model.phone_number.Length != 10)
            {
                msg = "Tạo mới không thành công! Số điện thoại của người dùng không đúng định dạng!";
                status = -1;
            }
            else if (sqlSDT != null)
            {
                msg = "Tạo mới không thành công! Số điện thoại của người dùng đã tồn tại!";
                status = -1;
            }
            else
            {
                model.is_active = 1;
                model.create_date = DateTime.Now;
                db.SaveChanges();
                msg = "Thêm mới người dùng thành công!";
                status = 1;
            }
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }
        public List<Provinces> getProvinces()
        {
            var model = db.Provinces.ToList();
            return model;
        }


        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Users users = db.Users.Find(id);
            ViewBag.province = new UsersController().getProvinces();
            if (users == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDetail", users);
        }


        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Users users = db.Users.Find(id);
            ViewBag.province = new UsersController().getProvinces();
            if (users == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialEdit", users);
        }


        [HttpPost]
        public ActionResult Edit(Users users)
        {
            var msg = "";
            var status = 0;
            var result = db.Users.SingleOrDefault(b => b.id == users.id);
            var sqlSDT = db.Users.Where(x => x.phone_number == users.phone_number).ToList();
            ViewBag.province = new UsersController().getProvinces();

            if (result != null)
            {
                result.name = users.name;
                result.username = users.username;
                if (users.passwords.Length < 8)
                {
                    msg = "Cập nhật không thành công! Password phải có nhiều hơn 8 kí tự!";
                    status = -1;
                }
                else
                {
                    result.passwords = users.passwords;
                    if (users.phone_number == null || !Regex.Match(users.phone_number, @"^[0,+84][0-9]{9}$").Success || users.phone_number.Length != 10)
                    {
                        msg = "Cập nhật không thành công! Số điện thoại của người dùng không đúng định dạng!";
                        status = -1;
                    }
                    else if (sqlSDT.Count() > 1)
                    {
                        msg = "Cập nhật không thành công! Số điện thoại này của người dùng đã được đăng ký!";
                        status = -1;
                    }
                    else
                    {
                        result.phone_number = users.phone_number;
                        result.addresss = users.addresss;
                        result.is_active = users.is_active;
                        result.permission = users.permission;
                        result.id_province = users.id_province;

                        db.SaveChanges();
                        msg = "Cập nhật thông tin người dùng thành công!";
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
            Users users = db.Users.Find(id);
            if (users == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDelete", users);
        }


        [HttpPost]
        public ActionResult Delete(int id)
        {
            Orders Od = db.Orders.Where(x => x.id_user == id).FirstOrDefault();
            Users user = db.Users.Where(x => x.id == id).FirstOrDefault();
            var msgDel = "";
            var status = 0;
            if (Od != null)
            {
                msgDel = "Người dùng đã, đang xử lý đơn hàng. Không thể xóa!";
                status = -1;
            }
            else if (user.is_active == 1)
            {
                msgDel = "Người dùng đang kích hoạt. Không thể xóa!";
                status = -1;
            }
            else
            {
                Users users = db.Users.Find(id);
                db.Users.Remove(users);
                db.SaveChanges();
                msgDel = "Xóa người dùng thành công!";
                status = 1;
            }

            return Json(new { msg = msgDel, status = status }, JsonRequestBehavior.AllowGet);
        }
    }
}