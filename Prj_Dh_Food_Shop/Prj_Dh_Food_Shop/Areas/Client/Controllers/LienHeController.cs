﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Areas.Client.Controllers
{
    public class LienHeController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();
        // GET: Client/LienHe
        public ActionResult Index()
        {
            ViewBag.categoryList = db.Categories.ToList();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Feedbacks model)
        {
            db.Feedbacks.Add(model);
            var msg = "";
            var status = 0;
                model.feedback_date = DateTime.Now;
                db.SaveChanges();
                msg = " Cảm ơn bạn đã gửi ý kiến cho chúng tôi!. Chúng tôi sẽ phản hồi lại bạn sớm nhất có thể.";
                status = 1;
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }
    }
}