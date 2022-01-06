// JavaScript Document
	$(document).ready(function(){
		 $('.bxslider-banner').bxSlider({
			mode: 'fade',
			pager: true,
			auto: true,
			pause:3000
			});	
			$('.box-banner-prev').click(function(){
				$('.box-banner .bx-prev').click();
			})
			$('.box-banner-next').click(function(){
				$('.box-banner .bx-next').click();
			})
			
			$('.lnk_show').live('click', function(){
				if($(this).hasClass('menu_show')){
					$(this).removeClass('menu_show');
					$(this).parent().find('.ul_show').slideUp(150);
				}else{
					$(this).addClass('menu_show');
					$(this).parent().find('.ul_show').slideDown(150);
					}
			})
			
			$('.more-vtrack').click(function(){
				if($(this).hasClass('vtrack-show')){
					$(this).removeClass('vtrack-show');
					$(this).parent().parent().find('.content_show').removeClass('show_full');
					$(this).parent().parent().css("padding-bottom", "20px");
				}else{
					$(this).addClass('vtrack-show');
					$(this).parent().parent().find('.content_show').addClass('show_full');
					}
			})
			//popup
			$('.lnk-collect-agent').live('click',function(){
				$('#wrap_popup').show();
			})
			$('.close-popup').live('click', function(){
				$('#wrap_popup').hide();
			})

			
			


	})			