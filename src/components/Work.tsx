import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    const setTranslateX = () => {
      const boxes = document.querySelectorAll(".work-box");
      if (boxes.length === 0) return 0;
      
      const container = document.querySelector(".work-container");
      if (!container) return 0;

      const rectLeft = container.getBoundingClientRect().left;
      const boxWidth = boxes[0].getBoundingClientRect().width;
      const parentWidth = boxes[0].parentElement!.getBoundingClientRect().width;
      const style = window.getComputedStyle(boxes[0]);
      const padding = parseInt(style.padding) / 2;
      
      return (boxWidth * boxes.length) - (rectLeft + parentWidth) + padding;
    };

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${setTranslateX()}`, 
        scrub: true,
        pin: true,
        pinSpacing: true, // Explicitly ensure space is reserved
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -setTranslateX(),
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[...Array(6)].map((_value, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>Project Name</h4>
                    <p>Category</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>Javascript, TypeScript, React, Threejs</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
