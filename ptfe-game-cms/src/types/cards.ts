export interface CardProps {
  item: any;
  activeOption: string;
  setActiveOption: React.Dispatch<React.SetStateAction<string>>;
  options: { text: string; onClick: (id: any) => void; visible?: boolean }[];
}
