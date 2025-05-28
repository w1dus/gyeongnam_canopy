


document.addEventListener("DOMContentLoaded", function(e){
    bodyScroll();
})
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