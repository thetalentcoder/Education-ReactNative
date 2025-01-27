interface Props {
  className: string;
}

export const CardSkeleton = ({ className }: Props) => (
  <div className="cardsWrapper">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className={`card ${className}`} />
    ))}
  </div>
);
