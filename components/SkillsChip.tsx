export const SkillsChip = ({
  label,
  color,
}: {
  label: string;
  color: string;
}) => {
  return (
    <div
      className={`${color} font-jetbrains text-[10px] font-medium px-3 py-1 h-auto rounded-md`}
    >
      {label}
    </div>
  );
};
