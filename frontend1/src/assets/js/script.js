$(document).ready(function () {
	$(window).on("load", function () {
		if (typeof (jsp) !== 'undefined')
			$('.LeftMenuScroll').jScrollPane().data().jsp.destroy();

	})
	$('select').each(function () {
		var select_class = $(this).attr('class');
		$(this).selectmenu({
			classes: {
				"ui-selectmenu-button": select_class
			}
		});//.selectmenu('menuWidget').addClass('overflow');
	});

	


	//hamburger menu icon on click
	$('body').on('click', '.hamburgerIcon', function () {
		// $('.infy_leftMenuJs').find('ul').slideUp();
		if ($(this).hasClass('menuOpen')) {
			$(".infy-mainleftMenu").removeClass('lftmenuBarOpened');
			$(".infy-mainleftMenu").addClass('lftmenuBarClosed');
			//$(this).find('.topClose').hide();
			//$(this).find('.fa-bars').show();
			$(".infy-mainleftMenu").animate({ 'width': '110px' });
			$(".infy-mainRightCnt").animate({
				'margin-left': '110px'
			});
			$('#headerBar').css({
				"width": "100%",
				'transition': 'width 0.4s ease'
			});
			$('.infy_leftMenu li>a>span>i,.profCnt').css({
				'display': 'none'
			});
			$(this).removeClass('menuOpen');
		}
		else {

			//$(this).find('.fa-bars').hide();
			//$(this).find('.topClose').show();
			$(".infy-mainRightCnt").animate({
				'margin-left': '190px'
			});
			$(".infy-mainleftMenu").animate({ 'width': '190px' }, function () {
				$(".infy-mainleftMenu").addClass('lftmenuBarOpened');
				$(".infy-mainleftMenu").removeClass('lftmenuBarClosed');
			});
			$(".infy-mainRightCnt").animate({
				'margin-left': '190px'
			});
			$('#headerBar').css({
				"width":  "100%",
				'transition': 'width 0.4s ease'
			});
			// $('.infy_Level2menu.active').find('ul').slideDown();
			$(this).addClass('menuOpen');
		}
	});

	//closed menu on mouse over
	$('body').on('mouseover', '.lftmenuBarClosed .infy_Level2menu', function () {
		$('.infy_Level2ul,.infy_Level2ul a>span>i,a>span>i').hide();
		$(this).find('.infy_Level2ul,.infy_Level2ul a>span>i,a>span>i').show();
		$(this).addClass('infy_menuHover');
	});

	$('body').on('mouseleave', '.lftmenuBarClosed .infy_Level2menu', function () {
		$(this).find('.infy_Level2ul,.infy_Level2ul a>span>i,a>span>i').hide();
		$(this).removeClass('infy_menuHover');

	});

	//$('.infy_leftMenuJs ul').hide();
	//left menu scroll
	$('.LeftMenuScroll').jScrollPane({
		autoReinitialise: true,
		mouseWheelSpeed: 40,
		contentWidth: '0px',
		verticalDragMinHeight: 30,
		verticalDragMaxHeight: 100,
	});
	//left menu on click of menu items
	$('body').on('click', '.infy_leftMenuJs li a', function () {
		if ($(this).closest('li').hasClass('infy_Level2menu') && !$(this).closest('.infy_Level2menu').hasClass('active') && !$(this).closest('.infy-mainleftMenu').hasClass('lftmenuBarClosed')) {//alert(0)
			$(this).closest('.infy_leftMenuJs').find('li').removeClass('active');
			$(this).closest('li').addClass('active');
			$(this).closest('.infy_leftMenuJs').find('ul').slideUp();
			$(this).closest('.infy_Level2menu').find('ul').slideDown();
			$(this).closest('.infy_leftMenuJs').find('li').removeClass('menuOpen');
		}
		else {
			if ($(this).closest('.infy_Level2menu').find('ul').length) {
				if ($(this).closest('li').hasClass('active')) {//alert(1)
					//$(this).closest('.infy_Level2menu.active').find('ul').slideDown();				    
					//$(this).closest('.infy_Level2menu').addClass('menuOpen');
				}
				else {//alert(2) // click of second level menu
					if ($(this).closest('.infy-mainleftMenu').hasClass('lftmenuBarClosed')) {//alert(21) // menu click on closed state
						$(this).closest('.infy_leftMenuJs').find('li').removeClass('active');
						$(this).closest('li').addClass('active');
						$(this).closest('.infy_Level2menu').addClass('active');
						$(this).closest('.infy_leftMenuJs').find('li').removeClass('menuOpen');
					}
					//if($(this).closest('.infy-mainleftMenu').hasClass('lftmenuBarClosed')){
					//	$(this).closest('.lftmenuBarClosed ').find('.infy_Level2menu li').removeClass('active');
					//}
					$('.infy_Level2menu').removeClass('menuOpen');
					$(this).closest('.infy_Level2menu').addClass('menuOpen');
					$(this).closest('.infy_Level2menu').find('li').removeClass('active');
					$(this).closest('li').addClass('active');
				}
			}
			else {//alert(3) // for single menu
				$(this).closest('.infy_leftMenuJs').find('li').removeClass('active');
				$(this).closest('.infy_leftMenuJs').find('li').removeClass('menuOpen');
				$(this).closest('li').addClass('active');
				$(this).closest('.infy_leftMenuJs').find('ul').slideUp();
			}
		}
	});

	/*$('.mainTab_ul li').click(function(){
		$('.mainTab_ul li').removeClass('active');
		$('.mainTab_ul li').removeClass('next');
		$(this).addClass('active');
		var index = $(this).index();
		var next = index + 1;
		$('.mainTab_ul li:eq('+next+')').addClass('next');
		$('.maincontent').hide();
		$('.maincontent_'+ index).show();
	});*/

	$('.customTab li').click(function () {
		$('.customTab li').removeClass('next');
		var index = $(this).index();
		var next = index + 1;
		$('.customTab li:eq(' + next + ')').addClass('next');
	});

	$('.filter').click(function () {
		$(this).addClass('active');
		$('.filter_cont').show();
	});

	$('.filter_close, .btn_apply').click(function () {
		$('.filter_cont').hide();
		$('.filter').removeClass('active');
	});

	$('.custom-file-input input[type="file"]').change(function (e) {
		$(this).siblings('input[type="text"]').val(e.target.files[0].name);
	});

	$('input:radio').screwDefaultButtons({
		image: 'url("images/radio.png")',
		width: 20,
		height: 20
	});

	$('input:checkbox').screwDefaultButtons({
		image: 'url("images/checkbox.png")',
		width: 16,
		height: 16
	});

	$('input:radio[name="partial_workflow"]').change(function () {
		if ($(this).val() === 'yes') {
			$('.dependent_workflow').show();
		} else {
			$('.dependent_workflow').hide();
		}
	});

	$('#btn_createWorkflow, #btn_executeWorkflow, #btn_createSchedule, #btn_upload, #btn_uploadTemplate').click(function () {
		$('.status_success').slideDown();
		$('.recentWorkflow_cont').show();
	});

	$('.status_close').click(function () {
		$('.status_success').slideUp();
	});

	$('input:radio[name="recurrence"]').change(function () {
		if ($(this).val() === 'yes') {
			$('.recurrence_cont').show();
		} else {
			$('.recurrence_cont').hide();
		}
	});

	$('input:radio[name="recurrence_pattern"]').change(function () {
		if ($(this).val() === 'weekly') {
			$('.weekly_cont').show();
		} else {
			$('.weekly_cont').hide();
		}
	});

	$('input:checkbox[name="recur_on"]').change(function () {
		if ($(this).prop('checked')) {
			$(this).parent().parent('li').addClass('active');
		} else {
			$(this).parent().parent('li').removeClass('active');
		}
	});

	$('input:radio[name="add_script"]').change(function () {
		if ($(this).val() === 'new') {
			$('.script_existingCont').hide();
			$('.script_newCont, .content_footer').show();
		} else {
			$('.script_newCont, .content_footer').hide();
			$('.script_existingCont').show();
		}
	});

	$('#btn_addTemplate').click(function () {
		$('.templateData_cont').show();
	});

	$('input:radio[name="add_template"]').change(function () {
		if ($(this).val() === 'new') {
			$('.templateExisting_cont').hide();
			$('.templateNew_cont').show();
		} else {
			$('.templateNew_cont').hide();
			$('.templateExisting_cont').show();
		}
	});

	$('.hamburgerIcon_mobile').on('click', function () {
		$('.slidingHamMenu').slideToggle(700);
		$('body').toggleClass('no_scroll');
	});

	$('.slidingHamMenu ul li.infy_Level2menu a').click(function () {
		$('.slidingHamMenu ul li').removeClass('active');
		$(this).closest('li').addClass('active');
		$('.slidingHamMenu .infy_Level2menu').removeClass('menuOpen');
		$(this).closest('.infy_Level2menu').addClass('menuOpen');
		$('.slidingHamMenu').find('ul.infy_Level2ul').hide();
		$(this).siblings('ul.infy_Level2ul').slideDown();
	});
});
