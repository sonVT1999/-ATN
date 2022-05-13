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

namespace Prj_Dh_Food_Shop.Controllers
{
    public class FeedbacksController : BaseController
    {
        // GET: Feedbacks
        private Entity_Dh_Food db = new Entity_Dh_Food();
        public ActionResult Index(Search_Feedbacks model)
        {
            model.txbName = model.txbName == null ? string.Empty : model.txbName.Trim();

            model.page = model.page == 0 ? 1 : model.page;
            model.pageSize = model.pageSize == 0 ? 5 : model.pageSize;

            var data = from f in db.Feedbacks
                       where (string.IsNullOrEmpty(model.txbName) || f.customer_name.Contains(model.txbName))
                       && ((model.txb_is_active) == 0 || f.is_active == model.txb_is_active)
                       select new Search_Feedbacks()
                       {
                           id = f.id,
                           customer_name = f.customer_name,
                           phone_number = f.phone_number,
                           addresss = f.addresss,
                           email = f.email,
                           title = f.title,
                           descriptions = f.descriptions,
                           feedback_date = f.feedback_date,
                           is_active = f.is_active
                       };

            var rs = data.OrderBy(x => x.is_active).Skip(((model.page - 1) * model.pageSize)).Take(model.pageSize).ToList() ?? new List<Search_Feedbacks>();

            ViewBag.customer = new FeedbacksController().getCustomers();

            model.lstData = rs;
            model.totalRecord = data.Count();
            model.totalPage = (int)Math.Ceiling((decimal)model.totalRecord / model.pageSize);
            return View(model);
        }

        public List<Customers> getCustomers()
        {
            var model = db.Customers.ToList();
            return model;
        }

        [HttpPost]
        public ActionResult Edit(int? id)
        {
            var msg = "";
            var status = 0;
            var result = db.Feedbacks.SingleOrDefault(b => b.id == id);

            if (result != null)
            {
                SendEmail(result.id);
                result.is_active = 2;
                db.SaveChanges();
                msg = "Gửi phản hồi thành công!";
                status = 1;
            }
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }

        public void SendEmail(int id)
        {
            string from = ConfigurationManager.AppSettings["FromAddress"].ToString();
            string pass = ConfigurationManager.AppSettings["PasswordFromAddress"].ToString();
            string host = ConfigurationManager.AppSettings["HostMail"].ToString();
            string name = ConfigurationManager.AppSettings["NameDisplayEmail"].ToString();
            string to = (from s in db.Feedbacks
                         where s.id == id
                         select s.email).FirstOrDefault();


            string strSubject = $"Lời cảm ơn từ Dh Foods!";
            string strMsg = "<b>XIN CHÀO ANH/CHỊ !!!</b><br />" +
                            " Thay mặt cho công ty Dh_foods. Em xin cảm ơn anh/chị đã góp ý, phản hồi về sản phẩm và chất lượng sản phẩm của bên em. Em xin ghi nhận ý kiến của anh/chị và cố gắng hoàn thiện sản phẩm. <br /><br />" +
                            "<b> CHÚC ANH/CHỊ MỘT NGÀY VUI VẺ!!!</b> ";

            MailAddress fromAddress = new MailAddress(from, name);
            MailAddress toAddress = new MailAddress(to, from);

            SmtpClient smtp = new SmtpClient
            {
                Host = host,
                Port = 587,
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, pass),
                DeliveryMethod = SmtpDeliveryMethod.Network,
            };

            using (MailMessage mailMessage = new MailMessage(fromAddress, toAddress)
            {
                Subject = strSubject,
                Body = strMsg,
                IsBodyHtml = true,
            })
            {
                try
                {
                    mailMessage.AlternateViews.Add(GetEmbeddedImage(strMsg));
                    smtp.Send(mailMessage);
                }
                catch (Exception ex)
                {
                    View(ex.Message);
                }
            }
        }

        public AlternateView GetEmbeddedImage(string email)
        {
            var baseDirectory = System.AppDomain.CurrentDomain.BaseDirectory;
            string path = Path.Combine(baseDirectory, "assets", "img", "dhfood_logo.png");
            LinkedResource res = new LinkedResource(path);
            res.ContentId = Guid.NewGuid().ToString();
            string img = @"<img src='cid:" + res.ContentId + @"'/>";
            email = String.Format(email, img);
            AlternateView alternateView = AlternateView.CreateAlternateViewFromString(email, null, MediaTypeNames.Text.Html);
            alternateView.LinkedResources.Add(res);
            return alternateView;
        }
    }
}