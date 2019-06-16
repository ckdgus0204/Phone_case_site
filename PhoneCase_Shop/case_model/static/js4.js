var deviceMobile = null;
var ie_check = null;
var slideEventCheck = false;

function currentChange(){
    if($("#mSub > div").hasClass("main_visual") == true){
        if(($(".slick-current").css("background-color") == "rgb(255, 255, 255)") || ($(".slick-current").css("background-color") == "rgb(247, 247, 247)")){
            $("#shopHead").addClass("head_type2");
        }else if($(".slick-current").css("background-color") != "rgb(255, 255, 255)"){
            if($("#shopHead").hasClass("head_type2")){
                $("#shopHead").removeClass("head_type2");
            }
        }
    }
    if($(".slick-dots li").hasClass("slick-active") == true){
        $(".slick-active").find(".num_page").prepend($('<span class="screen_out" />').text("현재 페이지"));
        $(".slick-active").siblings("li").find(".num_page").children(".screen_out").remove();
    }
}
function homeIcon(){
    var userAgent = navigator.userAgent.toLowerCase(); // 접속 핸드폰 정보
    // 모바일 홈페이지 바로가기 링크 생성
    if(userAgent.match('iphone')) {
        $('head').append('<link rel="apple-touch-icon" href="https://t1.daumcdn.net/friends/www/resources/images/m640/ico_homeround_170816.png">')
    } else if(userAgent.match('ipad')) {
        $('head').append('<link rel="apple-touch-icon" sizes="72*72" href="https://t1.daumcdn.net/friends/www/resources/images/m640/ico_homeround_170816.png">')
    } else if(userAgent.match('ipod')) {
        $('head').append('<link rel="apple-touch-icon" href="https://t1.daumcdn.net/friends/www/resources/images/m640/ico_homeround_170816.png">')
    } else if(userAgent.match('android')) {
        $('head').append('<link rel="shortcut icon" href="https://t1.daumcdn.net/friends/www/resources/images/m640/ico_homebasic_170816.png">')
    }
}

$(function() {
    //주문페이지 약관 동의 버튼 클릭 이벤트
    $(".chkAgree").click(function() {
        var cnt = $('input:checkbox.chkAgree:checked').length;

        if(cnt == 2) {
            $("#allAgree").prop("checked", true);
        } else {
            $("#allAgree").prop("checked", false);
        }
    });
});

function stHead(){
    var st = $(window).scrollTop();
    if(st > 20){
        $("body").addClass("scroll_on");
    }else{
        $("body").removeClass("scroll_on");
    };
}

