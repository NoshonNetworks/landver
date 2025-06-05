function InfoCard({
  value,
  description,
  iconBg,
  icon,
}: {
  value?: string;
  description?: string;
  iconBg?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-7 flex-1 rounded-xl bg-white flex items-center gap-x-3">
      <div
        style={{ backgroundColor: iconBg }}
        className={`p-[13px] rounded-full`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-[#090914] font-bold text-xl">{value}</h3>
        <p className="text-[#7E8299] text-xs font-semibold">{description}</p>
      </div>
    </div>
  );
}

export default InfoCard;
