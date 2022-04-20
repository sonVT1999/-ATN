using Prj_Dh_Food_Shop.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class BaseController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();
        protected override void OnActionExecuting(ActionExecutingContext fillterContext)
        {
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
                //fillterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Account", action = "Login" }));
            }

            base.OnActionExecuting(fillterContext);
        }
    }
}