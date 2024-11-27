interface ParagraphProps extends React.PropsWithChildren {
  classname?: string;
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  classname = "",
  size,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "h1":
        return "text-[56px] leading-[61.6px]";
      case "h2":
        return "text-[48px] leading-[52.8px]";
      case "h3":
        return "text-[40px] leading-[44px]";
      case "h4":
        return "text-[32px] leading-[35.2px]";
      case "h5":
        return "text-[24px] leading-[26.4px]";
      case "h6":
        return "text-[20px] leading-[22px]";
      default:
        return "text-xs";
    }
  };

  return <p className={`${getSizeStyles()} ${classname}`}>{children}</p>;
};

export default Paragraph;
