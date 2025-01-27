import { SingleQuestionAnalytics } from 'api/analytics/types';
import { TableColumn } from 'types/table';
import { Modal } from '../../ui/Modal';
import Table from '../../ui/Table';

interface Props {
  data: SingleQuestionAnalytics;
  onClose: () => void;
}

export const QuestionAnalytics = ({ data, onClose }: Props) => {
  const columns: TableColumn[] = [
    {
      key: 'total',
      name: 'Total Answered',
      align: 'center',
      cell: (el) => el.statistics.totalAnswered
    },
    {
      key: 'correct',
      name: 'Correct',
      align: 'center',
      cell: (el) => el.statistics.totalCorrect
    },
    {
      key: 'wrong',
      name: 'Incorrect',
      align: 'center',
      cell: (el) => el.statistics.totalAnswered - el.statistics.totalCorrect
    }
  ];

  return (
    <Modal title="Question Analytics" onClose={onClose} boxClassName="w-[400px]">
      <Table isLoading={false} data={[data]} columns={columns} className="questionAnalyticsTable" />
    </Modal>
  );
};