var fr = (function(){
    function startModule(){
        deviceCheck();
        ieCheck();
        gnbMenu();
        gnbScroll();
        search();
        mSearch();
        mMenu();
        pageLang();
        category();
        pageTop();
        boardList();
        orderList();
        basketList();
        buyPr();
        slick();
        //slide();
        //slideBanner();
        deliveryChange();
        moreOrder();
        numCheck();
        textCount();
        checkCoupon();
        //writeFile();
        validateCheck();
        snsLink();
        logout();
        checkout();
        eventProduct();

        bnrGlobal(); // 2017-03-07 추가
        tabMenu();
        globalView();

        memberJoin(); // 2017-10-31 cㅜ가가
	    btnBuyerInfo();
	    btnBuyerCancel();

    }    //mobile,PC check
    deviceCheck = function() {
        var mobileInfo = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson','iPad');
        for (var info in mobileInfo){
            if (navigator.userAgent.match(mobileInfo[info]) != null){
                deviceMobile = "mobile";
                slideEventCheck = false;
                break;
            }else{
                deviceMobile = null;
                slideEventCheck = true;
            }
        }
        return deviceMobile;
    }
    // Browser ie8 check
    ieCheck = function(){
        if((document.all && !document.querySelector) || (document.all && document.querySelector && !document.addEventListener) ) {
            ie_check = "ie8"
        }else{
            ie_check = null
        }
        $("body").addClass(ie_check);
        return ie_check;
    }

    gnbMenu = function(){
        // pc gnb
        var target = $("#shopGnb .gnb_newfriends");
        var targetHeight = new Array();
        var targetHeightResult;

        function gnb_height(){
            target.find(".on .link_gnb").each(function(idx){
                targetHeight[idx] = $(this).siblings(".lnb_friends").outerHeight();
            });
            targetHeightResult = Math.max.apply(null,targetHeight)+70;
        }
        target.find(".lnb_friends").css({opacity:0});
        $(".gnb_newfriends .link_gnb").on("mouseenter focus",function(){
            $("#shopHead").addClass("head_on");
            $(this).parents("li").addClass("on");
            $(this).parents("li").siblings("li").removeClass("on");
            $(this).parents("li").siblings("li").find(".lnb_friends").css({
                display:"none",
                opacity:0
            });
            gnb_height();
            target.find(".on .lnb_friends").stop().animate({
                opacity:1
            },{duration: 300,easing:'swing'});
            $(".inner_head").stop().animate({
                height:targetHeightResult
            },{duration: 300,easing:'swing'});
            target.find(".on .lnb_friends").css("display","block");
        });
        $("#shopGnb .gnb_newfriends").on("mouseleave",function(){
            target.find(".lnb_friends").css("display","none");
            target.find(".lnb_friends").stop().animate({
                opacity:0
            },{duration: 300,easing:'swing'});
            $(".inner_head").stop().animate({
                height:70
            },{
                duration: 300,easing:'swing',
                complete:function(){
                    $("#shopHead").removeClass("head_on");
                }
            });
            $(".gnb_newfriends li").removeClass("on");
        });

	    $(".lnb_cate .sub_cate").on("mouseenter focus", function() {
		    $(this).siblings().removeClass('on').find('*.on').removeClass('on');
		    $(this).addClass("on");
		    // $(".link_banner").hide();
		    // $(this).next(".link_banner").show();
	    });

        $(".lnb_cate .list_sub .link_sub").on("mouseenter focus", function() {
            $(".link_banner").hide();
            $(this).next('.link_banner').show();
        });

	    $(".lnb_cate").on("mouseleave", function() {
		    $(this).find('.on').removeClass("on");
		    $(this).next(".link_banner").hide();
	    });

        $(".lnb_cate .layer_sub").on("mouseleave", function() {
            $(this).find(".link_banner").hide();
        });

	    //상단메뉴 마이메뉴
        $(".wrap_util .link_mypage").on("mouseover",function(){
            $(".wrap_util").addClass("mypage_on");
        });
        $(".wrap_util .link_mypage").on("mouseout",function(){
            $(".wrap_util").removeClass("mypage_on");
        });
        $("#layerMyPage").on("mouseover",function(){
            $(".wrap_util").addClass("mypage_on");
        });
        $("#layerMyPage").on("mouseout",function(){
            $(".wrap_util").removeClass("mypage_on");
        });
    }
    gnbScroll = function(){
        //상단메뉴 스크롤시
        $(window).scroll(function(){
            stHead();
        });
    }
    search = function() {
	    $(".box_search .inp_search").on("click keyup paste change focus",function(){
		    $(".box_search .lab_search").addClass("lab_hide");
		    $(this).on("blur",function(){
			    if($(this).val() === ""){$(".box_search .lab_search").removeClass("lab_hide");}
		    });
	    });

	    $(".btn_search").on("click",function() {
		    if ($(window).width() > 768) {
			    $(".wrap_util").addClass("result_on");
			    //검색창 포커스
                $("#prdSearch").focus();
            } else {
                $("body").addClass("search_on");
                // $("html").addClass("lock_on");
                // $(".dimmed_layer").css("display", "block");
                //검색창 포커스
                $("#keyword").focus();
                if ($(".inner_head .dimmed_layer").length == 0) {
                    $(".wrap_util").after('<div class="dimmed_layer"></div>')
                }else{
                    $(".inner_head .dimmed_layer").show()
                }
            }
	    });
    }
	mSearch = function() {
		if($(window).width() <= 768) {
			$(".box_search .btn_del").on("click",function(){
				$(".inp_search").val("");
			});

			$(".btn_search2").on("click",function(){
				$("body").addClass("search_on");
				$("html").addClass("lock_on");
				$(".wrap_util").addClass("result_on");
				$(".dimmed_layer").css("display","block");
			});

			$(".box_search .btn_cancel").on("click",function(){
				$("body").removeClass("search_on");
				$(".box_search").removeClass("result_on");
				$(".layer_search").removeClass("result_on");

				$(".inp_search").val("");
				$("html").removeClass("lock_on");
				$(".dimmed_layer").css("display","none");
			});

			$(".dimmed_layer").on("click",function(){
				if($("body").hasClass("search_on")) {
					$("body").removeClass("search_on");
					$(".box_search").removeClass("result_on");
					$(".layer_search").removeClass("result_on");
					$(".inp_search").val("");
					$("html").removeClass("lock_on");
					$(".dimmed_layer").css("display","none");
				}
			});
		}

		// $(".box_search .btn_cancel").on("click",function(){
		//     $("body").removeClass("search_on");
		//     $(".box_search").removeClass("result_on");
		//     $(".inp_search").val("");
		//     $("html").removeClass("lock_on");
		//     $(".dimmed_layer").css("display","none");
		// });
		// $(".dimmed_layer").on("click",function(){
		//     if($("body").hasClass("search_on")) {
		//         $("body").removeClass("search_on");
		//         $(".box_search").removeClass("result_on");
		//         $(".inp_search").val("");
		//         $("html").removeClass("lock_on");
		//         $(".dimmed_layer").css("display","none");
		//     }
		// });
	}
    mMenu = function() {
        //모바일 메뉴 열기, 닫기
        $(".link_navi").on("click",function(){
            $(".side_menu").css("display","block").animate({"left":"0"},300);
            $(".side_menu").addClass("navi_on");
            // $(".dimmed_layer").css("display","block");
            $("#shopHead").css("z-index",100);
            $("#mFeature").css("z-index",110);
            $("html").addClass("lock_on");
            return false;
        });
        $(".side_menu .btn_close").on("click",function(){
            $(".side_menu").animate({"left":"-100%"},300);
            $(".side_menu").removeClass("navi_on");
            $(".side_menu").css("display","none");
            // $(".dimmed_layer").css("display","none");
            $("#shopHead").css("z-index",120);
            $("#mFeature").css("z-index",-1);
            $("html").removeClass("lock_on");
        });
        // $(".dimmed_layer").on("click",function(){
        //     if($(".side_menu").hasClass("navi_on")) {
        //         $(".side_menu").animate({"left":"-100%"},300);
        //         $(".side_menu").removeClass("navi_on");
        //         $(".side_menu").css("display","none");
        //         $(".dimmed_layer").css("display", "none");
        //         $("#shopHead").css("z-index",120);
        //         $("html").removeClass("lock_on");
        //     }
        // });

        //모바일 메뉴 프로필메뉴
        // $(".link_profile").on("click",function(){
        //     $(".side_menu .list_mypage").toggle();
        //     return false;
        // });
        // 모바일 메뉴 마이페이지
        $(".item_snb .link_menu").on("click",function(){
            $(this).parents(".item_snb").toggleClass("item_on");
            $(this).next(".cate_sub").slideToggle();
            return false;
        });
    }
    pageLang = function() {
        // 언어셀렉트박스
        $(".opt_lang .link_selected").on("click",function(e){
            e.preventDefault();
            $(".opt_lang").addClass("opt_open");
        });
        $(".opt_lang .link_lang").on("click",function(e){
            e.preventDefault();
            var targetUrl = $(this).attr("href");
            $(".opt_lang").removeClass("opt_open");
            $(".opt_lang .list_lang li").removeClass("on");
            $(this).parent().addClass("on");
            $(".opt_lang .link_selected .txt_lang").text($(this).text())
            setTimeout(function(){
                $(location).attr('href',targetUrl);
            },500)
            $(".opt_lang").removeClass("opt_open");
        });
        $("body").on("click",function(e){
            if($(".opt_lang").hasClass("opt_open")) {
                if(!$(".opt_lang").has(e.target).length) {
                    $(".opt_lang").removeClass("opt_open");
                }
            }
        });
    }

    category = function() {

        //정렬 셀렉트박스
        $(".opt_sort .link_selected").on("click",function(e){
            e.preventDefault();
            $(".opt_sort").removeClass("sort_open");
            $(this).parent(".opt_sort").toggleClass("sort_open");
            $(this).parent().siblings(".opt_cate").removeClass("cate_open");
        });
        $(".opt_sort .link_sort").on("click",function(e){
            e.preventDefault();
            var targetUrl = $(this).attr("href");
            $(this).parents(".opt_sort").removeClass("sort_open");
            $(this).parents(".opt_sort").find(".txt_sort").text($(this).text());
            setTimeout(function(){
                $(location).attr('href',targetUrl);
            },500)
            $(this).parents(".opt_sort").removeClass("sort_open");

            $(".inp_value").val($(this).data().bdcseq);

        });
        // 2017-03-07 추가 시작
        $(".opt_nation .link_selected").on("click",function(e){
            e.preventDefault();
            $(".opt_nation").toggleClass("nation_open");
            $("html").toggleClass("lock_on");
            if($(window).height() <= 328) { // 가로모드 대응 추가
                $(".opt_nation .box_scroll").css("max-height","123px");
            };
        });
        $(".opt_nation .link_nation").on("click",function(e){
            e.preventDefault();
            var targetUrl = $(this).attr("href");
            $(this).parents(".opt_nation").removeClass("nation_open");
            $(this).parents(".opt_nation").find(".txt_nation").text($(this).text());
            setTimeout(function(){
                $(location).attr('href',targetUrl);
            },500)
            $(this).parents(".opt_nation").removeClass("nation_open");
            $("html").removeClass("lock_on");
        });
        $(".opt_nation .btn_close").on("click",function(){
            $(".opt_nation").removeClass("nation_open");
            $("html").removeClass("lock_on");
        })
        // 2017-03-07 추가 끝
        // 2017-06-14 추가 시작
        $(".opt_nation .dimmed_g").on("click",function(){
            $(".opt_nation").removeClass("nation_open");
            $("html").removeClass("lock_on");
        })
        // 2017-06-14 추가 끝
        $("body").on("click",function(e){
            if($(".opt_sort").hasClass("sort_open")) {
                if(!$(".opt_sort").has(e.target).length) {
                    $(".opt_sort").removeClass("sort_open");
                }
            }
            // 2017-03-07 추가 시작
            if($(".opt_nation").hasClass("nation_open")) {
                if(!$(".opt_nation").has(e.target).length) {
                    $(".opt_nation").removeClass("nation_open");
                }
            }
            // 2017-03-07 추가 끝
        });
    }
    boardList = function(){
        // FAQ
        $(".list_board .link_board").on("click",function(){
            var txt = $(this).children(".ico_arr").text();
            var faq = $(this).parent().siblings().children(".subject_board:visible");
            $(this).parent().toggleClass("on");
            $(this).next(".subject_board").slideToggle(300);
            $(this).parent().siblings().children(".subject_board").slideUp(300);
            $(this).parent().siblings().removeClass("on");
            if($("body").hasClass("en")){
                $(this).children(".ico_arr").text(txt == "open" ? "close" : "open");
                faq.prev().children(".ico_arr").text("open");
            }else{
                $(this).children(".ico_arr").text(txt == "내용 펼치기" ? "내용 접기" : "내용 펼치기");
                faq.prev().children(".ico_arr").text("내용 펼치기");
            }
            return false;
        });
    }
    pageTop = function() {
        // 맨위로 이동
        $('.btn_top').click(function(){
            $('html, body').animate({scrollTop:0}, 200);
            return false;
        });
    }
    orderList = function() {
        //주문하기 입력시
        $(".box_input .tf_g").on("click focus",function(){
            $(".box_input").removeClass("write_on");
            $(this).parent().addClass("write_on");
            $(this).on("blur",function(){
                $(this).parent().removeClass("write_on");
                $(this).val($(this).val().replace(/(^\s*)|(\s*$)/g, "").replace(/ +/g, " "));
            });
        });
    }
    basketList = function() {
        //장바구니 상품삭제
        $(".info_basket .link_delete").on("click",function(){
            $(this).parent().remove();
        });
        function sum(){
            var total = 0;
            $(".check_on").each(function(i){
                total += eval(($(".check_on").eq(i).find(".inp_price").val()) * ($(".check_on").eq(i).find(".inp_quantity").val()));
            });
            Number.prototype.format = function(){ // 숫자 천단위로 콤마, 숫자타입
                if(this==0) return 0;
                var reg = /(^[+-]?\d+)(\d{3})/;
                var n = (this + '');
                while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
                return n;
            };

            // 컨트롤러에서 처리해주는 로직이 존재해서 주석처리함
            // if(total > 30000){
            //     $("#shipFee").text("0");
            //     $("#totalFee").text(total.format());
            // }else if(total == 0){
            //     $("#shipFee").text("0");
            //     $("#totalFee").text(total.format());
            // }else{
            //     $("#shipFee").text("2,500");
            //     $("#totalFee").text((total + 2500).format());
            // };
        }
        $(".choice_basket .inp_g").on("click",function(){
            $(".choice_all .inp_g").prop("checked",false);
            if($(this).parents("li").hasClass("check_on")){
                $(this).parents("li").removeClass("check_on");
            }else{
                $(this).parents("li").addClass("check_on");
            }
            sum();
        });
        // 장바구니 상품 전체선택
        $(".choice_all .inp_g").on("click",function(){
            if($(".choice_all .inp_g").is(":checked")){
                $(".choice_basket .inp_g").not(":disabled").prop("checked",true);
                $(".choice_basket .inp_g").not(":disabled").parents("li").addClass("check_on");
            }else{
                $(".choice_basket .inp_g").prop("checked",false);
                $(".list_basket li").removeClass("check_on");
            }
            sum();
        });
        sum();
    }
    buyPr = function() {
        $(".box_purchase .btn_open").on("click",function(){
            $(".box_purchase").addClass("purchase_open");
        });
        $(".box_purchase .btn_close").on("click",function(){
            $(".box_purchase").removeClass("purchase_open");
        });
        $(".opt_buy .link_selected").on("click",function(e){
            e.preventDefault();
            $(".opt_buy").addClass("buy_open");
        });
    }
    slide = function() {
        $('.wrap_product').slick({
            arrows: true,
            infinite: true,
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 300,
            autoplay: false,
            centerMode: false,
            variableWidth: true
        });

    }
    slick = function() {
        var slick_arrow = true;
        var slick_fade = true;
        if($('.box_visual').hasClass('detail_visual')){
            slick_arrow = true;
            slick_fade = false;
        }else{
            slick_arrow = false;
            slick_fade = true;
        }
        $(".box_visual").slick({
            dots: true,
            arrows: slick_arrow,
            infinite: true,
            autoplaySpeed: 5000,
            speed: 500,
            fade: slick_fade,
            centerMode:false,
            centerPadding:0,
            cssEase: 'linear',
            customPaging: function(slider, i) {
                return $('<button type="button" data-role="none" role="button" tabindex="0" />').append($('<span />').text(i + 1 + "번째 콘텐츠"));
            }
        });
        $('.box_visual').on('afterChange', function(){
            currentChange();
        });
        $(".slick-dots").addClass("paging_visual");
        $(".slick-dots button").addClass("btn_page");
        $(".slick-dots button span").addClass("ico_friends");
        $(".slick-dots button span").addClass("num_page");
        $('.box_visual .item_visual').on("mouseenter focus",function(){
            $(".box_visual").slick("slickPause");
        });
        $('.box_visual .item_visual').on("mouseleave blur",function(){
            $(".box_visual").slick("slickPlay");
        });
        if($("#kakaoContent").hasClass("cont_etc")){
            $(".slick-dots button").attr("tabindex","-1");
            $(".slick-current").attr("tabindex","-1");
        }
    }
    slideBanner = function() {
        $(".slide_bnr").slick({
            dots: false,
            arrows: false,
            infinite: true,
            autoplaySpeed: 5000,
            speed: 500,
            fade: false,
            centerMode:false,
            centerPadding:0,
            cssEase: 'linear',
            customPaging: function(slider, i) {
                return $('<button type="button" data-role="none" role="button" tabindex="0" />').append($('<span />').text(i + 1 + "번째 콘텐츠"));
            }
        });
    }
    deliveryChange = function() {
        $("#deliveryChange").on("click",function(){
            $(this).parent(".delivery_area").addClass("delivery_modify");
            return false;
        });
    }

    moreOrder = function() {
        $(".info_product2 .link_more").on("click",function(){
            if($(".info_product2 li").hasClass("list_hidden")){
                $(".info_product2 li").removeClass("list_hidden");
            }

            if($(".info_product2 .list_focus").next(".list_item").hasClass("list_hidden")){
                $(".info_product2 .list_focus").next(".list_item").removeClass("list_hidden");
                $(".info_product2 .list_focus").next(".list_item").addClass("list_focus");
            }

            if(!$(".info_product2 .list_focus").next(".list_item").hasClass("list_hidden")){
                $(".info_product2 .link_more").remove();
            }
        });
    }
    numCheck = function() {
        if ($('.IS_VUE').length) {
            return;
        }

        $(".box_quantity .btn_g").on("click",function(){
            $(this).parents("li").addClass("change_on");
            $(this).parents(".basket_option").find("[data-btn-change]").prop("disabled", false);
        });

        $(".box_quantity .inp_quantity").on("change paste keyup",function(){
            var value = $(this).val();
            $(this).val($(this).val().replace(/[^0-9]/g,""));
            if($(this).val().length > 3) {
                $(this).val($(this).val().substring(0, 3));
            }
            $(this).parents("li").addClass("change_on");
            $(this).parents(".basket_option").find("[data-btn-change]").prop("disabled", false);
            if(value == 0){
                $(this).val("");
            }
            //기프트백 개수 제어 수정 (장바구 products.jsp)
            if($(this).parents("li").find(".txt_giftbag").length){
                var prCnt = $('input[name=basketProductEa]').val();
                var gbCnt = 0;

                for (var i = 0; i < $('.box_quantity .giftbag_bsEa').length; i++) {
                    gbCnt = gbCnt + parseInt($('.box_quantity .giftbag_bsEa').eq(i).val().toString(), 10);
                }

                if(gbCnt >= prCnt){
                    $(this).val(value);
                }
            }

            //기프트백 개수 제어 수정 (주문 sheet.jsp)
            if($(this).parents("li").find("input[name=prType]").val() == '8') {
                var prCnt = 0; //기프트백 제외 상품개수
                var gbCnt = 0; //기프트백개수

                for (var i = 0; i < $(".list_cart li").length; i++) {
                    if($(".list_cart li input[name=prType]").eq(i).val() == '8') {
                        gbCnt = gbCnt + parseInt($(".list_cart li input[name=bsEa]").eq(i).val());
                    } else {
                        prCnt = prCnt + parseInt($(".list_cart li input[name=bsEa]").eq(i).val());
                    }
                }

                if(gbCnt >= prCnt){
                    $(this).val(value);
                }
            }
        });

        $(".box_quantity .btn_minus").on("click",function(){
            var value = $(this).siblings(".inp_quantity").val();
            value--;
            $(this).siblings(".inp_quantity").val(value);
            $(this).siblings(".btn_plus").prop("disabled",false);
            if(value < 1){
                $(this).siblings(".inp_quantity").val(1);
                $(this).prop("disabled",true);
            }
        });

        $(".box_quantity .btn_plus").on("click",function(){
            var value = $(this).siblings(".inp_quantity").val();
            value++;
            $(this).siblings(".inp_quantity").val(value);
            $(this).siblings(".btn_minus").prop("disabled",false);
            if(value >= 999){
                $(this).siblings(".inp_quantity").val(999);
                $(this).prop("disabled",true);
            }
            //장바구니 products.jsp
            if($(this).parents("li").find(".txt_giftbag").length){
                var prCnt =  $('input[name=basketProductEa]').val();
                var gbCnt = 0;

                for (var i = 0; i < $('.box_quantity .giftbag_bsEa').length; i++) {
                    gbCnt = gbCnt + parseInt($('.box_quantity .giftbag_bsEa').eq(i).val().toString(), 10);
                }

                if(gbCnt > prCnt){
                    value--;
                    $(this).siblings(".inp_quantity").val(value);
                    $(this).prop("disabled",true);
                } else if(gbCnt == prCnt){
                    $(this).siblings(".inp_quantity").val(value);
                    $(this).prop("disabled",true);
                }
            }
            //주문화면 sheet.jsp
            if($(this).parents("li").find("input[name=prType]").val() == '8') {
                var prCnt = 0; //기프트백 제외 상품개수
                var gbCnt = 0; //기프트백개수

                for (var i = 0; i < $(".list_cart li").length; i++) {
                    if($(".list_cart li input[name=prType]").eq(i).val() == '8') {
                        gbCnt = gbCnt + parseInt($(".list_cart li input[name=bsEa]").eq(i).val().toString(), 10);
                    } else {
                        prCnt = prCnt + parseInt($(".list_cart li input[name=bsEa]").eq(i).val().toString(), 10);
                    }
                }

                if(gbCnt > prCnt){
                    value--;
                    $(this).siblings(".inp_quantity").val(value);
                    $(this).prop("disabled",true);
                } else if(gbCnt == prCnt){
                    $(this).siblings(".inp_quantity").val(value);
                    $(this).prop("disabled",true);
                }
            }
        });

        $(".change_on .btn_change").on("click",function(){
            $(this).parent("li").removeClass("change_on");
        });
    }
    layerCenter = function() {
        var maskHeight = $(document).height();
        $('.dimmed_layer').css('height', maskHeight);
        var ua = window.navigator.userAgent;
        if(ua.indexOf('Chrome') != -1){
            dTop = document.body.scrollTop;
        }else if(($('html').hasClass('iphone')) || ($('html').hasClass('ipad'))){
            dTop = document.body.scrollTop;
        }else{
            dTop = document.documentElement.scrollTop;
        }
        $(".dimmed_layer").show();
        $("html, body").scrollTop(dTop);
        var wHeight = $(window).height();
        var height = $(".friends_layer").height();
        var top = (wHeight - height) / 2 + dTop;
        $(".alert_layer").show().css("top", top + "px");
        $("#kakaoIndex, #shopWrap").attr("aria-hidden","true");
        $("#kakaoIndex a, #shopWrap a, #kakaoIndex button, #shopWrap button").attr("tabindex","-1");
        $(".alert_layer").attr("tabindex","0").focus();
        $(".alert_layer").removeAttr("tabindex");
    }

	btnBuyerInfo = function() {
		$("#btnBuyerInfo").click(function () {
			$("#buyerInfo").hide();
			$("#buyerModify").addClass("delivery_modify").show();
		});
	}

	btnBuyerCancel = function() {
		//발송인 정보 수정 취소
		$("#btnBuyerCancel").click(function() {
			$("#buyerInfo").show();
			$("#buyerModify").hide();
		});
	}

    function popupCenter() {
        var maskHeight = $(document).height();
        $('.dimmed_layer').css('height', maskHeight);
        var ua = window.navigator.userAgent;
        if(ua.indexOf('Chrome') != -1){
            dTop = document.body.scrollTop;
        }else if(($('html').hasClass('iphone')) || ($('html').hasClass('ipad'))){
            dTop = document.body.scrollTop;
        }else{
            dTop = document.documentElement.scrollTop;
        }
        $("html, body").scrollTop(dTop);
        var wHeight = $(window).height();
        var height = $(".int_layer").height();
        var top = (wHeight - height) / 2 + dTop;
        $(".friends_layer").css("top", top + "px");
        $("#kakaoIndex, #shopWrap").attr("aria-hidden","true");
        $("#kakaoIndex a, #shopWrap a, #kakaoIndex button, #shopWrap button").attr("tabindex","-1");
        $(".friends_layer").attr("tabindex","0").focus();
        $(".friends_layer").removeAttr("tabindex");
    }
    textCount = function() {
        $(".cont_order .list_memo .tf_g").on("change paste keyup",function(){ // 2017-03-07 수정
            var content = $(this).val();
            $(this).parents("dd").prev("dt").find('.txt_counter').html(content.length); // 2017-03-07 수정
            if(content.length > 50){
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").text('Delivery notes are limited to 50 characters or less.');
                }else{
                    $(".desc_layer").text('배송메모는 50자 이내로 작성해주세요.');
                }
                $(this).val($(this).val().substring(0, 50));
                $('.txt_counter').html("50");
            }
        });
        $(this).keyup(); // 2017-03-07 수정
    }
    checkCoupon = function() {
        $("#checkCoupon").on("click",function(){
            if($(this).is(":checked") == true){
                $(this).parents(".group_formpoint").addClass("coupon_on");
            }else{
                $(this).parents(".group_formpoint").removeClass("coupon_on");
            }
        });
    }
    function clear() {
        $("#fileName").text("");
        if($("html").hasClass("msie")){
            $("#fileUpload").replaceWith($("#fileUpload").clone(true));
        }else{
            $("#fileUpload").val("");
        }
    };
    function validateCheck() {
        // var re_id = /^[가-힣a-zA-Z\s]{2,10}$/; // 이름, 주문자명 검사식
        var re_id = /^[가-힣a-zA-Z\s]{2,30}$/; // 이름, 주문자명 검사식
        var re_Eid = /^[a-zA-Z\s]{2,30}$/; // 이름, 주문자명 검사식 영문 // 2017-03-07 추가
        var re_en = /[^a-zA-Z0-9(),-.?\s]+/; // 영어만 포함되어 있는지 검사 // 2017-07-03 수정
        var re_mail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/; // 이메일 검사식
        var re_tel = /^[0-9]{1,3}-[0-9]{6,15}$/; // 모든전화번호 검사식
        var re_tel_global = /^[0-9]{1,3}-[0-9]{6,15}$/; // 해외용전화번호 검사식
        var re_postal = /^[a-zA-Z0-9]{2,10}$/; // 우편번호 검사식
        var re_coupon = /^[a-zA-Z0-9]{4}$/; // 쿠폰 검사식
        var re_memo = /[;<>&]/; // 일부 특수문자 제외 검사식
        var re_country = /^[0-9]{1,3}$/; // 국가번호 3자리검사 // 2017-12-26 수정
        var re_address = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9(),-.?\s]+/;
        var target;
        var uid = $('#bdaOwnername'),
            mail = $('#bdaEmail'),
            tel = $('#bdaPhone'),
            title = $("#bdaTitle"),
            content = $("#bdaContent"),
            name = $('#oaName'),
	        oMail = $('#oaEmailTemp'),
	        oDomain = $('#tfDomain2'),
            oTel = $('#oaPhone'),
            oPhoneCountry = $('#oaPhoneCountry'), // 2017-05-11 추가
            buyerCountry = $('#buyerCountry'), // 2017-12-21 주문자 국가 추가
	        buyerName = $('#tfoaN'),
	        buyerEmail = $('#tfEmailIdTemp'),
	        buyerDomain = $('#tfDomain1'),
	        buyerTel = $('#buyerPhone'),
	        buyerPhoneCountry = $('#oaBuyerPhoneCountry'), // 주문자 추가
            postal = $("#orderPostal"),
            zipcode = $("#orderPostal"), // 2017-03-07 추가
            address = $("#orderAddress1"),
            addressEn = $("#orderAddress1"), // 2017-03-07 추가
            detail = $("#orderAddress2"),
            detailEn = $("#orderAddress2"), // 2017-03-07 추가
            detailEn2 = $("#orderAddress3"), // 2017-05-11 추가
            memo = $("#osDeliMemo"),
            memoEn = $("#osDeliMemo"), // 2017-03-07 추가
            coupon1 = $("#cpnNum1"),
            coupon2 = $("#cpnNum2"),
            coupon3 = $("#cpnNum3"),
            coupon4 = $("#cpnNum4");
        // 2017-03-07 추가 시작
        $(".cont_order .wrap_opt .link_sort").on("click",function(){
            if($(".cont_order .wrap_opt .txt_sort").text() == "한국"){
                $("#globalType").val("");
                $(this).parents("form").removeClass("form_global");
                $("#link_recent").show();
            }else{
                $("#globalType").val("1");
                $(this).parents("form").addClass("form_global");
                $("#link_recent").hide();
            }
        });
        // 2017-03-07 추가 끝
        $(".cont_write .list_agree .inp_g").on("click",function(){
            if($(this).is(":checked")){
                $(this).val("checkAgree");
            }else{
                $(this).val("");
            }
        });
        $(".cont_order .list_agree .inp_g").on("click",function(){
            if($(this).is(":checked")){
                $(this).val("checkAgree");
            }else{
                $(this).val("");
            }
        });
        if($("#kakaoContent").hasClass("cont_order") || $("#kakaoContent").hasClass("cont_mypage")){
            $(".friends_layer .btn_verify").on("click",function(){
                $("#kakaoIndex, #shopWrap").removeAttr("aria-hidden");
                $("#kakaoIndex a, #shopWrap a, #kakaoIndex button, #shopWrap button").removeAttr("tabindex");
                $(".dimmed_layer").hide();
                $(".alert_layer").hide();
                // target.focus();
            });
        }

        $("#fileUpload").on("change",function() { // 파일찾기, 경로명 숨기기, 파일 초기화
            var file = $(this).val().split("\\");
            var maxSize = 1024 * 1024 * 10;
            var fileSize = 0;
            var browser=navigator.appName;
            if (browser == "Microsoft Internet Explorer"){ // 파일 크기 (익스플로러)
                $.ajax({
                    headers: {'X-CSRF-TOKEN': '${_csrf.token}'},
                    type: 'GET',
                    url: '/kr/mypage/onetoone/filesize',
                    data: {
                        // size: encodeURIComponent($("#fileUpload")[0].value)
                        size: $("#fileUpload")[0].value
                    },
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    datatype: 'json',
                    async: false,
                    success: function (data) {
                        fileSize = data;
                    },
                    error: function (request, status, error) {
                        layerCenter();
                        if($("body").hasClass("en")){
                            $(".desc_layer").text('Your file was not uploaded.');
                        }else{
                            $(".desc_layer").text('파일 업로드에 실패 했습니다.');
                        }
                        target = $("#fileUpload");
                        clear();
                        return false;
                    }
                });
            }else {  // 파일 크기 (그외)
                fileSize = $("#fileUpload")[0].files[0].size;
            }

            var f_name = file[file.length-1];
            var s_nameArr = f_name.split('.');
            var f_ext = s_nameArr[s_nameArr.length - 1].toLowerCase();
            if($("#fileUpload").val() != ""){
                if($.inArray(f_ext, ['gif','png','jpg','jpeg']) == -1) {
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('The file must be in one of the following formats: .gif, .png, .jpg, or .jpeg.');
                    }else{
                        $(".desc_layer").text('gif,png,jpg,jpeg 파일만 업로드 할수 있습니다.');
                    }
                    //$('#fileUpload').focus();
                    target = $("#fileUpload");
                    clear();
                    return false;
                }else if(f_name.length < 2 || f_name.length > 50){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('The file name must be from 2 to 50 characters long.');
                    }else{
                        $(".desc_layer").text('파일명은 2-50자이어야만 합니다.');
                    }
                    //$("#fileUpload").focus();
                    target = $("#fileUpload");
                    clear();
                    return false;
                } else if(fileSize > maxSize){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('The attached file must be 10 MB or less.');
                    }else{
                        $(".desc_layer").text('첨부파일 사이즈는 10MB 이내로 등록 가능합니다.');
                    }
                    //$("#fileUpload").focus();
                    target = $("#fileUpload");
                    clear();
                    return false;
                };
                $("#fileName").text(f_name);
            };
        });
        $(".wrap_file .btn_del").on("click",function(){
            clear();
        });

        //주문완료 페이지 발송인 정보 수정
	    $("#btnBuyerSubmit").on("click",function(){
            if ($("input[name=oaBuyerCountryName]").val() != "한국" && $("input[name=oaBuyerCountryName]").val() != "Korea" && re_Eid.test($("#buyerName").val()) != true) { // 주문자 이름 검사 (해외)
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").html('To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English.');
                }else{
                    $(".desc_layer").html('주문을 위해서 주문자명이 입력되어야 합니다.'+'<br>'+'주문자명은 2-30자 사이 영문만 가능합니다.');
                }
                target = $("#buyerName");
                return false;
            }else if (($("input[name=oaBuyerCountryName]").val() == "한국" || $("input[name=oaBuyerCountryName]").val() == "Korea") && re_id.test($("#buyerName").val()) != true) { // 주문자 이름 검사 (국내)
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").html('To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English or Korean.');
                }else{
                    $(".desc_layer").html('주문을 위해서 주문자명이 입력되어야 합니다.'+'<br>'+'주문자명은 2-30자 사이 한글/영문만 가능합니다.');
                }
                target = $("#buyerName");
                return false;
		    }else if(re_mail.test($("#buyerEmail").val()) != true) { // 이메일 검사
			    //mail.focus();
			    layerCenter();
			    if($("body").hasClass("en")){
				    $(".desc_layer").html('To submit a question, you must enter your email address. Please enter a valid email address.');
			    }else{
				    $(".desc_layer").html('문의를 위해서 이메일 주소가 입력되어야 합니다.'+'<br>'+'올바른 이메일 주소를 입력해주세요.');
			    }
			    target = $("#buyerEmail");
			    return false;
		    }
	    });
        //주문완료 페이지 수령인 정보 수정, 주문상세페이지 수령인 정보 수정
        $("#btnOrderSubmit").on("click",function(){
            if($(this).parents("form").hasClass("form_global")) {
                if (re_Eid.test($("#orderName").val()) != true) { // 수령자 이름 검사
                    //$("#orderName").focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the name of the recipient. The recipient’s name must be from 2 to 30 characters, in English.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 수령자명이 입력되어야 합니다.'+'<br>'+'수령자명은 2-30자 사이 영문만 가능합니다.');
                    }
                    target = $("#orderName");
                    return false;
                }else if(re_tel_global.test($("#orderPhone").val()) != true) { // 수령자 연락처 검사
                    //$("#orderPhone").focus();
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values and hyphens [-], when appropriate.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자, - 가 포함된 올바른 연락처를 입력해주세요.');
                    }
                    target = $("#orderPhone");
                    return false;
                }else if(re_postal.test($("#orderPostal").val()) != true){
                    //$("#orderPostal").focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid postal code.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 ZIP 코드가 입력되어야 합니다.'+'<br>'+'올바른 ZIP 코드를 입력해주세요.');
                    }
                    target = $("#orderPostal");
                    return false;
                }else if($.trim($("#orderAddress1").val()) === "" || $("#orderAddress1").val().length < 2 || $("#orderAddress1").val().length > 100) { // 주소 검사
                    //$("#orderAddress1").focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid mailing address. The address must be from 2 to 100 characters long.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 주소가 입력되어야 합니다.'+'<br>'+'주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = $("#orderAddress1");
                    return false;
                }else if(re_en.test($("#orderAddress1").val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter only in English.');
                    }else{
                        $(".desc_layer").text('영문으로만 입력해주세요.');
                    }
                    target = $("#orderAddress1");
                    return false;
                }else if($.trim($("#orderAddress2").val()) === "" || $("#orderAddress2").val().length < 2 || $("#orderAddress2").val().length > 100) { // 상세주소 검사
                    //$("#orderAddress2").focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the full mailing address. The full address must be from 2 to 100 characters long.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 상세주소가 입력되어야 합니다.'+'<br>'+'상세주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = $("#orderAddress2");
                    return false;
                }else if(re_en.test($("#orderAddress2").val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter only in English.');
                    }else{
                        $(".desc_layer").text('영문으로만 입력해주세요.');
                    }
                    target = $("#orderAddress2");
                    return false;
                }else if($.trim($("#orderAddress3").val()) === "" || $("#orderAddress3").val().length < 2 || $("#orderAddress3").val().length > 100) { // 상세주소 검사
                    //$("#orderAddress2").focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the full mailing address. The full address must be from 2 to 100 characters long.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 상세주소가 입력되어야 합니다.'+'<br>'+'상세주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = $("#orderAddress3");
                    return false;
                }else if(re_en.test($("#orderAddress3").val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter only in English.');
                    }else{
                        $(".desc_layer").text('영문으로만 입력해주세요.');
                    }
                    target = $("#orderAddress3");
                    return false;
                }else if(re_memo.test($("#osDeliMemo").val()) == true){
                    //memo.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('The delivery notes must not contain the following special characters & < > ;');
                    }else{
                        $(".desc_layer").text('배송메모는 특수문자 & < > ;를 제외하고 작성해주세요.');
                    }
                    target = $("#osDeliMemo");
                    return false;
                }else if(re_en.test($("#osDeliMemo").val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter only in English.');
                    }else{
                        $(".desc_layer").text('영문으로만 입력해주세요.');
                    }
                    target = $("#osDeliMemo");
                    return false;
                }
            } else {
                if(re_mail.test($("#buyerEmail").val()) != true) { // 주문자 이메일 검사
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter your email address. Please enter a valid email address.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 이메일 주소가 입력되어야 합니다.' + '<br>' + '올바른 이메일 주소를 입력해주세요.');
                    }
                    target = $("#buyerEmail");
                    return false;
                }else if (re_id.test($("#orderName").val()) != true) { // 수령자 이름 검사
                    //$("#orderName").focus();
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter the name of the recipient. The recipient’s must be from 2 to 30 characters, in English or Korean.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 수령자명이 입력되어야 합니다.' + '<br>' + '수령자명은 2-30자 사이 한글/영문만 가능합니다.');
                    }
                    target = $("#orderName");
                    return false;
                } else if (re_tel.test($("#orderPhone").val()) != true) { // 수령자 연락처 검사
                    //$("#orderPhone").focus();
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values and hyphens [-], when appropriate.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자, - 가 포함된 올바른 연락처를 입력해주세요.');
                    }
                    target = $("#orderPhone");
                    return false;
                } else if (re_postal.test($("#orderPostal").val()) != true) {
                    //$("#orderPostal").focus();
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter a valid postal code.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 우편번호가 입력되어야 합니다.');
                    }
                    target = $("#orderPostal");
                    return false;
                } else if ($.trim($("#orderAddress1").val()) === "" || $("#orderAddress1").val().length < 2 || $("#orderAddress1").val().length > 100) { // 주소 검사
                    //$("#orderAddress1").focus();
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter a valid mailing address. The address must be from 2 to 100 characters long.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 주소가 입력되어야 합니다.' + '<br>' + '주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = $("#orderAddress1");
                    return false;
                    // }else if(re_address.test(address.val()) == true){
                    //     //address.focus();
                    //     layerCenter();
                    //     if($("body").hasClass("en")){
                    //         $(".desc_layer").text('The address must not contain the following special characters & < > ;');
                    //     }else{
                    //         $(".desc_layer").text('주소는 특수문자 & < > ;를 제외하고 작성해주세요.');
                    //     }
                    //     target = address;
                    //     return false;
                } else if ($.trim($("#orderAddress2").val()) === "" || $("#orderAddress2").val().length < 2 || $("#orderAddress2").val().length > 100) { // 상세주소 검사
                    //$("#orderAddress2").focus();
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter the full mailing address. The full address must be from 2 to 100 characters long.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 상세주소가 입력되어야 합니다.' + '<br>' + '상세주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = $("#orderAddress2");
                    return false;
                } else if (re_address.test(detail.val()) == true) {
                    //detail.focus();
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").text('The full address must not contain the following special characters & < > ;');
                    } else {
                        $(".desc_layer").text('상세주소는 특수문자 & < > ;를 제외하고 작성해주세요.');
                    }
                    target = detail;
                    return false;
                } else if (re_memo.test(memo.val()) == true) {
                    //memo.focus();
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").text('The delivery notes must not contain the following special characters & < > ;');
                    } else {
                        $(".desc_layer").text('배송메모는 특수문자 & < > ;를 제외하고 작성해주세요.');
                    }
                    target = memo;
                    return false;
                }
            }
            $("#oaZoneCode").val($("#orderPostal").val());
            $("#oaAddr1").val($("#orderAddress1").val());
            $(".delivery_area").removeClass("delivery_modify");
        });
        $(".change_delivery .btn_cancel").on("click",function () {
            $(".delivery_area").removeClass("delivery_modify");
        });
        $(".cont_write .btn_payment").on("click",function(){

            var number = $("#oaPhone1").val(); // + "-" + $("#oaPhone2").val() + "-" + $("#oaPhone3").val()
            if($("#countryName").val() != "" && $("#countryName").val() != "한국" && $("#countryName").val() != "Korea"){
                if(number.substring(0,1) == "0")
                    number = $('input[name="oaPhoneCountry"]').val() + number.replace("0", "-");
                else
                    number = $('input[name="oaPhoneCountry"]').val() + "-" + number;
            }
            oTel.val(number);

            if (re_id.test(uid.val()) != true) { // 이름 검사
                //uid.focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").html('To submit a question, you must enter your name. The name must be from 2 to 30 characters, and in English.');
                }else{
                    $(".desc_layer").html('문의를 위해서 이름이 입력되어야 합니다.'+'<br>'+'이름은 2-30자 사이 한글/영문만 가능합니다.');
                }
                target = uid;
                return false;
            }else if(re_mail.test(mail.val()) != true) { // 이메일 검사
                //mail.focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").html('To submit a question, you must enter your email address. Please enter a valid email address.');
                }else{
                    $(".desc_layer").html('문의를 위해서 이메일 주소가 입력되어야 합니다.'+'<br>'+'올바른 이메일 주소를 입력해주세요.');
                }
                target = mail;
                return false;
            }else if(re_tel.test(tel.val()) != true) { // 연락처 검사
                //tel.focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").html('To submit a question, you must enter a valid phone number.');
                }else{
                    $(".desc_layer").html('문의를 위해서 연락처가 입력되어야 합니다.'+'<br>'+'숫자, - 가 포함된 올바른 연락처를 입력해주세요.');
                }
                target = tel;
                return false;
            }else if($(".cont_write #sortVal").val() == ""){
                //$(".cont_write .link_selected").focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").text('Please select the type of question.');
                }else{
                    $(".desc_layer").text('문의 유형을 선택해주세요.');
                }
                target = $(".cont_write .link_selected");
                return false;
            }else if($.trim(title.val()) === "" || title.val().length < 2 || title.val().length > 100) { // 제목 검사
                //title.focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").html('Questions must be accompanied by a title. The title must be from 2 to 100 characters long.');
                }else{
                    $(".desc_layer").html('문의를 위해서 제목이 입력되어야 합니다.'+'<br>'+'제목은 2-100자 사이로 작성해주세요.');
                }
                target = title;
                return false;
            }else if($.trim(content.val()) === "" || content.val().length < 2 || content.val().length > 3000) { // 내용 검사
                //content.focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").html('To submit a question, there must be text in the corresponding box. The length of the text must be from 2 to 3000 characters long.');
                }else{
                    $(".desc_layer").html('문의를 위해서 내용이 입력되어야 합니다.'+'<br>'+'내용은 2-3000자 사이로 작성해주세요.');
                }
                target = content;
                return false;
            }else if($(".cont_write .list_agree .inp_g").val() != "checkAgree"){
                //$(".cont_write .list_agree .inp_g").focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").text('Please agree to our privacy policy to continue.');
                }else{
                    $(".desc_layer").text('개인정보 수집 및 이용에 동의해주세요.');
                }
                target = $(".cont_write .list_agree .inp_g");
                return false;
            }
        });
        // 2017-03-07 수정 시작
        // 주문화면 주문자, 수령자 정보
        $(".cont_order .btn_payment").on("click",function(){
            if ($('.IS_VUE').length) {
                return;
            }

            //상품 갯수 변경 후 '변경'버튼 확정 체크
            if($(".btn_change:enabled").length > 0){
                alertPopup("alert_changeEmpty");
                return false;
            }
            //주문하기 누를 시에 갯수확인 한번 더
            var prCnt = 0; //기프트백 제외 상품개수
            var gbCnt = 0; //기프트백개수

            for (var i = 0; i < $(".list_cart li").length; i++) {
                if($(".list_cart li input[name=prType]").eq(i).val() == '8') {
                    gbCnt = gbCnt + parseInt($(".list_cart li input[name=bsEa]").eq(i).val());
                } else {
                    prCnt = prCnt + parseInt($(".list_cart li input[name=bsEa]").eq(i).val());
                }
            }

            if(gbCnt > prCnt){
                alertPopup('alert_alreadyBasket_giftBag_detail');
                return false;
            }

            var number = $("#oaPhone1").val() ;// + "-" + $("#oaPhone2").val() + "-" + $("#oaPhone3").val();
            if($("#countryName").val() != "" && $("#countryName").val() != "한국" && $("#countryName").val() != "Korea"){
                if(number.substring(0,1) == "0")
                    number = $('input[name="oaPhoneCountry"]').val() + number.replace("0", "-");
                else
                    number = $('input[name="oaPhoneCountry"]').val() + "-" + number;
            }
            oTel.val(number);

            var buyerNumber = buyerTel.val();
            if(buyerPhoneCountry.val() != "82"){
                if(buyerNumber.substring(0,1) == "0")
                    buyerNumber =  buyerPhoneCountry.val() + buyerNumber.replace("0", "-");
                else
                    buyerNumber =  buyerPhoneCountry.val() + "-" + buyerNumber;
            } else {
                buyerNumber =  buyerPhoneCountry.val() + "-" + buyerNumber;
            }

            if($(this).parents("form").hasClass("form_global")){
	            if (buyerCountry.text() != "한국" && buyerCountry.text() != "Korea" && re_Eid.test(buyerName.val()) != true) { // 주문자 이름 검사 (해외)
		            layerCenter();
		            if($("body").hasClass("en")){
			            $(".desc_layer").html('To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English.');
		            }else{
			            $(".desc_layer").html('주문을 위해서 주문자명이 입력되어야 합니다.'+'<br>'+'주문자명은 2-30자 사이 영문만 가능합니다.');
		            }
		            target = buyerName;
		            return false;
	            }else if ((buyerCountry.text() == "한국" || buyerCountry.text() == "Korea") && re_id.test(buyerName.val()) != true) { // 주문자 이름 검사 (국내)
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English or Korean.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 주문자명이 입력되어야 합니다.'+'<br>'+'주문자명은 2-30자 사이 한글/영문만 가능합니다.');
                    }
                    target = buyerName;
                    return false;
	            }else if(re_mail.test(buyerEmail.val() + '@' + buyerDomain.val()) != true) { // 주문자 이메일 검사
		            layerCenter();
		            if($("body").hasClass("en")){
			            $(".desc_layer").html('To place an order, you must enter your email address. Please enter a valid email address.');
		            }else{
			            $(".desc_layer").html('주문을 위해서 이메일 주소가 입력되어야 합니다.'+'<br>'+'올바른 이메일 주소를 입력해주세요.');
		            }
		            target = buyerEmail;
		            return false;
	            }else if(re_country.test(buyerPhoneCountry.val()) != true) { // 주문자 국가번호 검사
		            layerCenter();
		            if($("body").hasClass("en")){
			            $(".desc_layer").html('To place an order, you must enter a valid International phone number. International phone number must not contain +.');
		            }else{
			            $(".desc_layer").html('주문을 위해서 국가번호가 입력되어야 합니다.'+'<br>'+'국가번호는 +를 제외한 숫자만 입력해주세요.');
		            }
		            target = buyerPhoneCountry;
		            return false;
	            }else if(buyerPhoneCountry.val() != "82" && (re_tel_global.test(buyerNumber) != true)) { // 주문자 정보 한국이 아닐때 주문자 연락처 검사
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자가 포함된 올바른 연락처를 입력해주세요.');
                    }
                    target = buyerTel;
                    return false;
                }else if(buyerPhoneCountry.val() == "82" && (re_tel.test(buyerNumber) != true)) { // 주문자 정보 한국일 때 주문자 연락처 검사
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자가 포함된 올바른 연락처를 입력해주세요.');
                    }
                    target = buyerTel;
                    return false;
                } else if (re_Eid.test(name.val()) != true) { // 수령자 이름 검사
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the name of the recipient. The recipient’s name must be from 2 to 30 characters, in English.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 수령자명 입력되어야 합니다.'+'<br>'+'수령자명은 2-30자 사이 영문만 가능합니다.');
                    }
                    target = name;
                    return false;
                /*}else if(re_mail.test(oMail.val() + '@' + oDomain.val()) != true) { // 이메일 검사
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter your email address. Please enter a valid email address.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 이메일 주소가 입력되어야 합니다.'+'<br>'+'올바른 이메일 주소를 입력해주세요.');
                    }
                    target = oMail;
                    return false;*/
                }else if(re_country.test(oPhoneCountry.val()) != true) { // 수령자 국가번호 검사
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid International phone number. International phone number must not contain +.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 국가번호가 입력되어야 합니다.'+'<br>'+'국가번호는 +를 제외한 숫자만 입력해주세요.');
                    }
                    target = oPhoneCountry;
                    return false;
                }else if(re_tel_global.test(oTel.val()) != true) { // 수령자 연락처 검사
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 연락처가 입력되어야 합니다.'+'<br>'+'숫자가 포함된 올바른 연락처를 입력해주세요.');
                    }
                    target = oTel;
                    return false;
                }else if(re_postal.test(zipcode.val()) != true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid postal code.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 ZIP 코드가 입력되어야 합니다.'+'<br>'+'올바른 ZIP 코드를 입력해주세요.');
                    }
                    target = zipcode;
                    return false;
                }else if($.trim(addressEn.val()) === "" || addressEn.val().length < 2 || addressEn.val().length > 100) { // 주소 검사
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid mailing address. The address must be from 2 to 100 characters long.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 주소가 입력되어야 합니다.'+'<br>'+'주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = addressEn;
                    return false;
                }else if(re_en.test(addressEn.val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter only in English.');
                    }else{
                        $(".desc_layer").text('영문으로만 입력해주세요.');
                    }
                    target = addressEn;
                    return false;
                // }else if(re_address.test(addressEn.val()) == true){
                //     layerCenter();
                //     if($("body").hasClass("en")){
                //         $(".desc_layer").html('The address must not contain the following special characters & < > ;');
                //     }else{
                //         $(".desc_layer").text('주소는 특수문자 & < > ;를 제외하고 작성해주세요.');
                //     }
                //     target = addressEn;
                //     return false;
                }else if($.trim(detailEn.val()) === "" || detailEn.val().length < 2 || detailEn.val().length > 100){ // 상세주소 검사
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the full mailing address. The full address must be from 2 to 100 characters long.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 상세주소가 입력되어야 합니다.'+'<br>'+'상세주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = detailEn;
                    return false;
                }else if(re_en.test(detailEn.val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter only in English.');
                    }else{
                        $(".desc_layer").text('영문으로만 입력해주세요.');
                    }
                    target = detailEn;
                    return false;
                }else if(re_address.test(detailEn.val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('The full address must not contain the following special characters & < > ;');
                    }else{
                        $(".desc_layer").text('상세주소는 특수문자 & < > ;를 제외하고 작성해주세요.');
                    }
                    target = detailEn;
                    return false;
                }else if($.trim(detailEn2.val()) === "" || detailEn2.val().length < 2 || detailEn2.val().length > 100) { // 주소 검사
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid mailing address. The address must be from 2 to 100 characters long.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 주소가 입력되어야 합니다.'+'<br>'+'주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = detailEn2;
                    return false;
                }else if(re_en.test(detailEn2.val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter only in English.');
                    }else{
                        $(".desc_layer").text('영문으로만 입력해주세요.');
                    }
                    target = detailEn2;
                    return false;
                // }else if(re_address.test(detailEn2.val()) == true){
                //     layerCenter();
                //     if($("body").hasClass("en")){
                //         $(".desc_layer").html('The address must not contain the following special characters & < > ; ');
                //     }else{
                //         $(".desc_layer").text('주소는 특수문자 & < > ;를 제외하고 작성해주세요.');
                //     }
                //     target = detailEn2;
                //     return false;
                }else if(re_en.test(memoEn.val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter only in English.');
                    }else{
                        $(".desc_layer").text('영문으로만 입력해주세요.');
                    }
                    target = memoEn;
                    return false;
                }else if(re_memo.test(memoEn.val()) == true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('The delivery notes must not contain the following special characters & < > ;');
                    }else{
                        $(".desc_layer").text('배송메모는 특수문자 & < > ;를 제외하고 작성해주세요.');
                    }
                    target = memoEn;
                    return false;
                }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon1.val()) != true){
                    //coupon1.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter the correct coupon code.');
                    }else{
                        $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                    }
                    target = coupon1;
                    return false;
                }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon2.val()) != true){
                    //coupon2.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter the correct coupon code.');
                    }else{
                        $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                    }
                    target = coupon2;
                    return false;
                }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon3.val()) != true){
                    //coupon3.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter the correct coupon code.');
                    }else{
                        $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                    }
                    target = coupon3;
                    return false;
                }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon4.val()) != true){
                    //coupon4.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter the correct coupon code.');
                    }else{
                        $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                    }
                    target = coupon4;
                    return false;
                }else if(!$(".cont_order .list_pay .inp_g:radio[name=payType]:checked").val()){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please select a payment method.');
                    }else{
                        $(".desc_layer").text('결제수단을 정해주세요.');
                    }
                    target = $(".cont_order .list_pay .inp_g");
                    return false;

                //} else if($("#checkAgreeGlobal").val() != "checkAgree"){
                // 우선 주석처리
                // layerCenter();
                // $(".desc_layer").text('해외 배송 약관에 동의해주세요.');
                // target = $("#checkAgreeGlobal");
                // return false;}
                // else if($("#checkAgree1").val() != "checkAgree"){
                //     layerCenter();
                //     if($("body").hasClass("en")){
                //         $(".desc_layer").text('Please agree to our privacy policy to continue.');
                //     }else{
                //         $(".desc_layer").text('약관 확인 후 동의하여 주시기 바랍니다.');
                //     }
                //     target = $("#checkAgree1");
                //     return false;
                }else if($("#checkAgree2").val() != "checkAgree"){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please agree to our privacy policy to continue.');
                    }else{
                        $(".desc_layer").text('약관 확인 후 동의하여 주시기 바랍니다.');
                    }
                    target = $("#checkAgree2");
                    return false;

                }else if($("#checkAgree3").val() != "checkAgree"){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please agree to our privacy policy to continue.');
                    }else{
                        $(".desc_layer").text('약관 확인 후 동의하여 주시기 바랍니다.');
                    }
                    target = $("#checkAgree3");
                    return false;
                }
            }else{
                if (buyerCountry.text() != "한국" && buyerCountry.text() != "Korea" && re_Eid.test(buyerName.val()) != true) { // 주문자 이름 검사 (해외)
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 주문자명이 입력되어야 합니다.'+'<br>'+'주문자명은 2-30자 사이 영문만 가능합니다.');
                    }
                    target = buyerName;
                    return false;
                }else if ((buyerCountry.text() == "한국" || buyerCountry.text() == "Korea") && re_id.test(buyerName.val()) != true) { // 주문자 이름 검사 (국내)
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English or Korean.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 주문자명이 입력되어야 합니다.'+'<br>'+'주문자명은 2-30자 사이 한글/영문만 가능합니다.');
                    }
                    target = buyerName;
                    return false;
	            }else if(re_mail.test(buyerEmail.val() + '@' + buyerDomain.val()) != true) { // 주문자 이메일 검사
		            layerCenter();
		            if($("body").hasClass("en")){
			            $(".desc_layer").html('To place an order, you must enter your email address. Please enter a valid email address.');
		            }else{
			            $(".desc_layer").html('주문을 위해서 이메일 주소가 입력되어야 합니다.'+'<br>'+'올바른 이메일 주소를 입력해주세요.');
		            }
		            target = buyerEmail;
		            return false;
	            }else if(re_country.test(buyerPhoneCountry.val()) != true) { // 주문자 국가번호 검사
		            layerCenter();
		            if($("body").hasClass("en")){
			            $(".desc_layer").html('To place an order, you must enter a valid International phone number. International phone number must not contain +.');
		            }else{
			            $(".desc_layer").html('주문을 위해서 국가번호가 입력되어야 합니다.'+'<br>'+'국가번호는 +를 제외한 숫자만 입력해주세요.');
		            }
		            target = buyerPhoneCountry;
		            return false;
                }else if(buyerPhoneCountry.val() != "82" && (re_tel_global.test(buyerNumber) != true)) { // 주문자 정보 한국이 아닐때 주문자 연락처 검사
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자가 포함된 올바른 연락처를 입력해주세요.');
                    }
                    target = buyerTel;
                    return false;
                }else if(buyerPhoneCountry.val() == "82" && (re_tel.test(buyerNumber) != true)) { // 주문자 정보 한국일 때 주문자 연락처 검사
                    layerCenter();
                    if ($("body").hasClass("en")) {
                        $(".desc_layer").html('To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.');
                    } else {
                        $(".desc_layer").html('주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자가 포함된 올바른 연락처를 입력해주세요.');
                    }
                    target = buyerTel;
                    return false;
	            } else if (re_id.test(name.val()) != true) { // 수령자 이름 검사
                    //name.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the name of the recipient. The recipient’s name must be from 2 to 30 characters, in English or Korean.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 수령자명이 입력되어야 합니다.'+'<br>'+'수령자명은 2-30자 사이 한글/영문만 가능합니다.');
                    }
                    target = name;
                    return false;
                /*}else if(re_mail.test(oMail.val() + '@' + oDomain.val()) != true) { // 이메일 검사
                    //oMail.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter your email address. Please enter a valid email address.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 이메일 주소가 입력되어야 합니다.'+'<br>'+'올바른 이메일 주소를 입력해주세요.');
                    }
                    target = oMail;
                    return false;*/
                }else if(re_country.test(oPhoneCountry.val()) != true) { // 수령자 국가번호 검사
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid International phone number. International phone number must not contain +.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 국가번호가 입력되어야 합니다.'+'<br>'+'국가번호는 +를 제외한 숫자만 입력해주세요.');
                    }
                    target = oPhoneCountry;
                    return false;
                }else if(re_tel.test(oPhoneCountry.val() + '-' + oTel.val()) != true) { // 수령자 연락처 검사
                    //oTel.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 연락처가 입력되어야 합니다.'+'<br>'+'숫자가 포함된 올바른 연락처를 입력해주세요.');
                    }
                    target = oTel;
                    return false;
                }else if(re_postal.test(postal.val()) != true){
                    //postal.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid postal code. Select a postal code (five-digit postal code corresponding to the road name address system).');
                    }else{
                        $(".desc_layer").html('주문을 위해서 우편번호가 입력되어야 합니다.'+'<br>'+'우편번호를 선택해주세요. (도로명주소 5자리)');
                    }
                    target = postal;
                    return false;
                }else if($.trim(address.val()) === "" || address.val().length < 2 || address.val().length > 100) { // 주소 검사
                    //address.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter a valid mailing address. The address must be from 2 to 100 characters long.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 주소가 입력되어야 합니다.'+'<br>'+'주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = address;
                    return false;
                // }else if(re_address.test(address.val()) == true){
                //     //address.focus();
                //     layerCenter();
                //     if($("body").hasClass("en")){
                //         $(".desc_layer").html('The address must not contain the following special characters & < > ; ');
                //     }else{
                //         $(".desc_layer").text('주소는 특수문자 & < > ;를 제외하고 작성해주세요.');
                //     }
                //     target = address;
                //     return false;
                }else if($.trim(detail.val()) === "" || detail.val().length < 2 || detail.val().length > 100) { // 상세주소 검사
                    //detail.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('To place an order, you must enter the full mailing address. The full address must be from 2 to 100 characters long.');
                    }else{
                        $(".desc_layer").html('주문을 위해서 상세주소가 입력되어야 합니다.'+'<br>'+'상세주소는 2-100자 사이로 작성해주세요.');
                    }
                    target = detail;
                    return false;
                }else if(re_address.test(detail.val()) == true){
                    //detail.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('The full address must not contain the following special characters & < > ;');
                    }else{
                        $(".desc_layer").text('상세주소는 특수문자 & < > ;를 제외하고 작성해주세요.');
                    }
                    target = detail;
                    return false;
                }else if(re_memo.test(memo.val()) == true){
                    //memo.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('The delivery notes must not contain the following special characters & < > ;');
                    }else{
                        $(".desc_layer").text('배송메모는 특수문자 & < > ;를 제외하고 작성해주세요.');
                    }
                    target = memo;
                    return false;
                }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon1.val()) != true){
                    //coupon1.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter the correct coupon code.');
                    }else{
                        $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                    }
                    target = coupon1;
                    return false;
                }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon2.val()) != true){
                    //coupon2.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter the correct coupon code.');
                    }else{
                        $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                    }
                    target = coupon2;
                    return false;
                }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon3.val()) != true){
                    //coupon3.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter the correct coupon code.');
                    }else{
                        $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                    }
                    target = coupon3;
                    return false;
                }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon4.val()) != true){
                    //coupon4.focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter the correct coupon code.');
                    }else{
                        $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                    }
                    target = coupon4;
                    return false;
                }else if(!$(".cont_order .list_pay .inp_g:radio[name=payType]:checked").val()){
                    //$(".cont_order .list_pay .inp_g").focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please select a payment method.');
                    }else{
                        $(".desc_layer").text('결제수단을 정해주세요.');
                    }
                    target = $(".cont_order .list_pay .inp_g");
                    return false;
                // }else if($("#checkAgree1").val() != "checkAgree"){
                //     //$("#checkAgree1").focus();
                //     layerCenter();
                //     if($("body").hasClass("en")){
                //         $(".desc_layer").text('Please agree to our privacy policy to continue.');
                //     }else{
                //         $(".desc_layer").text('약관 확인 후 동의하여 주시기 바랍니다.');
                //     }
                //     target = $("#checkAgree1");
                //     return false;
                }else if($("#checkAgree2").val() != "checkAgree"){
                    //$("#checkAgree2").focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please agree to our privacy policy to continue.');
                    }else{
                        $(".desc_layer").text('약관 확인 후 동의하여 주시기 바랍니다.');
                    }
                    target = $("#checkAgree2");
                    return false;
                }else if($("#checkAgree3").val() != "checkAgree"){
                    //$("#checkAgree2").focus();
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please agree to our privacy policy to continue.');
                    }else{
                        $(".desc_layer").text('약관 확인 후 동의하여 주시기 바랍니다.');
                    }
                    target = $("#checkAgree3");
                    return false;
                }
            }
            $("#oaZoneCode").val(postal.val());
            $("#oaAddr1").val(address.val());
            pay();
        });
        $(".cont_order .btn_apply").on("click",function(){

            if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon1.val()) != true){
                //coupon1.focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").text('Please enter the correct coupon code.');
                }else{
                    $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                }
                target = coupon1;
                clearCouponPrice();
                return false;
            }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon2.val()) != true){
                //coupon2.focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").text('Please enter the correct coupon code.');
                }else{
                    $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                }
                target = coupon2;
                clearCouponPrice();
                return false;
            }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon3.val()) != true){
                //coupon3.focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").text('Please enter the correct coupon code.');
                }else{
                    $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                }
                target = coupon3;
                clearCouponPrice();
                return false;
            }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon4.val()) != true){
                //coupon4.focus();
                layerCenter();
                if($("body").hasClass("en")){
                    $(".desc_layer").text('Please enter the correct coupon code.');
                }else{
                    $(".desc_layer").text('정확한 쿠폰번호를 입력해주세요.');
                }
                target = coupon4;
                clearCouponPrice();
                return false;
            }
            applyGiftCard();
        });
        $(".form_point .btn_apply").on("click",function(){

            if(re_coupon.test(coupon1.val()) != true){
                layerCenter();
                alertPopup('popup.coupon.desc');
                target = coupon1;
                return false;
            }else if(re_coupon.test(coupon2.val()) != true){
                layerCenter();
                alertPopup('popup.coupon.desc');
                target = coupon2;
                return false;
            }else if(re_coupon.test(coupon3.val()) != true){
                layerCenter();
                alertPopup('popup.coupon.desc');
                target = coupon3;
                return false;
            }else if(re_coupon.test(coupon4.val()) != true){
                layerCenter();
                alertPopup('popup.coupon.desc');
                target = coupon4;
                return false;
            }
            applyMyCoupon();
        });
    }


    snsLink = function(){
        var page_url = $(location).attr("href");
        var page_title = $("h1").text();
        $(".list_sns .link_sns").on("click",function(evt){
            evt.preventDefault();
            if($(this).find("span").hasClass('ico_face')){
                sendSns("facebook", page_url, page_title);
            }else if($(this).find("span").hasClass('ico_ks')){
                sendSns("kakaostory", page_url, page_title)
            }else if($(this).find("span").hasClass('ico_kt')){
                sendSns("kakaotalk", page_url, page_title)
            }else if($(this).find("span").hasClass('ico_twi')){
                sendSns("twitter", page_url, page_title)
            }

            return;
        });
    }

    function sendSns(sns, url, txt){
        var o;
        var _url = encodeURIComponent(url);
        var _txt = encodeURIComponent(txt);
        var _br  = encodeURIComponent('\r\n');
        var prodImg = $("meta[property='og:image']").attr("content");
        var posting_title = $("h3").text() == "" ? $(".tit_character").text() : $("h3").text();
        // 카카오스토리 공유하기
        switch(sns){
            case 'facebook':
                o = {
                    method:'popup',
                    url:'http://www.facebook.com/sharer/sharer.php?u=' + _url
                };
                break;
            case 'twitter':
                o = {
                    method:'popup',
                    url:'http://twitter.com/intent/tweet?text=' + encodeURIComponent("KAKAO FRIENDS - ") + encodeURIComponent(posting_title) + '&url=' + _url
                };
                break;
            case 'kakaotalk':
                if(deviceMobile){
                    var image_sharetalk = prodImg;
                    var regularPrice = $('[data-regular-price]').data('regularPrice');
                    var discountPrice = $('[data-discount-price]').data('discountPrice');

                    var commerce = {
                        regularPrice: regularPrice
                    };

                    if (discountPrice) {
                        commerce.discountPrice = discountPrice;
                        commerce.discountRate = Math.floor((regularPrice - discountPrice) / regularPrice * 100);
                    }

                    Kakao.Link.sendDefault({
                        objectType: 'commerce',
                        content: {
                            title: posting_title,
                            imageUrl: image_sharetalk,
                            imageWidth: 300,
                            imageHeight: 300,
                            link: {
                                webUrl: location.href,
                                mobileWebUrl: location.href
                            }
                        },
                        commerce: commerce,
                    });

                    return;
                }
                break;
            case 'kakaostory':
                if(deviceMobile){
                    Kakao.Story.share({
                        url: location.href,
                        text: posting_title
                    });
                    return;
                }else{
                    Kakao.Story.share({
                        url: location.href,
                        text: posting_title
                    });
                    return;
                }
                break;
            default:
                return false;
        }
        switch(o.method){
            case 'popup':
                window.open(o.url,'sharer','width=700,height=500,scrollbars=yes');
                break;
            case 'web2app':
                if(navigator.userAgent.match(/android/i)){
                    setTimeout(function(){ location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end'}, 100);
                }else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)){
                    setTimeout(function(){ location.href = o.a_store; }, 200);
                    setTimeout(function(){ location.href = o.a_proto + o.param }, 100);
                }else{
                    alert('이 기능은 모바일에서만 사용할 수 있습니다.');
                }
                break;
        }
    }// the end of sns

    logout = function () {
        $(".btn_logout").on("click", function () {
            Kakao.Auth.logout();
            Kakao.Auth.cleanup();
        })
    }
    checkout = function(){
        var re_typeA = /^[a-zA-Z\s]{1,2}$/; // a타입 검사식
        var re_typeB = /^[a-zA-Z\s]{1,7}$/; // b타입 검사식
        var re_typeC = /^[a-zA-Z\s]{1,8}$/; // c타입 검사식
        var re_memo = /[;<>&]/; // 일부 특수문자 제외 검사식
        var target;
        var left = $('#intLeft'),
            right = $('#intRight'),
            typeB = $('#intTypeB'),
            typeC = $('#intTypeC');
        $(".box_checkout .btn_open").on("click", function(){
            popupCenter();
            $(".dimmed_layer, .int_layer").css("display","block");
            $(".int_layer .fn_custom .fn_cancel").on("click", function(){
                $(".dimmed_layer, .int_layer").css("display","none");
            });
            $(".int_layer .fn_custom .fn_agree").on("click", function(){
                $(".box_checkout").addClass("checkout_open");
                $(".int_layer").css("display","none");
            });
        });
        $(".box_checkout .btn_close").on("click", function(){
            $(".dimmed_layer").css("display","none");
            $(".box_checkout").removeClass("checkout_open");
        });
        if($("#kakaoContent").hasClass("cont_item")){
            $(".alert_layer .btn_verify").on("click",function(){
                $("#kakaoIndex, #shopWrap").removeAttr("aria-hidden");
                $("#kakaoIndex a, #shopWrap a, #kakaoIndex button, #shopWrap button").removeAttr("tabindex");
                $(".alert_layer").hide();
                $(".dimmed_layer").css("z-index","100");
            });
        }
        $(".box_checkout .btn_buy").on("click", function(){
            $(".dimmed_layer").css("z-index","110");
            if($(".box_option .bg_int").hasClass("bg_type1")){
                if($.trim(left.val()) == "") {
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('Please enter the text to be embroidered.');
                    }else{
                        $(".desc_layer").html('자수 내용을 입력해 주세요.');
                    }
                    target = left;
                    return false;
                } else if ($.trim(right.val()) == "") {
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('Please enter the text to be embroidered.');
                    }else{
                        $(".desc_layer").html('자수 내용을 입력해 주세요.');
                    }
                    target = right;
                    return false;
                } else if(re_typeA.test(left.val()) != true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('Text must be in English. Korean, special characters and numbers are not permitted.');
                    }else{
                        $(".desc_layer").html('영문을 제외한 한글, 숫자, 특수문자는'+'<br>'+'입력이 불가합니다.');
                    }
                    target = left;
                    return false;
                }else if(re_typeA.test(right.val()) != true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('Text must be in English. Korean, special characters and numbers are not permitted.');
                    }else{
                        $(".desc_layer").html('영문을 제외한 한글, 숫자, 특수문자는'+'<br>'+'입력이 불가합니다.');
                    }
                    target = right;
                    return false;
                }
                $("#customProductMsg").val(left.val() + "♥" +right.val());
            }else if($(".box_option .bg_int").hasClass("bg_type2")){

                if($.trim(typeB.val()) == "") {
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('Please enter the text to be embroidered.');
                    }else{
                        $(".desc_layer").html('자수 내용을 입력해 주세요.');
                    }
                    target = typeB;
                    return false;
                } else if(re_typeB.test(typeB.val()) != true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('Text must be in English. Korean, special characters and numbers are not permitted.');
                    }else{
                        $(".desc_layer").html('영문을 제외한 한글, 숫자, 특수문자는'+'<br>'+'입력이 불가합니다.');
                    }
                    target = typeB;
                    return false;
                }
                $("#customProductMsg").val(typeB.val());
            }else if($(".box_option .bg_int").hasClass("bg_type3")){

                if($.trim(typeC.val()) == "") {
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").text('Please enter the text to be embroidered.');
                    }else{
                        $(".desc_layer").html('자수 내용을 입력해 주세요.');
                    }
                    target = typeC;
                    return false;
                } else if(re_typeC.test(typeC.val()) != true){
                    layerCenter();
                    if($("body").hasClass("en")){
                        $(".desc_layer").html('Text must be in English. Korean, special characters and numbers are not permitted.');
                    }else{
                        $(".desc_layer").html('영문을 제외한 한글, 숫자, 특수문자는'+'<br>'+'입력이 불가합니다.');
                    }
                    target = typeC;
                    return false;
                }
                $("#customProductMsg").val(typeC.val());
            }
            layerCenter();

            customProductSubmit();
        });

        if($(".bg_int").hasClass("bg_type1") || $(".bg_int").hasClass("bg_type2") || $(".bg_int").hasClass("bg_type3")) {
            var subjectLeft;
            var subjectRight;
            var targetLeft;
            var targetRight;
            var size;

            if ($(".bg_int").hasClass("bg_type1")) {
                subjectLeft = $("#intLeft");
                targetLeft = $("#exLeft");
                subjectRight = $("#intRight");
                targetRight = $("#exRight");
                size = "2";
            } else if ($(".bg_int").hasClass("bg_type2")) {
                subjectLeft = $("#intTypeB");
                targetLeft = $("#exTypeB");
                size = "7";
            } else if ($(".bg_int").hasClass("bg_type3")) {
                subjectLeft = $("#intTypeC");
                targetLeft = $("#exTypeC");
                size = "8";
            }


            subjectLeft.on('keyup keypress', function (e) {
                targetLeft.val(subjectLeft.val());
                if (targetLeft.val().length > size) {
                    targetLeft.val(targetLeft.val().substring(0, size));
                }
            });
            if ($(".bg_int").hasClass("bg_type1")) {
                subjectRight.on('keyup keypress', function (e) {
                    targetRight.val(subjectRight.val());
                    if (targetRight.val().length > size) {
                        targetRight.val(targetRight.val().substring(0, size));
                    }
                });
            }
        }
    }
    bnrGlobal = function() {
        $(".bnr_notice .btn_close").on("click",function(){
            $("body").removeClass("global_bnr");
        });
    }
    eventProduct = function(){
        $(".btn_eventproduct.btn_buy").on("click", function(){
            if($("#prEa").val() > 0) {
                popupCenter();
                $(".dimmed_layer, .int_layer").css("display", "block");
            }
        });

        $('.int_layer .fn_event .fn_cancel').on('click', function () {
            $(".dimmed_layer, .int_layer").css("display","none");
        });

        $('.int_layer .fn_event .fn_agree').on('click', function () {
            frm.submit();
        });
    }
    // 2017-03-07 추가 시작
    bnrGlobal = function() {
        $(".bnr_notice .btn_close").on("click",function(){
            $("body").removeClass("global_bnr");
        });
    }
    // 2017-03-07 추가 끝
    tabMenu = function() {
        $(".list_tab .link_tab").on("click",function(){
            $(".list_tab li").removeClass("on");
            $(this).parents("li").addClass("on");
            $(".tab_cont").css("display","none");
            $($(this).attr("href")).css("display","block");
            return false;
        });
    }

    globalView = function() {
        $(".cont_global .wrap_table > .btn_view, .wrap_table .table_item .btn_view").on("click",function(e){
            e.preventDefault();
            var txt = $(this).children("span").text();
            var item = $(this).parents(".table_item").siblings(".table_item");
            $(this).parent().toggleClass("visible_on");
            item.removeClass("visible_on");
            if($("body").hasClass("en")){
                $(this).children("span").text(txt == "open" ? "close" : "open");
                item.children(".btn_view").children("span").text("open");
            }else{
                $(this).children("span").text(txt == "내용 펼치기" ? "내용 접기" : "내용 펼치기");
                item.children(".btn_view").children("span").text("내용 펼치기");
            }
            if($(this).parent(".table_item").length){
                var position = $(this).parent(".table_item").offset();
                $('html, body').animate({scrollTop : position.top - 50}, 0);
            }
        });
    }

    // 2017-10-31 추가 시작
    memberJoin = function() {
        $(".opt_g .link_selected").on("click",function(e){
            e.preventDefault();
            if($(this).parent(".opt_g").hasClass("opt_on")){
                $(this).parent(".opt_g").removeClass("opt_on")
            } else {
                if ($('.cont_basket').length && $(this).parent(".opt_g").siblings('.opt_on').length) {
                    return
                }
                $(this).parent(".opt_g").addClass("opt_on")
            }
        });
    }
    // 2017-10-31 추가 끝

    return {
        init : startModule,
        orderCheck: function(){
            return validateCheck.orderValidationCheck;
        }
    }
}());

