import Image from 'next/image';

export default function AboutSysco() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-22 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              About Januda
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Januda is a passionate and aspiring software engineer dedicated to building innovative and impactful digital solutions. With a strong foundation in full-stack development, cloud technologies, and IoT systems, he focuses on creating applications that blend functionality with user-friendly design. His portfolio spans web applications, mobile apps, and IoT integrations that address real-world challenges across education, safety, and automation.

Alongside his technical expertise, Januda brings commitment, adaptability, and a drive for continuous learning. Having completed industry-recognized certifications and practical projects, he is prepared to contribute meaningfully to modern software teams. With a vision of growth and excellence, Januda is determined to deliver solutions that make a difference while advancing in his professional journey.
            </p>

            
          </div>

          {/* Right Image */}
          <div className="relative">

              <Image
                src="/imjage3.jpg"
                alt="Sysco delivery trucks"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>

    </section>
  );
}