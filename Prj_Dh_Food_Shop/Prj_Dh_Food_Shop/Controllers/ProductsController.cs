using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.Entity;
using System.Net;
using System.IO;


namespace Prj_Dh_Food_Shop.Controllers
{
    public class ProductsController : Controller
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();

        public ActionResult Index(Search_Products model)
        {
            model.txbProductname = model.txbProductname == null ? string.Empty : model.txbProductname.Trim();
            if (model.txbPriceFrom == 0)
            {
                model.txbPriceFrom = model.txbPriceFrom;
            }
            if (model.txbPriceTo < model.txbPriceFrom && model.txbPriceTo != 0)
            {
                int temp = model.txbPriceFrom;
                model.txbPriceFrom = model.txbPriceTo;
                model.txbPriceTo = temp;
            }
            else
            {
                model.txbPriceTo = model.txbPriceTo;
            }

            model.page = model.page == 0 ? 1 : model.page;
            model.pageSize = model.pageSize == 0 ? 3 : model.pageSize;

            var data = from c in db.Products
                       join p in db.Categories on c.id_category equals p.id
                       where (string.IsNullOrEmpty(model.txbProductname) || c.name.Contains(model.txbProductname))
                       && (!model.id_category.HasValue || c.id_category == model.id_category)
                       && (model.txbPriceFrom == 0 || c.price >= model.txbPriceFrom) && (model.txbPriceTo == 0 || c.price <= model.txbPriceTo)
                       select new Search_Products()
                       {
                           id = c.id,
                           name = c.name,
                           price = c.price,
                           descriptions = c.descriptions,
                           promotion = c.promotion,
                           is_hot = c.is_hot,
                           is_new = c.is_new,
                           is_active = c.is_active,
                           category_name = p.name,
                       };

            var rs = data.OrderBy(x => x.id).Skip(((model.page - 1) * model.pageSize)).Take(model.pageSize).ToList() ?? new List<Search_Products>();

            var lstloai = new ProductsController().Loai();
            ViewBag.category = lstloai;

            model.lstloai = lstloai.ConvertAll(a => new SelectListItem()
            {
                Text = a.name,
                Value = a.id.ToString(),
            }) ?? new List<SelectListItem>();

            model.lstData = rs;
            model.totalRecord = data.Count();
            model.totalPage = (int)Math.Ceiling((decimal)model.totalRecord / model.pageSize);
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Products model)
        {
            db.Products.Add(model);
            var msg = "";
            var status = 0;
            if (model.price <= 0)
            {
                msg = "Tạo mới không thành công! giá sản phẩm phải là số dương!";
                status = -1;
            }
            else
            {
                model.create_date = DateTime.Now;
                model.is_new = 1;
                model.is_hot = 0;
                model.is_active = 1;
                db.SaveChanges();
                msg = "Thêm mới sản phẩm thành công!";
                status = 1;
            }
            return Json(new { msg = msg, status = status }, JsonRequestBehavior.AllowGet);
        }

        public List<Categories> Loai()
        {
            var model = db.Categories.ToList();
            return model;
        }

        //public ActionResult UploadImage(IEnumerable<HttpPostedFileBase> files)
        //{
        //    foreach (var file in files)
        //    {
        //        if (file != null && file.ContentLength > 0)
        //        {
        //            file.SaveAs(Path.Combine(Server.MapPath("/uploads"), Guid.NewGuid() + Path.GetExtension(file.FileName)));
        //        }
        //    }
        //    return View();
        //}

        public ActionResult Detail(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Products pros = db.Products.Find(id);
            ViewBag.category = new ProductsController().Loai();
            if (pros == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDetail", pros);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Products pros = db.Products.Find(id);
            ViewBag.category = new ProductsController().Loai();
            if (pros == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialEdit", pros);
        }

        [HttpPost]
        public ActionResult Edit(Products pros)
        {
            var msg = "";
            var status = 0;
            var result = db.Products.SingleOrDefault(b => b.id == pros.id);
            ViewBag.category = new ProductsController().Loai();

            if (result != null)
            {
                result.name = pros.name;
                if (pros.price <= 0)
                {
                    msg = "Cập nhật không thành công! Giá sản phẩm phải là số nguyên dương!";
                    status = -1;
                }
                else
                {
                    result.price = pros.price;
                    result.descriptions = pros.descriptions;
                    result.promotion = pros.promotion;
                    result.is_hot = pros.is_hot;
                    result.is_new = pros.is_new;
                    result.is_active = pros.is_active;
                    result.id_category = pros.id_category;

                    db.SaveChanges();
                    msg = "Cập nhật thông tin sản phẩm thành công!";
                    status = 1;
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
            Products pros = db.Products.Find(id);
            if (pros == null)
            {
                return HttpNotFound();
            }
            return PartialView("PartialDelete", pros);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            Products pro = db.Products.Where(x => x.id == id).FirstOrDefault();
            Orders_detail ord = db.Orders_detail.Where(x => x.id_product == id).FirstOrDefault();
            var msgDel = "";
            var status = 0;
            if (pro.is_active == 1)
            {
                msgDel = "Sản phẩm đang kích hoạt. Không thể xóa!";
                status = -1;
            }
            else if (ord != null)
            {
                msgDel = "Sản phẩm đang hoặc đã có trong đơn đặt hàng. Không thể xóa!";
                status = -1;
            }
            else
            {
                Products pros = db.Products.Find(id);
                db.Products.Remove(pros);
                db.SaveChanges();
                msgDel = "Xóa sản phẩm thành công!";
                status = 1;
            }

            return Json(new { msg = msgDel, status = status }, JsonRequestBehavior.AllowGet);
        }


    }
}