import { Code2, Layers, Bug, Calendar, Link } from 'lucide-react';

export default function ServicesShowcase() {
  const services = [
    {
      id: "01",
      title: "Software Development",
      description: "Writing, testing, and maintaining code for applications, systems, and software solutions. This includes front-end (client-side) and back-end (server-side) development.",
      icon: Code2,
      color: "text-blue-600"
    },
    {
      id: "02", 
      title: "Software Design and Architecture",
      description: "Planning and structuring software systems to ensure they are scalable, efficient, and maintainable. This involves creating blueprints, selecting appropriate technologies, and establishing coding standards.",
      icon: Layers,
      color: "text-purple-600"
    },
    {
      id: "03",
      title: "Problem Solving and Debugging", 
      description: "Identifying, diagnosing, and fixing bugs or issues in software. This requires strong analytical skills and the ability to work through complex problems methodically.",
      icon: Bug,
      color: "text-green-600"
    },
    {
      id: "04",
      title: "Project Management",
      description: "Overseeing software development projects, including planning, tracking progress, and coordinating with other team members. This might involve Agile methodologies like Scrum or Kanban.",
      icon: Calendar,
      color: "text-orange-600"
    },
    {
      id: "06",
      title: "System Integration",
      description: "Ensuring different software systems and applications work together seamlessly. This can include API development and integration, as well as working with third-party services.",
      icon: Link,
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">What I Offer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            What I think I'm good at...
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Service Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-mono text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                    {service.id}
                  </span>
                  <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors ${service.color}`}>
                    <IconComponent size={24} />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.color.replace('text', 'from')}-400 to-transparent transition-all duration-300 rounded-full`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
            <span className="mr-2">Ready to collaborate?</span>
            <Code2 size={16} className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}