$(document).ready(function() {
    homeIcon();
    $(".list_basket li").each(function(){
        var target = $(this).find(".choice_basket .inp_g");
        if(target.is(":checked")){
            target.not(":disabled").parents("li").addClass("check_on");
        }else{
            target.parents("li").removeClass("check_on");
        }
    });
    $(window).bind("pageshow", function(event){ // 사파리 뒤로가기 새로고침
        if(event.originalEvent.persisted){
            window.location.reload();
        }
    });

    fr.init();
    if($(".box_search.result_on").length < 1){
        $(".box_search .inp_search").val("");
    }
    $(window).on("resize load",function(){
        stHead();
        var maskHeight = $(document).height();
        $('.dimmed_layer').css('height', maskHeight);
        var lwidth = 0;
        $(".cont_global .list_tab li").each(function(i){
            lwidth += eval($(".cont_global .list_tab li").eq(i).outerWidth());
        });
        currentChange();
        if ($(window).width() >= 768){
            $(".inner_head").css("height","70px");
            $(".cont_global .list_tab").css("width","760px");
            if($(".side_menu").hasClass("navi_on")){
                $(".side_menu").removeClass("navi_on");
                $(".side_menu").css("left","-100%");
                $(".side_menu").css("display","none");
                $(".dimmed_layer").css("display","none");
                $("html").removeClass("lock_on");
            }else if($("body").hasClass("search_on")){
                $(".dimmed_layer").css("display","none");
                $("body").removeClass("search_on");
                $("html").removeClass("lock_on");
            }
        }
        else if($(window).width() < 768){
            if($(".inner_head").hasClass('kakaotalk')) {
              $(".inner_head").css("height","48px");
            } else {
              $(".inner_head").css("height","60px");
            }

            $(".cont_global .list_tab").css("width",lwidth+12);
            if($(window).height() <= 328) { // 가로모드 대응 추가
                $(".opt_nation .box_scroll").css("max-height","123px");
            }else{
                $(".opt_nation .box_scroll").css("max-height","328px");
            }
        };
    });
});

