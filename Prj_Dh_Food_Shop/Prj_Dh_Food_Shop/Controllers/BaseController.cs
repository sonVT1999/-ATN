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
using FlexCel.Core;
using FlexCel.Render;
using FlexCel.Pdf;
using OfficeOpenXml;
using FlexCel.XlsAdapter;

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


        protected ActionResult ViewReport(ExcelFile xls, string fileName /*, bool? exportExcel*/)
        {
            try
            {
                //if (exportExcel != null && exportExcel == true)
                //{
                if (xls == null)
                    return new EmptyResult();

                using (var ms = new MemoryStream())
                    {
                    xls.Save(ms);
                    ms.Position = 0;
                    return File(ms.ToArray(), "application/vnd.xlsx", fileName + ".xlsx");
                }
                //}

                //if (xls == null)
                //    return new EmptyResult();

                //using (var pdf = new FlexCelPdfExport())
                //{
                //    pdf.Workbook = xls;
                //    pdf.FontEmbed = TFontEmbed.Embed;
                //    pdf.FontMapping = TFontMapping.ReplaceAllFonts;
                //    using (var ms = new MemoryStream())
                //    {
                //        pdf.BeginExport(ms);
                //        pdf.ExportAllVisibleSheets(false, "BaoCao");
                //        pdf.EndExport();
                //        ms.Position = 0;
                //        return File(ms.ToArray(), "application/pdf");
                //    }
                //}
            }
            catch (Exception ex)
            {
                return new EmptyResult();
            }
        }

        protected XlsFile CreateXlsFile(ExcelPackage excel)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var result = new XlsFile(true);
            try
            {
                using (var memoryStream = new MemoryStream(excel.GetAsByteArray()))
                {
                    result.Open(memoryStream);
                }
            }
            finally
            {
                ReleaseObjectReport(excel.Workbook);
                excel.Dispose();
            }
            return result;
        }

        protected void ReleaseObjectReport(object obj)
        {
            try
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(obj);
                obj = null;
            }
            catch
            {
                obj = null;
            }
            finally
            {
                GC.Collect();
            }
        }

    }
}