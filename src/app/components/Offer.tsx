import type { Metadata } from 'next';
import { Code2, Layers, Bug, Calendar, Link, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Software Development Services | What I Offer',
  description: 'Expert software development services including front-end & back-end development, software architecture, debugging, project management, and system integration.',
  keywords: [
    'Januda',
    'Januda J Kodithuwakku',
    'Januda Janandith',
    'software development',
    'software architecture',
    'debugging',
    'project management',
    'system integration',
    'API development',
    'full stack developer',
  ],
  openGraph: {
    title: 'Software Development Services | What I Offer',
    description: 'Expert software development services including front-end & back-end development, software architecture, debugging, project management, and system integration.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Development Services | What I Offer',
    description: 'Expert software development services including front-end & back-end development, software architecture, debugging, project management, and system integration.',
  },
};

const services = [
  {
    id: "01",
    title: "Software Development",
    description: "Writing, testing, and maintaining code for applications, systems, and software solutions. This includes front-end (client-side) and back-end (server-side) development.",
    icon: Code2,
    ariaLabel: "Software Development service",
  },
  {
    id: "02",
    title: "Software Design and Architecture",
    description: "Planning and structuring software systems to ensure they are scalable, efficient, and maintainable. This involves creating blueprints, selecting appropriate technologies, and establishing coding standards.",
    icon: Layers,
    ariaLabel: "Software Design and Architecture service",
  },
  {
    id: "03",
    title: "Problem Solving and Debugging",
    description: "Identifying, diagnosing, and fixing bugs or issues in software. This requires strong analytical skills and the ability to work through complex problems methodically.",
    icon: Bug,
    ariaLabel: "Problem Solving and Debugging service",
  },
  {
    id: "04",
    title: "Project Management",
    description: "Overseeing software development projects, including planning, tracking progress, and coordinating with other team members. This might involve Agile methodologies like Scrum or Kanban.",
    icon: Calendar,
    ariaLabel: "Project Management service",
  },
  {
    id: "06",
    title: "System Integration",
    description: "Ensuring different software systems and applications work together seamlessly. This can include API development and integration, as well as working with third-party services.",
    icon: Link,
    ariaLabel: "System Integration service",
  },
];

export default function ServicesShowcase() {
  return (
    <section
      aria-labelledby="services-heading"
      className="min-h-screen bg-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="text-center mb-10 sm:mb-16">
          <h1
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            What I Offer
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            What I think I&apos;m good at...
          </p>
        </header>

        {/* Services Grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 list-none p-0 m-0"
          role="list"
          aria-label="List of services offered"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <li
                key={service.id}
                aria-label={service.ariaLabel}
                className="group relative z-0 hover:z-10 bg-white border border-gray-200 p-5 sm:p-6 min-h-[190px] sm:min-h-[220px] flex flex-col justify-between overflow-hidden transition-colors duration-200 ease-out hover:bg-[#f4f4f4]"
              >
                {/* Top accent line - slides in from left on hover */}
                <span
                  className="absolute top-0 left-0 h-[3px] w-full bg-blue-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                  aria-hidden="true"
                />
                {/* Title */}
                <div>
                  <h2 className="text-base sm:text-lg font-normal text-gray-900 mb-3">
                    {service.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed sm:opacity-0 sm:max-h-0 sm:group-hover:opacity-100 sm:group-hover:max-h-32 transition-all duration-300 ease-out">
                    {service.description}
                  </p>
                </div>

                {/* Bottom row: icon left, arrow right */}
                <div className="flex items-end justify-between mt-4">
                  <div className="text-gray-900" aria-hidden="true">
                    <IconComponent size={28} strokeWidth={1} className="sm:w-8 sm:h-8" />
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-blue-600 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label='Go to contact page to start collaborating'
          >
            <span className="mr-2">Ready to collaborate?</span>
            <Code2 size={16} className="text-blue-600" aria-hidden="true" />
          </a>
        </div>

      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Software Development Services",
            "description": "A list of professional software development services offered.",
            "itemListElement": services.map((service, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": service.title,
              "description": service.description,
            })),
          }),
        }}
      />
    </section>
  );
}