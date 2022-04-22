using Prj_Dh_Food_Shop.Common;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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
            ViewBag.category = db.Categories.ToList();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(string username, string passwords, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var data = db.Customers.Where(s => s.username.Equals(username) && s.passwords.Equals(passwords) && s.is_active == 1).FirstOrDefault();
                if (data != null)
                {
                    //add session
                    Session.Add(CommonConstants.KH_SESSION, data);
                    if (IsLocalUrl(returnUrl))
                        return Redirect(returnUrl);

                    return RedirectToAction("Index", "Homes");
                }
                else
                {
                    ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng");
                }
            }
            return View("Index");
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