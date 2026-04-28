import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function MacbookScrollDemo({ src }) {
  return (
    <section className="problems dark-section macbook-mobile-hide">
      <div className="container pb-4">
        <MacbookScroll
          title={
            <span className="text-[#F8F7F3]">
              Проектирование съедает время, деньги и скорость вывода продукта
            </span>
          }
          src={src}
          showGradient={false}
        />
      </div>
    </section>
  );
}

