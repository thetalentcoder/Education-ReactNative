import _ from 'lodash';

export const isActiveClass = (isTrushy: boolean, activeClass: string) => (isTrushy ? activeClass : '');

export const searchByKeys = (searchKeys: string[], data: any[], value: string) =>
  _.filter(data, (item) => _.some(searchKeys, (field) => _.includes(_.toLower(_.get(item, field)), _.toLower(value))));

export const formatTimer = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

export const checkboxProps = (
  id: string,
  selected: string[],
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
) => ({
  isChecked: selected.includes(id),
  onToggle: () => {
    setSelected((p) => (p.includes(id) ? p.filter((prevID) => prevID !== id) : [...p, id]));
  }
});
