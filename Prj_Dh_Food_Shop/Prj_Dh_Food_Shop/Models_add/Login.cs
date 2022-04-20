using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Prj_Dh_Food_Shop
{
    public class Login
    {

        public Login()
        {
            FailedLogins = 0;
        }

        public string UserName { get; set; }

        public string Password { get; set; }

        public bool RememberMe { get; set; }

        public int FailedLogins { get; set; }

        public string Captcha { get; set; }

    }
}