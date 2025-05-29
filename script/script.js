

document.addEventListener("DOMContentLoaded", function(e){

    rightSlideMenu();
    mainBanner(); 
    mainExampleTabHandler();
    mainLogoSlide();
    subMenuToggle();
})

const subMenuToggle = () => {
    $('.sub .subMenuListSec .listDiv .nowItemWrap').click(function(){
        $('.sub .subMenuListSec .listDiv .nowItemWrap').not(this).find('.menuListBig').slideUp();
        $('.sub .subMenuListSec .listDiv .nowItemWrap').not(this).removeClass('show')
        $(this).toggleClass('show');
        $(this).find('.menuListBig').slideToggle('');
    })

      // 영역 외 클릭 시 메뉴 닫기
    $(document).click(function(e) {
        // 클릭한 요소가 메뉴 영역 내부에 있는지 확인
        if (!$(e.target).closest('.sub .subMenuListSec .listDiv .nowItemWrap').length) {
            $('.sub .subMenuListSec .listDiv .nowItemWrap .menuListBig').slideUp();
            $('.sub .subMenuListSec .listDiv .nowItemWrap').removeClass('show');
        }
    });
}

const mainLogoSlide = () => {
    // 01. 가로로 무한으로 흐르는 슬라이드 
    // GSAP 애니메이션
    gsap.to("#fullpage .logoSlideSec .logoSlideBox .logoList > li", {
        xPercent: -1000,
        ease: "none",
        duration: 30,
        repeat: -1,
        modifiers: {
            yPercent: gsap.utils.wrap(-100, 0)
        }
    });
}


const mainExampleTabHandler = () =>{
    var swiper = new Swiper("#fullpage .exampleSec .mySwiper", {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
            950: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
        },
      });

      $('#fullpage .exampleSec .tabList .item').click(function(){
        const clickIndex = $(this).parent('li').index();
        $('#fullpage .exampleSec .tabList .item').removeClass('active')
        $('#fullpage .exampleSec .tabList .item').parent('li').eq(clickIndex).find('.item').addClass('active');
        $('#fullpage .exampleSec .tabContentList > li').removeClass('active');
        $('#fullpage .exampleSec .tabContentList > li').eq(clickIndex).addClass('active');
        $('#fullpage .exampleSec .tabContentList.mo > li').eq(clickIndex).addClass('active');
        if (swiper && typeof swiper.update === 'function') { swiper.update(); }
    })
}

const mainBanner = () => {
    var swiper = new Swiper("#fullpage .bannerSec .mySwiper", {
        loop : true,
        effect: "fade",
        pagination: {
          el: "#fullpage .bannerSec .swiper-pagination",
          clickable: true, 
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
    });
}

const rightSlideMenu = () => {
    $('header .menuBtn').click(function(){
        $(this).toggleClass('on')
        $('.closeSec').toggleClass('show')
        $('.slideMenuSec').toggleClass('show')
    })

    $('.closeSec').click(function(){
        $('.closeSec').removeClass('show')
        $('.slideMenuSec').removeClass('show')
        $('header .menuBtn').removeClass('on')
    })

    $('.slideMenuSec').click(function(e){
        e.stopPropagation();
    })

    $('.slideMenuSec .menuList .item').click(function(){

        $('.slideMenuSec .menuList .item').not(this).closest('li').find('.rightSubMenuList').slideUp();
        $('.slideMenuSec .menuList .item').not(this).removeClass('on');
        $(this).toggleClass('on')
        $(this).closest('li').find('.rightSubMenuList').slideToggle();
    })

    $('header .menuList .item').mouseenter(function () {
        $('.subMenuList').stop(true, true).slideUp();
        $(this).closest('li').children('.subMenuList').stop(true, true).slideDown();
    });

    $('header').on('mouseleave', function(){
        $('.subMenuList').stop(true, true).slideUp();
    });

    
}
