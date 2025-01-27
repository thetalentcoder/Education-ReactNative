interface Props {
  icon: React.ReactNode;
  text: React.ReactNode;
  isPrimary?: boolean;
}

export const CardListItem = ({ icon, text, isPrimary }: Props) => (
  <li className="grid items-center gap-2 font-medium text-xs" style={{ gridTemplateColumns: 'auto 1fr' }}>
    <span
      className={`w-8 h-8 rounded-xl flex items-center justify-center text-[18px] ${
        isPrimary ? 'bg-primary bg-opacity-40 text-light-100' : 'bg-secondary'
      }`}
    >
      {icon}
    </span>
    <span className="slicedText">{text}</span>
  </li>
);
