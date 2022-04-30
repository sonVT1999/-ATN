using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class MessageContact
    {
        public string DonHangId { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public DateTime ModifyDate { get; set; }
        public DateTime CreateDate { get; set; }
    }
}