import { FileWarning, Map, Building2, AlertCircle } from "lucide-react";

export default function CitizenDashboard() {

  const projects = [
    {
      name: "Road Construction - Dahisar",
      budget: "₹2.4 Cr",
      status: "In Progress"
    },
    {
      name: "Government Hospital Renovation",
      budget: "₹8.1 Cr",
      status: "Delayed"
    },
    {
      name: "Public School Infrastructure",
      budget: "₹3.6 Cr",
      status: "Completed"
    }
  ];

  return (
    <div className="space-y-6 p-6">

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Citizen Transparency Dashboard
        </h2>
        <p className="text-slate-500">
          Track public projects & report anomalies
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <ActionCard
          icon={FileWarning}
          title="Report Corruption"
          description="Submit complaint about suspicious public spending"
          color="red"
        />

        <ActionCard
          icon={Map}
          title="Track Local Projects"
          description="View infrastructure projects near you"
          color="blue"
        />

        <ActionCard
          icon={AlertCircle}
          title="Raise Concern"
          description="Report incomplete government work"
          color="orange"
        />

      </div>

      {/* Projects */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

        <h3 className="text-lg font-semibold mb-4">
          Local Government Projects
        </h3>

        <div className="space-y-4">

          {projects.map((project, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3"
            >

              <div>
                <p className="font-medium text-slate-800">{project.name}</p>
                <p className="text-sm text-slate-500">
                  Budget: {project.budget}
                </p>
              </div>

              <span className="text-sm bg-slate-100 px-3 py-1 rounded-full">
                {project.status}
              </span>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description, color }: any) {

  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-600"
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

      <div className={`p-3 rounded-lg w-fit mb-4 ${colorMap[color]}`}>
        <Icon className="w-6 h-6"/>
      </div>

      <h4 className="font-semibold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500">{description}</p>

    </div>
  );
}