function display_waitBlockUI(){
    $.blockUI({
        message: null
    });
    setTimeout($.unblockUI, 2000);
}

function paypalOrderInfoCheck() {

    var re_id = /^[가-힣a-zA-Z\s]{2,30}$/; // 이름, 주문자명 검사식
    var re_Eid = /^[a-zA-Z\s]{2,30}$/; // 이름, 주문자명 검사식 영문 // 2017-03-07 추가
    var re_en = /[^a-zA-Z0-9(),-.?\s]+/; // 영어만 포함되어 있는지 검사 // 2017-07-03 수정
    var re_mail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/; // 이메일 검사식
    var re_tel = /^[0-9]{1,3}-[0-9]{6,15}$/; // 모든전화번호 검사식
    var re_tel_global = /^[0-9]{1,3}-[0-9]{6,15}$/; // 해외용전화번호 검사식
    var re_postal = /^[a-zA-Z0-9]{2,10}$/; // 우편번호 검사식
    var re_coupon = /^[a-zA-Z0-9]{4}$/; // 쿠폰 검사식
    var re_memo = /[;<>&]/; // 일부 특수문자 제외 검사식
    var re_country = /^[0-9]{1,3}$/; // 국가번호 3자리검사 // 2017-12-26 수정
    var re_address = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9(),-.?\s]+/;
    var target;
    var uid = $('#bdaOwnername'),
        mail = $('#bdaEmail'),
        tel = $('#bdaPhone'),
        title = $("#bdaTitle"),
        content = $("#bdaContent"),
        name = $('#oaName'),
        oMail = $('#oaEmailTemp'),
	    oDomain = $('#tfDomain2'),
        oTel = $('#oaPhone'),
        oPhoneCountry = $('#oaPhoneCountry'), // 2017-05-11 추가
        buyerCountry = $('#buyerCountry'), // 2017-12-21 주문자 국가 추가
	    buyerName = $('#tfoaN'),
	    buyerEmail = $('#tfEmailIdTemp'),
	    buyerDomain = $('#tfDomain1'),
	    buyerTel = $('#buyerPhone'),
	    buyerPhoneCountry = $('#oaBuyerPhoneCountry'), // 주문자 추가
        postal = $("#orderPostal"),
        zipcode = $("#orderPostal"), // 2017-03-07 추가
        address = $("#orderAddress1"),
        addressEn = $("#orderAddress1"), // 2017-03-07 추가
        detail = $("#orderAddress2"),
        detailEn = $("#orderAddress2"), // 2017-03-07 추가
        detailEn2 = $("#orderAddress3"), // 2017-05-11 추가
        memo = $("#osDeliMemo"),
        memoEn = $("#osDeliMemo"), // 2017-03-07 추가
        coupon1 = $("#cpnNum1"),
        coupon2 = $("#cpnNum2"),
        coupon3 = $("#cpnNum3"),
        coupon4 = $("#cpnNum4");

    var number = $("#oaPhone1").val(); // + "-" + $("#oaPhone2").val() + "-" + $("#oaPhone3").val();
    if($("#countryName").val() != "" && $("#countryName").val() != "한국" && $("#countryName").val() != "Korea"){
        if(number.substring(0,1) == "0")
            number = $('input[name="oaPhoneCountry"]').val() + number.replace("0", "-");
        else
            number = $('input[name="oaPhoneCountry"]').val() + "-" + number;
    }
    oTel.val(number);

    var buyerNumber = buyerTel.val();
    if(buyerPhoneCountry.val() != "82"){
        if(buyerNumber.substring(0,1) == "0")
            buyerNumber =  buyerPhoneCountry.val() + buyerNumber.replace("0", "-");
        else
            buyerNumber =  buyerPhoneCountry.val() + "-" + buyerNumber;
    } else {
        buyerNumber =  buyerPhoneCountry.val() + "-" + buyerNumber;
    }

    var message = "";

    if($("#ini").hasClass("form_global")){
        if (buyerCountry.text() != "한국" && buyerCountry.text() != "Korea" && re_Eid.test(buyerName.val()) != true) { // 주문자 이름 검사 (해외)

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English.';
            }else{
                message = '주문을 위해서 주문자명이 입력되어야 합니다.'+'<br>'+'주문자명은 2-30자 사이 영문만 가능합니다.';
            }
            target = buyerName;
        }else if ((buyerCountry.text() == "한국" || buyerCountry.text() == "Korea") && re_id.test(buyerName.val()) != true) { // 주문자 이름 검사 (국내)

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English or Korean.';
            }else{
                message = '주문을 위해서 주문자명이 입력되어야 합니다.'+'<br>'+'주문자명은 2-30자 사이 한글/영문만 가능합니다.';
            }
            target = buyerName;
	    }else if(re_mail.test(buyerEmail.val() + '@' + buyerDomain.val()) != true) { // 주문자  이메일 검사

		    if($("body").hasClass("en")){
			    message = 'To place an order, you must enter your email address. Please enter a valid email address.';
		    }else{
			    message = '주문을 위해서 이메일 주소가 입력되어야 합니다.'+'<br>'+'올바른 이메일 주소를 입력해주세요.';
		    }
		    target = buyerEmail;
	    }else if(re_country.test(buyerPhoneCountry.val()) != true) { // 주문자 국가번호 검사

		    if($("body").hasClass("en")){
			    message = 'To place an order, you must enter a valid International phone number. International phone number must not contain +.';
		    }else{
			    message = '주문을 위해서 국가번호가 입력되어야 합니다.'+'<br>'+'국가번호는 +를 제외한 숫자만 입력해주세요.';
		    }
		    target = buyerPhoneCountry;
        }else if(buyerPhoneCountry.val() != "82" && (re_tel_global.test(buyerNumber) != true)) { // 주문자 정보 한국이 아닐때 주문자 연락처 검사

            if ($("body").hasClass("en")) {
                message = 'To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.';
            } else {
                message = '주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자가 포함된 올바른 연락처를 입력해주세요.';
            }
            target = buyerTel;
        }else if(buyerPhoneCountry.val() == "82" && (re_tel.test(buyerNumber) != true)) { // 주문자 정보 한국일 때 주문자 연락처 검사

            if ($("body").hasClass("en")) {
                message = 'To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.';
            } else {
                message = '주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자가 포함된 올바른 연락처를 입력해주세요.';
            }
            target = buyerTel;
	    }else if(re_Eid.test(name.val()) != true) { // 수령자 이름 검사

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter the name of the recipient. The recipient’s name must be from 2 to 30 characters, in English.';
            }else{
                message = '주문을 위해서 수령자명이 입력되어야 합니다.'+'<br>'+'수령자명은 2-30자 사이 영문만 가능합니다.';
            }
            target = name;

        /*}else if(re_mail.test(oMail.val() + '@' + oDomain.val()) != true) { // 이메일 검사

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter your email address. Please enter a valid email address.';
            }else{
                message = '주문을 위해서 이메일 주소가 입력되어야 합니다.'+'<br>'+'올바른 이메일 주소를 입력해주세요.';
            }
            target = oMail;*/
        }else if(re_country.test(oPhoneCountry.val()) != true) { // 수령자 국가번호 검사

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid International phone number. International phone number must not contain +.';
            }else{
                message = '주문을 위해서 국가번호가 입력되어야 합니다.'+'<br>'+'국가번호는 +를 제외한 숫자만 입력해주세요.';
            }
            target = oPhoneCountry;
        }else if(re_tel_global.test(oTel.val()) != true) { // 수령자 연락처 검사

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.';
            }else{
                message = '주문을 위해서 연락처가 입력되어야 합니다.'+'<br>'+'숫자가 포함된 올바른 연락처를 입력해주세요.';
            }
            target = oTel;
        }else if(re_postal.test(zipcode.val()) != true){

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid postal code.';
            }else{
                message = '주문을 위해서 ZIP 코드가 입력되어야 합니다.'+'<br>'+'올바른 ZIP 코드를 입력해주세요.';
            }
            target = zipcode;

        }else if($.trim(addressEn.val()) === "" || addressEn.val().length < 2 || addressEn.val().length > 100) { // 주소 검사

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid mailing address. The address must be from 2 to 100 characters long.';
            }else{
                message = '주문을 위해서 주소가 입력되어야 합니다.'+'<br>'+'주소는 2-100자 사이로 작성해주세요.';
            }
            target = addressEn;

        }else if(re_en.test(addressEn.val()) == true){

            if($("body").hasClass("en")){
                message = 'Please enter only in English.';
            }else{
                message = '영문으로만 입력해주세요.';
            }
            target = addressEn;

        }else if(re_address.test(addressEn.val()) == true){

            if($("body").hasClass("en")){
                message = 'The address must not contain the following special characters & < > ;';
            }else{
                message = '주소는 특수문자 & < > ;를 제외하고 작성해주세요.';
            }
            target = addressEn;

        }else if($.trim(detailEn.val()) === "" || detailEn.val().length < 2 || detailEn.val().length > 100){ // 상세주소 검사

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter the full mailing address. The full address must be from 2 to 100 characters long.';
            }else{
                message = '주문을 위해서 상세주소가 입력되어야 합니다.'+'<br>'+'상세주소는 2-100자 사이로 작성해주세요.';
            }
            target = detailEn;

        }else if(re_en.test(detailEn.val()) == true){

            if($("body").hasClass("en")){
                message = 'Please enter only in English.';
            }else{
                message = '영문으로만 입력해주세요.';
            }
            target = detailEn;

        }else if(re_address.test(detailEn.val()) == true){

            if($("body").hasClass("en")){
                message = 'The full address must not contain the following special characters & < > ;';
            }else{
                message = '상세주소는 특수문자 & < > ;를 제외하고 작성해주세요.';
            }
            target = detailEn;

        }else if($.trim(detailEn2.val()) === "" || detailEn2.val().length < 2 || detailEn2.val().length > 100) { // 주소 검사

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid mailing address. The address must be from 2 to 100 characters long.';
            }else{
                message = '주문을 위해서 주소가 입력되어야 합니다.'+'<br>'+'주소는 2-100자 사이로 작성해주세요.';
            }
            target = detailEn2;

        }else if(re_en.test(detailEn2.val()) == true){

            if($("body").hasClass("en")){
                message = 'Please enter only in English.';
            }else{
                message = '영문으로만 입력해주세요.';
            }
            target = detailEn2;

        }else if(re_address.test(detailEn2.val()) == true){

            if($("body").hasClass("en")){
                message = 'The address must not contain the following special characters & < > ; ';
            }else{
                message = '주소는 특수문자 & < > ;를 제외하고 작성해주세요.';
            }
            target = detailEn2;

        }else if(re_en.test(memoEn.val()) == true){

            if($("body").hasClass("en")){
                message = 'Please enter only in English.';
            }else{
                message = '영문으로만 입력해주세요.';
            }
            target = memoEn;

        }else if(re_memo.test(memoEn.val()) == true){

            if($("body").hasClass("en")){
                message = 'The delivery notes must not contain the following special characters & < > ;';
            }else{
                message = '배송메모는 특수문자 & < > ;를 제외하고 작성해주세요.';
            }
            target = memoEn;

        }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon1.val()) != true){
            //coupon1.focus(;

            if($("body").hasClass("en")){
                message = 'Please enter the correct coupon code.';
            }else{
                message = '정확한 쿠폰번호를 입력해주세요.';
            }
            target = coupon1;

        }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon2.val()) != true){
            //coupon2.focus(;

            if($("body").hasClass("en")){
                message = 'Please enter the correct coupon code.';
            }else{
                message = '정확한 쿠폰번호를 입력해주세요.';
            }
            target = coupon2;

        }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon3.val()) != true){
            //coupon3.focus(;

            if($("body").hasClass("en")){
                message = 'Please enter the correct coupon code.';
            }else{
                message = '정확한 쿠폰번호를 입력해주세요.';
            }
            target = coupon3;

        }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon4.val()) != true){
            //coupon4.focus(;

            if($("body").hasClass("en")){
                message = 'Please enter the correct coupon code.';
            }else{
                message = '정확한 쿠폰번호를 입력해주세요.';
            }
            target = coupon4;

        }else if(!$(".cont_order .list_pay .inp_g:radio[name=payType]:checked").val()){

            if($("body").hasClass("en")){
                message = 'Please select a payment method.';
            }else{
                message = '결제수단을 정해주세요.';
            }
            target = $(".cont_order .list_pay .inp_g");


        //} else if($("#checkAgreeGlobal").val() != "checkAgree"){
        // 우선 주석처리
        // layerCenter(;
        // $(".desc_layer").text('해외 배송 약관에 동의해주세요.';
        // target = $("#checkAgreeGlobal";
        // }
        // else if($("#checkAgree1").val() != "checkAgree"){
        //
        //     if($("body").hasClass("en")){
        //         message = 'Please agree to our privacy policy to continue.';
        //     }else{
        //         message = '약관 확인 후 동의하여 주시기 바랍니다.';
        //     }
        //     target = $("#checkAgree1");
        //
        }else if($("#checkAgree2").val() != "checkAgree"){

            if($("body").hasClass("en")){
                message = 'Please agree to our privacy policy to continue.';
            }else{
                message = '약관 확인 후 동의하여 주시기 바랍니다.';
            }
            target = $("#checkAgree2");

        }else if($("#checkAgree3").val() != "checkAgree"){

            if($("body").hasClass("en")){
                message = 'Please agree to our privacy policy to continue.';
            }else{
                message = '약관 확인 후 동의하여 주시기 바랍니다.';
            }
            target = $("#checkAgree3");

        }
    }else{
        if (buyerCountry.text() != "한국" && buyerCountry.text() != "Korea" && re_Eid.test(buyerName.val()) != true) { // 주문자 이름 검사 (해외)

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English.';
            }else{
                message = '주문을 위해서 주문자명이 입력되어야 합니다.'+'<br>'+'주문자명은 2-30자 사이 영문만 가능합니다.';
            }
            target = buyerName;
        }else if ((buyerCountry.text() == "한국" || buyerCountry.text() == "Korea") && re_id.test(buyerName.val()) != true) { // 주문자 이름 검사 (국내)
            if ($("body").hasClass("en")) {
                message = 'To place an order, you must enter the name of the buyer. The buyer’s name must be from 2 to 30 characters, in English or Korean.';
            } else {
                message = '주문을 위해서 주문자명이 입력되어야 합니다.' + '<br>' + '주문자명은 2-30자 사이 한글/영문만 가능합니다.';
            }
            target = buyerName;
        }else if(re_mail.test(buyerEmail.val() + '@' + buyerDomain.val()) != true) { // 주문자 이메일 검사
            //oMail.focus(;

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter your email address. Please enter a valid email address.';
            }else{
                message = '주문을 위해서 이메일 주소가 입력되어야 합니다.'+'<br>'+'올바른 이메일 주소를 입력해주세요.';
            }
            target = oMail;

        }else if(re_country.test(buyerPhoneCountry.val()) != true) { // 주문자 국가번호 검사

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid International phone number. International phone number must not contain +.';
            }else{
                message = '주문을 위해서 국가번호가 입력되어야 합니다.'+'<br>'+'국가번호는 +를 제외한 숫자만 입력해주세요.';
            }
            target = buyerPhoneCountry;
        }else if(buyerPhoneCountry.val() != "82" && (re_tel_global.test(buyerNumber) != true)) { // 주문자 정보 한국이 아닐때 주문자 연락처 검사

            if ($("body").hasClass("en")) {
                message = 'To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.';
            } else {
                message = '주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자가 포함된 올바른 연락처를 입력해주세요.';
            }
            target = buyerTel;
        }else if(buyerPhoneCountry.val() == "82" && (re_tel.test(buyerNumber) != true)) { // 주문자 정보 한국일 때 주문자 연락처 검사

            if ($("body").hasClass("en")) {
                message = 'To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.';
            } else {
                message = '주문을 위해서 연락처가 입력되어야 합니다.' + '<br>' + '숫자가 포함된 올바른 연락처를 입력해주세요.';
            }
            target = buyerTel;
        }else if (re_Eid.test(name.val()) != true) { // 수령자 이름 검사
            //name.focus(;
            if($("body").hasClass("en")){
                message = 'To place an order, you must enter the name of the recipient. The recipient’s name must be from 2 to 30 characters, in English.';
            }else{
                message = '주문을 위해서 수령자명이 입력되어야 합니다.'+'<br>'+'수령자명은 2-30자 사이 영문만 가능합니다.';
            }
            target = name;

        }else if(re_country.test(oPhoneCountry.val()) != true) { // 수령자 국가번호 검사

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid International phone number. International phone number must not contain +.';
            }else{
                message = '주문을 위해서 국가번호가 입력되어야 합니다.'+'<br>'+'국가번호는 +를 제외한 숫자만 입력해주세요.';
            }
            target = oPhoneCountry;

        }else if(re_tel_global.test(oTel.val()) != true) { // 수령자 연락처 검사
            //oTel.focus(;

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid phone number. Phone numbers must contain only numeric values, when appropriate.';
            }else{
                message = '주문을 위해서 연락처가 입력되어야 합니다.'+'<br>'+'숫자가 포함된 올바른 연락처를 입력해주세요.';
            }
            target = oTel;

        }else if(re_postal.test(postal.val()) != true){
            //postal.focus(;

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid postal code. Select a postal code (five-digit postal code corresponding to the road name address system).';
            }else{
                message = '주문을 위해서 우편번호가 입력되어야 합니다.'+'<br>'+'우편번호를 선택해주세요. (도로명주소 5자리)';
            }
            target = postal;

        }else if($.trim(address.val()) === "" || address.val().length < 2 || address.val().length > 100) { // 주소 검사
            //address.focus(;

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter a valid mailing address. The address must be from 2 to 100 characters long.';
            }else{
                message = '주문을 위해서 주소가 입력되어야 합니다.'+'<br>'+'주소는 2-100자 사이로 작성해주세요.';
            }
            target = address;

        // }else if(re_address.test(address.val()) == true){
        //     //address.focus(;
        //
        //     if($("body").hasClass("en")){
        //         message = 'The address must not contain the following special characters & < > ; ';
        //     }else{
        //         message = '주소는 특수문자 & < > ;를 제외하고 작성해주세요.';
        //     }
        //     target = address;

        }else if($.trim(detail.val()) === "" || detail.val().length < 2 || detail.val().length > 100) { // 상세주소 검사
            //detail.focus(;

            if($("body").hasClass("en")){
                message = 'To place an order, you must enter the full mailing address. The full address must be from 2 to 100 characters long.';
            }else{
                message = '주문을 위해서 상세주소가 입력되어야 합니다.'+'<br>'+'상세주소는 2-100자 사이로 작성해주세요.';
            }
            target = detail;

        }else if(re_address.test(detail.val()) == true){
            //detail.focus(;

            if($("body").hasClass("en")){
                message = 'The full address must not contain the following special characters & < > ;';
            }else{
                message = '상세주소는 특수문자 & < > ;를 제외하고 작성해주세요.';
            }
            target = detail;

        }else if(re_memo.test(memo.val()) == true){
            //memo.focus(;

            if($("body").hasClass("en")){
                message = 'The delivery notes must not contain the following special characters & < > ;';
            }else{
                message = '배송메모는 특수문자 & < > ;를 제외하고 작성해주세요.';
            }
            target = memo;

        }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon1.val()) != true){
            //coupon1.focus(;

            if($("body").hasClass("en")){
                message = 'Please enter the correct coupon code.';
            }else{
                message = '정확한 쿠폰번호를 입력해주세요.';
            }
            target = coupon1;

        }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon2.val()) != true){
            //coupon2.focus(;

            if($("body").hasClass("en")){
                message = 'Please enter the correct coupon code.';
            }else{
                message = '정확한 쿠폰번호를 입력해주세요.';
            }
            target = coupon2;

        }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon3.val()) != true){
            //coupon3.focus(;

            if($("body").hasClass("en")){
                message = 'Please enter the correct coupon code.';
            }else{
                message = '정확한 쿠폰번호를 입력해주세요.';
            }
            target = coupon3;

        }else if($("#checkCoupon").is(":checked") == true && re_coupon.test(coupon4.val()) != true){
            //coupon4.focus(;

            if($("body").hasClass("en")){
                message = 'Please enter the correct coupon code.';
            }else{
                message = '정확한 쿠폰번호를 입력해주세요.';
            }
            target = coupon4;

        }else if(!$(".cont_order .list_pay .inp_g:radio[name=payType]:checked").val()){
            //$(".cont_order .list_pay .inp_g").focus(;

            if($("body").hasClass("en")){
                message = 'Please select a payment method.';
            }else{
                message = '결제수단을 정해주세요.';
            }
            target = $(".cont_order .list_pay .inp_g");

        // }else if($("#checkAgree1").val() != "checkAgree"){
        //     //$("#checkAgree1").focus();
        //
        //     if($("body").hasClass("en")){
        //         message = 'Please agree to our privacy policy to continue.';
        //     }else{
        //         message = '개인정보 수집 및 이용에 동의해주세요.';
        //     }
        //     target = $("#checkAgree1");
        //
        }else if($("#checkAgree2").val() != "checkAgree"){
            //$("#checkAgree2").focus();

            if($("body").hasClass("en")){
                message = '#### 결제대행서비스 동의해주세요. (영문)';
            }else{
                message = '#### 결제대행서비스 동의해주세요. (수정?)';
            }
            target = $("#checkAgree2");

        }else if($("#checkAgree3").val() != "checkAgree"){
            //$("#checkAgree2").focus();

            if($("body").hasClass("en")){
                message = '#### 취소환불규정 동의새주세요.(영문)';
            }else{
                message = '#### 취소환불규정 동의새주세요.(수정)';
            }
            target = $("#checkAgree3");

        }
    }
    $("#oaZoneCode").val(postal.val());
    $("#oaAddr1").val(address.val());

    return message;
}