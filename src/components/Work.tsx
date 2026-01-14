import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let timeline: globalThis.GSAPTimeline | null = null;

    const setupScroll = () => {
      const container = document.querySelector(".work-container");
      const flexContainer = document.querySelector(".work-flex");
      if (!container || !flexContainer) return;

      const totalWidth = flexContainer.scrollWidth;
      const visibleWidth = container.clientWidth;
      const scrollDistance = totalWidth - visibleWidth; 

      if (timeline) {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      }
      
      // Force refresh to ensure dimensions are correct
      ScrollTrigger.refresh();

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${scrollDistance + 200}`, // Add buffer
          scrub: 1, // Smooth scrub
          pin: true,
          pinSpacing: true,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: -scrollDistance,
        ease: "none",
      });
    };

    // Initial setup with a small delay to allow loading
    const timer = setTimeout(setupScroll, 100);

    return () => {
      clearTimeout(timer);
      if (timeline) timeline.kill();
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
