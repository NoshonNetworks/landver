interface ParagraphProps extends React.PropsWithChildren {
  classname?: string;
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "xl" | "lg" | "rg" | "sm" | "xs";
  weight?: "bold" | "medium" | "semibold";
  align?: "left" | "center" | "right";
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  classname = "",
  size,
  weight,
  align,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "h1":
        return "text-[56px]/[61.6px]";
      case "h2":
        return "text-[48px]/[52.8px]";
      case "h3":
        return "text-[40px]/[44px]";
      case "h4":
        return "text-[32px]/[35.2px]";
      case "h5":
        return "text-2xl/[26.4px]";
      case "h6":
        return "text-xl/[22px]";
      case "xl":
        return "text-xl/[28px]";
      case "lg":
        return "text-lg/[25.2px]";
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm/[19.6px]"
      default:
        return "text-base/[22.4px]";
    }
  };

  const getWeightStyles = () => {
    switch (weight) {
      case "bold":
        return "font-bold";
      case "medium": 
        return "font-medium";
      case "semibold":
        return "font-semibold";
      default:
        return "";
    }
  };

  const getTextAlign = () => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left"
    }
  }

  return <p className={`${getSizeStyles()} ${getWeightStyles()} ${getTextAlign()} ${classname}`}>{children}</p>;
};

export default Paragraph;
