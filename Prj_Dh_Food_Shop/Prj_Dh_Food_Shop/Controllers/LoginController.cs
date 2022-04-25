using Prj_Dh_Food_Shop.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        private Entity_Dh_Food db = new Entity_Dh_Food();

        public ActionResult Index(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(string username, string passwords , string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var data = db.Users.Where(s => s.username.Equals(username) && s.passwords.Equals(passwords) && s.is_active == 1).FirstOrDefault();
                if (data != null)
                {
                    //add session
                    Session.Add(CommonConstants.USER_SESSION, data);
                    if (IsLocalUrl(returnUrl))
                        return Redirect(returnUrl);

                    return RedirectToAction("Index", "Dashboards");
                }
                else
                {
                    ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng");
                }
            }
            return View("Index");
        }

        //Logout
        public ActionResult Logout()
        {
            var user = (Users)Session[CommonConstants.USER_SESSION];
            var kh = (Customers)Session[CommonConstants.KH_SESSION];
            if (user != null)
            {
                Session.Remove(CommonConstants.USER_SESSION);
                return RedirectToAction("Index");
            }
            Session.Remove(CommonConstants.KH_SESSION);
            return RedirectToAction("Index", "Client/Homes/Index");
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