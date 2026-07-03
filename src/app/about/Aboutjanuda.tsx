"use client";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

export default function AboutVideo() {
  return (
    <section
      className={`${poppins.variable} font-[family-name:var(--font-poppins)] w-full bg-white px-6 py-20`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-2xl font-light leading-relaxed text-black sm:text-3xl">
            Building modern software solutions with a focus on clean
            architecture, performance, and real-world impact.
          </p>
        </div>

        <div
          className="w-full overflow-hidden rounded-xl select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <video
            src="/ai.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            controlsList="nodownload noremoteplayback noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="h-full w-full object-cover pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}