interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: any;
  style?: any;
}

const NextArrow = ({ onClick, style, className }: NextArrowProps) => {
  return (
    <div
      className={className}
      style={{ ...style, right: '30px' }}
      onClick={onClick}
    />
  );
};

export default NextArrow;
