using Prj_Dh_Food_Shop.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Prj_Dh_Food_Shop.Controllers
{
    public class ReportsController : BaseController
    {
        private Entity_Dh_Food db = new Entity_Dh_Food();
        // GET: Reports

        [HasCredential(RoleId = "VIEW_REPORT")]
        public ActionResult Index()
        {
            return View();
        }

        public enum OverviewFilter
        {
            [Description("Hôm nay")] Today = 1,
            [Description("7 ngày gần nhất")] SevenDaysRecent = 2,
            [Description("Tháng này")] CurrentMonth = 3,
            [Description("Tháng trước")] PreviousMonth = 4,
            [Description("3 tháng gần nhất")] ThreeMonthsRecent = 5,
            [Description("6 tháng gần nhất")] SixMonthsRecent = 11,
            [Description("Khoảng thời gian cụ thể")] FromDayToDay = 6,
            [Description("Hôm qua")] LastDay = 7,
            [Description("Tuần này")] CurrentWeek = 9,
        }

        [HttpPost]
        public JsonResult SearchReportForChart(ReportTurnover request)
        {
            var nowDate = DateTime.Now.Date;
            var queryOrders = db.Orders.Where(x => x.id != 0);
            var tripQueryTemp = queryOrders;
            var beginDate = nowDate;
            var endDate = nowDate;

            if (request.FilterValue == null)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }

            if (request.FilterValue == (int)OverviewFilter.Today)
            {
                queryOrders = queryOrders.Where(x => x.order_date == nowDate);
            }
            if (request.FilterValue == (int)OverviewFilter.SevenDaysRecent)
            {
                var sevenDaysRecent = nowDate.AddDays(-6);
                beginDate = sevenDaysRecent;
                queryOrders = queryOrders.Where(x => x.order_date >= sevenDaysRecent && x.order_date <= nowDate);
            }
            if (request.FilterValue == (int)OverviewFilter.CurrentMonth)
            {
                var firstDayOfMonth = new DateTime(nowDate.Year, nowDate.Month, 1);
                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
                beginDate = firstDayOfMonth;
                endDate = lastDayOfMonth;
                queryOrders = queryOrders.Where(x => x.order_date >= firstDayOfMonth && x.order_date <= lastDayOfMonth);
            }
            if (request.FilterValue == (int)OverviewFilter.PreviousMonth)
            {
                var nowDatePreviousMonth = nowDate.AddMonths(-1);
                var firstDayOfMonth = new DateTime(nowDatePreviousMonth.Year, nowDatePreviousMonth.Month, 1);
                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
                beginDate = firstDayOfMonth;
                endDate = lastDayOfMonth;
                queryOrders = queryOrders.Where(x => x.order_date >= firstDayOfMonth && x.order_date <= lastDayOfMonth);
            }
            if (request.FilterValue == (int)OverviewFilter.ThreeMonthsRecent)
            {
                var threeMonthsRecent = nowDate.AddMonths(-3);
                beginDate = threeMonthsRecent;
                queryOrders = queryOrders.Where(x => x.order_date >= threeMonthsRecent && x.order_date <= nowDate);
            }

            var rs = (from t in queryOrders
                      orderby t.order_date
                      select new ReportTurnover()
                      {
                          id = t.id,
                          name = t.name,
                          statuss = t.statuss,
                          id_user = t.id_user,
                          id_customer = t.id_customer,
                          id_payment_method = t.id_payment_method,
                          order_date = t.order_date,
                          total = t.total,
                      }).ToList() ?? new List<ReportTurnover>();

            var lstData = new List<ReportTurnover>();

            lstData = rs.OrderBy(x => x.order_date).GroupBy(x => x.order_date).Select(o => new ReportTurnover()
            {
                order_date = o.Select(x => x.order_date).FirstOrDefault(),
                soluong = o.Select(x => x.id).Count(),
                doanhthu = o.Sum(x => x.total),
            }).ToList() ?? new List<ReportTurnover>();

            return Json(lstData.OrderBy(x => x.order_date).ToList(), JsonRequestBehavior.AllowGet);
        }

        //[HttpPost]
        //public List<ReportTurnover> SearchReportForTable(ReportTurnover request)
        //{
        //    var nowDate = DateTime.Now.Date;
        //    var queryOrders = db.Orders.Where(x => x.id != 0);
        //    List<ReportTurnover> data = new List<ReportTurnover>();
        //    var tripQueryTemp = queryOrders;
        //    var beginDate = nowDate;
        //    var endDate = nowDate;

        //    if (request.FilterValue == (int)OverviewFilter.Today)
        //    {
        //        queryOrders = queryOrders.Where(x => x.order_date == nowDate);
        //    }
        //    if (request.FilterValue == (int)OverviewFilter.SevenDaysRecent)
        //    {
        //        var sevenDaysRecent = nowDate.AddDays(-6);
        //        beginDate = sevenDaysRecent;
        //        queryOrders = queryOrders.Where(x => x.order_date >= sevenDaysRecent && x.order_date <= nowDate);
        //    }
        //    if (request.FilterValue == (int)OverviewFilter.CurrentMonth)
        //    {
        //        var firstDayOfMonth = new DateTime(nowDate.Year, nowDate.Month, 1);
        //        var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
        //        beginDate = firstDayOfMonth;
        //        endDate = lastDayOfMonth;
        //        queryOrders = queryOrders.Where(x => x.order_date >= firstDayOfMonth && x.order_date <= lastDayOfMonth);
        //    }
        //    if (request.FilterValue == (int)OverviewFilter.PreviousMonth)
        //    {
        //        var nowDatePreviousMonth = nowDate.AddMonths(-1);
        //        var firstDayOfMonth = new DateTime(nowDatePreviousMonth.Year, nowDatePreviousMonth.Month, 1);
        //        var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
        //        beginDate = firstDayOfMonth;
        //        endDate = lastDayOfMonth;
        //        queryOrders = queryOrders.Where(x => x.order_date >= firstDayOfMonth && x.order_date <= lastDayOfMonth);
        //    }
        //    if (request.FilterValue == (int)OverviewFilter.ThreeMonthsRecent)
        //    {
        //        var threeMonthsRecent = nowDate.AddMonths(-3);
        //        beginDate = threeMonthsRecent;
        //        queryOrders = queryOrders.Where(x => x.order_date >= threeMonthsRecent && x.order_date <= nowDate);
        //    }

        //    var rs = (from t in queryOrders
        //              orderby t.order_date
        //              select new ReportTurnover()
        //              {
        //                  id = t.id,
        //                  name = t.name,
        //                  statuss = t.statuss,
        //                  id_user = t.id_user,
        //                  id_customer = t.id_customer,
        //                  id_payment_method = t.id_payment_method,
        //                  order_date = t.order_date,
        //                  total = t.total,
        //              }).ToList() ?? new List<ReportTurnover>();

        //    var lstData = new List<ReportTurnover>();

        //    lstData = rs.OrderBy(x => x.order_date).GroupBy(x => x.order_date).Select(o => new ReportTurnover()
        //    {
        //        order_date = o.Select(x => x.order_date).FirstOrDefault(),
        //        soluong = o.Select(x => x.id).Count(),
        //        doanhthu = o.Sum(x => x.total),
        //    }).ToList() ?? new List<ReportTurnover>();

        //    data = lstData.OrderBy(x => x.order_date).Skip(((request.page - 1) * request.pageSize)).Take(request.pageSize).ToList();
        //    return data;
        //}
    }
}