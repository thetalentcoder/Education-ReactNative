import { ExamsCategory } from 'api/exams/types';
import { CardProps } from 'types/cards';

import { CardListItem } from 'components/ui/CardListItem';
import { CardMenu } from 'components/ui/CardMenu';
import { LuClipboardList } from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface Props extends Omit<CardProps, 'item'> {
  item: ExamsCategory;
}

export const ExamCategoryCard = ({ item, activeOption, setActiveOption, options }: Props) => (
  <div key={item._id} className="card">
    <CardMenu item={item} activeOption={activeOption} setActiveOption={setActiveOption} options={options} />
    <div className="flex items-center text-center flex-col pt-10 mb-3">
      <p className="text-[13px] font-medium capitalize">{item.name}</p>
    </div>
    <ul className="grid gap-3 w-full grid-cols-1">
      <Link to={`/exams?category=${item._id}`}>
        <CardListItem icon={<LuClipboardList />} text={`Number of exams: ${item.totalExams}`} />
      </Link>
    </ul>
  </div>
);
