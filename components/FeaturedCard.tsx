export const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col p-4 bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-blue-900 p-3 rounded-full text-blue-400 shrink-0">
          {icon}
        </div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
      </div>
      <p className="text-gray-300 text-left">{description}</p>
    </div>
  );
};
