import { useQuery } from 'react-query';

import { Exam } from 'api/exams/types';

// import { GeneralDetails } from 'components/shared/examDetails/general/GeneralDetails';
// import { fetchExamGeneralInfo } from 'api/analytics';
import { Modal } from 'components/ui/Modal';

interface Props {
  exam: Exam;
  onClose: () => void;
}

export const StudentBreakdownModal = ({ exam, onClose }: Props) => {
  // const { data } = useQuery(['exam-genral-info', exam._id], () => fetchExamGeneralInfo(exam._id));

  return (
    <Modal
      title={`${exam.name} Breakdown`}
      onClose={onClose}
      boxClassName="w-full md:w-[1000px]"
      contentClassName="overflow-y-auto h-[calc(100%-69px)]"
    >
      <p className="font-medim text-md">
        Track: <span className="ml-3">{exam.category.name}</span>
      </p>
      {/* <div className="my-3 flex items-start gap-3">
        <p className="font-medim text-md">Types:</p>
        <ul className="paper border border-secondary w-[400px]">
          <li className="flex items-center justify-between border-b border-secondary text-sm p-3">
            Text <span className="text-secondary">{data?.examQuestionsByContentType.text || 0}</span>
          </li>
          <li className="flex items-center justify-between border-b border-secondary text-sm p-3">
            Images <span className="text-secondary">{data?.examQuestionsByContentType.image || 0}</span>
          </li>
          <li className="flex items-center justify-between text-sm p-3">
            Videos <span className="text-secondary">{data?.examQuestionsByContentType.video || 0}</span>
          </li>
        </ul>
      </div>
      <p className="font-medim text-md">Categories:</p>
      {data ? <GeneralDetails data={data} /> : <p className="text-center py-4">Please wait...</p>} */}
    </Modal>
  );
};
