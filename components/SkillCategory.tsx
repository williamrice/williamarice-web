import { Skill } from "@/lib/types";

export const SkillCategory = ({
  title,
  skills,
}: {
  title: string;
  skills: Skill[];
}) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-700">
      <div className="bg-blue-800 text-white text-center py-3">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="p-6 grid grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center p-2 hover:scale-110 transition-transform duration-300"
          >
            <i className={`${skill.iconClass} text-4xl mb-2`}></i>
            <p className="text-sm text-gray-300 text-center">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
