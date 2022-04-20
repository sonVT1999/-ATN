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

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(string user, string password)
        {
            if (ModelState.IsValid)
            {
                var data = db.Users.Where(s => s.username.Equals(user) && s.passwords.Equals(password)).ToList();
                if (data.Count() > 0)
                {
                    //add session
                    Session["name"] = data.FirstOrDefault().name;
                    Session["idUser"] = data.FirstOrDefault().id;
                    return RedirectToAction("Index" ,"Dashboards");
                }
                else
                {
                    ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng");
                }
            }
            return View();
        }

        //Logout
        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Index");
        }



    }
}