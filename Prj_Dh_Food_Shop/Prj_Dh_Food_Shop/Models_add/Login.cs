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

        [Key]
        [Display(Name = "Tên đăng nhập")]
        [Required(ErrorMessage = "Tài khoản không được để trống")]
        public string username { set; get; }

        [Required(ErrorMessage = "Mật khẩu không được để trống")]
        [Display(Name = "Mật khẩu")]
        public string passwords { set; get; }

        public bool RememberMe { set; get; }

    }
}