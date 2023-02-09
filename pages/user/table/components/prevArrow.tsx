interface PrevArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: any;
  style?: any;
}

const PrevArrow = ({ className, style, onClick }: PrevArrowProps) => {
  return (
    <div
      className={className}
      style={{ ...style, left: '10px', zIndex: 1 }}
      onClick={onClick}
    />
  );
};
export default PrevArrow;
