


document.addEventListener("DOMContentLoaded", function(e){
    bodyScroll();
    sub01_3_scroll();

})

const sub01_3_scroll = () => {
    const mm = gsap.matchMedia();
  
    if (document.querySelector(".sub01_3 .scrollArti .contentWrap")) {
      gsap.registerPlugin(ScrollTrigger); // ScrollTrigger 사용을 위한 등록
    
      mm.add("(min-width: 950px)", () => {
        gsap.to(".sub01_3 .scrollArti .contentWrap", {
            scrollTrigger: {
              trigger: ".sub01_3 .scrollArti .contentWrap",
              start: "top-=100px top",
              end: "bottom bottom",
              pin: ".sub01_3 .scrollArti .contentWrap", 
              anticipatePin: 1,
              scrub: true,
              markers: false,
            }
        });
        window.addEventListener('resize', () => {
          ScrollTrigger.refresh(); 
        });
      });
    }

    gsap.utils.toArray(".sub01_3 .scrollArti .historyDiv .history_list > li").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 100%",
          end: "bottom 0%",   
          onEnter: () => {
            item.classList.add("on");
            item.classList.remove("up-scroll");  // 내려갈 땐 애니메이션 활성화 클래스 유지
            historyShow(item, "down");
          },
          onLeave: () => {
            item.classList.remove("on");
            item.classList.remove("up-scroll");
          },
          onEnterBack: () => {
            item.classList.add("on");
            item.classList.add("up-scroll"); // 올라갈 땐 애니메이션 제거용 클래스 추가
            historyShow(item, "up");
          },
          onLeaveBack: () => {
            item.classList.remove("on");
            item.classList.remove("up-scroll");
          },
          markers: false, 
        });
    });
      
   
    const historyShow = (item, flag) => {
        const dataType = parseInt($(item).attr('data-type'), 10);
      
        if (!isNaN(dataType)) {
            const historyItems = $(".sub01_3 .scrollArti .contentWrap .year_history > li[data-type]");
            let maxType = 0;
        
            historyItems.each((_, el) => {
                const type = parseInt(el.dataset.type, 10);
                if (!isNaN(type) && type > maxType) maxType = type;
            });
        
            $('.sub01_3 .scrollArti .contentWrap .year_history > li').removeClass('active');
            $(`.sub01_3 .scrollArti .contentWrap .year_history > li[data-type="${dataType}"]`).addClass('active');
        
            const yearHeight = $('.sub01_3 .scrollArti .contentWrap .year_list > li').outerHeight();
        
            let activeIndex = -1;
            historyItems.each((index, el) => {
            if (parseInt(el.dataset.type, 10) === dataType) activeIndex = index;
            });
        
            if (activeIndex === -1) {
            $('.sub01_3 .scrollArti .contentWrap .year_list > li').css('transform', 'translateY(0)');
            return;
            }
        
            if (flag === "down") {
                const moveY = activeIndex * yearHeight;
        
                $('.sub01_3 .scrollArti .contentWrap .year_list > li').css('transform', `translateY(${-moveY}px)`);
            } else {
                $('.sub01_3 .scrollArti .contentWrap .year_list > li').css('transform', 'translateY(0)');
            }
        }
    };
      
      
      
      
};

const bodyScroll = () => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,         // ← 숫자 높을수록 감속이 강해짐
        effects: true,        // 패럴럭스 같은 ScrollTrigger 효과 활성화
        ease: "power4.out", // 더 강한 감속 (추천)
        autoKill: false // 스크롤 중단 방지
    });
}