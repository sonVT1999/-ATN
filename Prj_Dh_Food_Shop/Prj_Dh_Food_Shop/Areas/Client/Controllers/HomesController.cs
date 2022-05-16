using Prj_Dh_Food_Shop.Common;
using Prj_Dh_Food_Shop.Controllers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Areas.Client.Controllers
{
    public class HomesController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();
        // GET: Client/Homes
        public ActionResult Index()
        {
            ViewBag.categoryList = db.Categories.ToList();
            ViewBag.Inner = db.Products.Where(x => x.is_hot == 1).ToList();
            return View();
        }

        public ActionResult Login()
        {
            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(Login login, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var data = db.Customers.Where(s => s.username.Equals(login.username) && s.is_active == 1).FirstOrDefault();
                if (data != null)
                {
                    bool authenSuccess;
                    authenSuccess = Encryption.CheckPassword(login.passwords, data.passwords, "");
                    if (authenSuccess)
                    {
                        //add session
                        Session.Add(CommonConstants.KH_SESSION, data);
                        if (IsLocalUrl(returnUrl))
                            return Redirect(returnUrl);
                        return RedirectToAction("Index", "Homes");
                    }
                    else
                    {
                        return Content("<script language='javascript' type='text/javascript'>alert('Tên đăng nhập hoặc mật khẩu không đúng!'); window.location.href = '/Client/Homes/Index';</script>");
                    }
                }
                else
                {
                    return Content("<script language='javascript' type='text/javascript'>alert('Tên đăng nhập hoặc mật khẩu không đúng!'); window.location.href = '/Client/Homes/Index';</script>");
                }
            }
            return View("Index");
        }


        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customers cus = db.Customers.Find(id);
            ViewBag.province = new CustomersController().getProvinces();
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
            ViewBag.province = new CustomersController().getProvinces();

            if (result != null)
            {
                result.name = cus.name;
                if (cus.passwords.Length < 8)
                {
                    msg = "Cập nhật không thành công! Password phải có nhiều hơn 8 kí tự!";
                    status = -1;
                }
                else
                {

                    result.passwords = Encryption.EncryptPassword(cus.passwords);
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
                    else if (!Regex.Match(cus.email, @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$").Success)
                    {
                        msg = "Cập nhật không thành công! Email không đúng định dạng!";
                        status = -1;
                    }
                    else
                    {
                        result.phone_number = cus.phone_number;
                        result.birth_date = cus.birth_date;
                        result.email = cus.email;
                        result.addresss = cus.addresss;
                        result.id_province = cus.id_province;

                        db.SaveChanges();
                        msg = "Cập nhật thông tin khách hàng thành công!";
                        status = 1;
                    }
                }
            }
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
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
            if (rs == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDetail", rs);
        }


        public ActionResult Order(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var ord = from od in db.Orders
                      join cus in db.Customers on od.id_customer equals cus.id
                      where cus.id == id
                      select new Search_Orders()
                      {
                          id = od.id,
                          name = od.name,
                          order_date = od.order_date,
                          total = od.total,
                      };

            var rs = ord.OrderByDescending(x => x.order_date).ToList() ?? new List<Search_Orders>();

            ViewBag.product = new OrdersController().getProducts();
            if (rs == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialOrder", rs);
        }

        /// <summary>
        ///     Checking return url is same with the current host or not
        /// </summary>
        /// <param name="url">return url string</param>
        /// <returns></returns>
        public static bool IsLocalUrl(string url)
        {
            if (string.IsNullOrEmpty(url))
                return false;
            return url[0] == '/' && (url.Length == 1 || url[1] != '/' && url[1] != '\\') || // "/" or "/foo" but not "//" or "/\"
                   url.Length > 1 &&
                   url[0] == '~' && url[1] == '/'; // "~/" or "~/foo"
        }

    }
}