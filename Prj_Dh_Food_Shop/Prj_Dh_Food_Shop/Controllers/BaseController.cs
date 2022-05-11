using Prj_Dh_Food_Shop.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

using Prj_Dh_Food_Shop.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class BaseController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();

        protected override void OnActionExecuting(ActionExecutingContext fillterContext)
        {
            ViewData["soluongOrder"] = db.Orders.Where(x => x.statuss == 0).Count();
            ViewData["soluongKH"] = db.Customers.Where(x => x.id != 0).Count();
            ViewData["soluongKHTN"] = db.Customers_potential.Where(x => x.statuss != "Đã gọi").Count();
            ViewData["soluongFeedback"] = db.Feedbacks.Where(x => x.is_active == 1).Count();

            var user = (Users)Session[CommonConstants.USER_SESSION];
            if (user == null)
            {
                FormsAuthentication.SignOut();
                string redirectTo = "~/Client/Homes/Index";
                if (!string.IsNullOrEmpty(fillterContext.HttpContext.Request.RawUrl))
                {
                    redirectTo = string.Format("~/Client/Homes/Index?ReturnUrl={0}", HttpUtility.UrlEncode(fillterContext.HttpContext.Request.Url.PathAndQuery));
                    fillterContext.Result = new RedirectResult(redirectTo);
                    return;
                }
            }

            base.OnActionExecuting(fillterContext);
        }
    }
}