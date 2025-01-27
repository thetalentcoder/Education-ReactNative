import { useState } from 'react';
import groupBy from 'lodash/groupBy';
import ReactSelect from 'react-select';

import { Exam } from 'api/exams/types';

import reactSelectStylesConfig from 'lib/react-select';
import { Modal } from 'components/ui/Modal';
import { useAuthStore } from 'store/auth';

interface Props {
  exam: Exam;
  onClose: () => void;
}

export const StudentAttemptBreakdownModal = ({ exam, onClose }: Props) => {
  const [selectedAttempt, setSelectedAttempt] = useState<{ label: string; value: any } | null>(null);

  const { user } = useAuthStore();

  const takenExam = undefined;

  const grouped = Object.entries(groupBy(selectedAttempt?.value.answers || [], 'section')).map(([key, value]) => ({
    section: key,
    totalQuestions: value.length,
    answeredQuestions: value.filter((el) => el.isCorrect).length
  }));

  return (
    <Modal
      title={`${exam.name} Breakdown`}
      onClose={onClose}
      boxClassName="w-full md:w-[500px]"
      contentClassName="overflow-y-auto min-h-[400px] h-[calc(100%-69px)]"
    >
      <ReactSelect
        styles={reactSelectStylesConfig}
        placeholder="Select Attempt"
        options={[]}
        value={selectedAttempt}
        onChange={(e: any) => {
          setSelectedAttempt(e);
        }}
      />

      <div className="mt-10">
        <div className="flex flex-col gap-3">
          {grouped.map((item) => {
            return (
              <div key={item.section}>
                <p>
                  <span className="font-medium">
                    {item.section} {`-->`}{' '}
                  </span>
                  <span className="font-medium">Answered Questions:</span>{' '}
                  <span className="text-danger">{item.answeredQuestions}</span> / {item.totalQuestions}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
