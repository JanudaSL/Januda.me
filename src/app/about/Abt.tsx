import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
});

export default function OriginStory() {
  return (
    <section
      className={`${poppins.variable} font-[family-name:var(--font-poppins)] w-full bg-gray-100 px-6 py-20`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 md:grid-cols-2">
        <h2 className="text-5xl font-light text-black sm:text-6xl">
          Origin story
        </h2>

        <div>
          <p className="text-lg leading-relaxed text-black">
            My mission is to build reliable IoT, software, and AI systems
            for the world&apos;s most important decisions. I design
            connected devices, robust software, and intelligent AI systems
            that help teams build, deploy, and manage technology that
            delivers real impact.
          </p>

          
        </div>
      </div>
    </section>
  );
}