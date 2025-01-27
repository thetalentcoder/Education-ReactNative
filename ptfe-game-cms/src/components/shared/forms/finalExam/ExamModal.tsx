/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import {
  AiFillHeart,
  AiOutlineClose,
  AiOutlineFileText,
  AiOutlineHeart,
  AiOutlinePauseCircle,
  AiOutlinePlayCircle,
  AiOutlineSave
} from 'react-icons/ai';
import { GoChevronLeft, GoChevronRight, GoStopwatch } from 'react-icons/go';
import { LuClipboardList } from 'react-icons/lu';
import { PiStudentFill } from 'react-icons/pi';
import { FiFlag } from 'react-icons/fi';

import {
  EXAM_TIME_TYPE,
  Exam,
  ExamInProgressResponse,
  SaveExamProgressPayload,
  SubmitExamRequest
} from 'api/exams/types';

import { ConfirmModal } from 'components/shared/modals/ConfirmModal';
import { deleteSavedQuestion, saveQuestion } from 'api/question';
// import { TimingMethodModal } from './TimingMethodModal';
// import { ReportIssueModal } from '../ReportIssueModal';
import { RadioInput } from 'components/ui/RadioInput';
import { formatTimer, isActiveClass } from 'utils';
import { Modal } from 'components/ui/Modal';
import { useAuthStore } from 'store/auth';
import { saveExamProgress, submitExam } from 'api/exams';
import { reactQueryConfig } from 'lib/react-query';

interface Props {
  exam: Exam;
  examInProgress?: ExamInProgressResponse;
  onClose: () => void;
  refetchExams: () => void;
}

export const ExamModal = ({ exam, examInProgress, refetchExams, onClose }: Props) => {
  const timerRef: any = useRef(null);

  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { mutate: saveProgress } = useMutation(saveExamProgress);
  const { mutate, isLoading } = useMutation(submitExam);
  const { mutate: saveQuestionMutation } = useMutation(saveQuestion);
  const { mutate: deleteSavedQuestionMutation } = useMutation(deleteSavedQuestion);

  const [sectionTimes, setSectionTimes] = useState<number[]>(exam.sections.map((section) => section.duration * 60));
  const [underlinedQuestions, setUnderlinedQuestions] = useState<string[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [questionForReport, setQuestionForReport] = useState<string>('');
  const [stopwatch, setStopwatch] = useState({ running: false, time: 0 });
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [hasTimer, setHasTimer] = useState(true);
  const [payload, setPayload] = useState<SubmitExamRequest>({
    examId: exam._id,
    answers: []
  });
  const [timeType, setTimeType] = useState(examInProgress?.time?.[0]?.timeType);
  const [isOpenTimeDialog, setIsOpenTimeDialog] = useState(true);
  const [saveExamPayload, setSaveExamPayload] = useState<SaveExamProgressPayload>({
    examId: exam._id,
    answers:
      examInProgress?.answers.map(({ answerId, questionId, answer }) => ({
        answerId,
        questionId,
        answer
      })) || [],
    time: examInProgress?.time || []
  });
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [isOpenSubmitSectionDialog, setIsOpenSubmitSectionDialog] = useState(false);

  const section = exam.sections[activeSection];
  const question = section.questions[activeQuestion];
  const isLastQuestion = activeSection === exam.sections.length - 1 && activeQuestion === section.questions.length - 1;
  const isLastQuestionInSection =
    activeQuestion === section.questions.length - 1 && activeSection !== exam.sections.length - 1;

  const onSubmit = useCallback(
    () =>
      mutate(payload, {
        onSuccess: () => {
          refetchExams();
          navigate(`/student-reports/${user?._id}?examID=${exam._id}&results=true`);
        }
      }),
    [user?._id, exam._id, payload, navigate, refetchExams, mutate]
  );

  const handleNextQuestion = useCallback(() => {
    if (activeQuestion < section.questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
      return;
    }

    if (activeSection < exam.sections.length - 1) {
      setActiveSection(activeSection + 1);
      setActiveQuestion(0);
      return;
    }

    if (activeQuestion === section.questions.length - 1 && activeSection === exam.sections.length - 1) onSubmit();
  }, [activeQuestion, activeSection, section, exam, setActiveSection, setActiveQuestion, onSubmit]);

  const handlePreviousQuestion = () => {
    if (activeQuestion === 0 && sectionTimes[activeSection - 1] === 0) return;
    if (activeQuestion > 0) setActiveQuestion(activeQuestion - 1);
    else if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      setActiveQuestion(exam.sections[activeSection - 1].questions.length - 1);
    }
  };

  const handleAnswerChange = (answer: { _id: string; answer: string; correct: boolean }) => {
    const newPayload = { ...payload };
    let newSavePayload = { ...saveExamPayload };
    const questionIndex = newPayload.answers.findIndex((answer) => {
      if (answer && answer.questionId) return answer.questionId === question._id;
      return false;
    });

    if (questionIndex === -1) {
      newPayload.answers.push({ questionId: question._id, answer: answer.answer });
      newSavePayload.answers.push({ questionId: question._id, answer: answer.answer, answerId: answer._id });
    } else {
      newPayload.answers[questionIndex].answer = answer.answer;
      newSavePayload.answers[questionIndex] = {
        ...newSavePayload.answers[questionIndex],
        questionId: question._id,
        answer: answer.answer,
        answerId: answer._id
      };
    }
    setPayload(newPayload);
    setSaveExamPayload(newSavePayload);
    saveProgress(saveExamPayload);
  };

  const onToggleUnderline = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, answer: string) => {
    e.stopPropagation();

    if (underlinedQuestions.includes(answer)) {
      setUnderlinedQuestions(underlinedQuestions.filter((item) => item !== answer));
    } else {
      setUnderlinedQuestions([...underlinedQuestions, answer]);
    }
  };

  const startClock = () => {
    const interval = setInterval(() => {
      setSectionTimes((prev) => {
        const newTimes = [...prev];
        if (newTimes[activeSection] === 0) {
          clearInterval(interval);
          if (activeSection === exam.sections.length - 1) {
            onSubmit();
          } else {
            setActiveSection(activeSection + 1);
            setActiveQuestion(0);
          }
        } else newTimes[activeSection] -= 1;

        return newTimes;
      });
    }, 1000);

    setIntervalId(interval);
    return interval;
  };

  useEffect(() => {
    if (isPaused && !hasTimer && timeType !== EXAM_TIME_TYPE.UNLIMITED) {
      setIsPaused(false);
      setHasTimer(true);
    }
  }, [section]);

  useEffect(() => {
    if (examInProgress?.time.length) {
      const isUnlimited = examInProgress?.time[0]?.timeType === EXAM_TIME_TYPE.UNLIMITED;

      if (isUnlimited) {
        const biggestTimeElapsed = examInProgress.time.reduce((prev, current) =>
          prev.timeElapsed > current.timeElapsed ? prev : current
        ).timeElapsed;

        setHasTimer(false);
        setStopwatch((p) => ({ ...p, time: biggestTimeElapsed }));
      } else
        setSectionTimes(
          exam.sections.map(({ name, duration }) => {
            const index = examInProgress?.time.findIndex((time) => time.sectionName === name);
            return index >= 0 ? examInProgress?.time[index]?.timeElapsed || 0 : duration * 60;
          })
        );
    }
  }, [examInProgress]);

  useEffect(() => {
    const isIn = saveExamPayload.time.some(({ sectionName }) => sectionName === section.name);
    const timeElapsed = stopwatch?.time || sectionTimes[activeSection];

    if (timeType) {
      if (isIn) {
        const isUnlimited = saveExamPayload?.time.some(({ timeType }) => timeType === EXAM_TIME_TYPE.UNLIMITED);

        setSaveExamPayload((p) => ({
          ...p,
          time: p.time.map((temp) =>
            temp.sectionName === section.name || isUnlimited ? { ...temp, timeElapsed } : temp
          )
        }));
      } else {
        setSaveExamPayload((p) => ({
          ...p,
          time: [...p.time, { sectionName: section.name, timeElapsed, timeType }]
        }));
      }
    }
  }, [timeType, section, stopwatch.time, sectionTimes[activeSection]]);

  useEffect(() => {
    if (examInProgress && exam) {
      const sectionInProgressName = examInProgress.answers[examInProgress.answers.length - 1]?.section;
      const questionInProgressId = examInProgress.answers[examInProgress.answers.length - 1]?.questionId;

      const sectionInProgressIndex = exam.sections.findIndex((section) => section.name === sectionInProgressName);
      setActiveSection(sectionInProgressIndex);

      const questionInProgressIndex = exam.sections[sectionInProgressIndex].questions.findIndex(
        ({ _id }) => _id === questionInProgressId
      );
      setActiveQuestion(questionInProgressIndex);
    }

    return () => {
      reactQueryConfig.refetchQueries(['me']);
    };
  }, [examInProgress, exam]);

  useEffect(() => {
    const res: SubmitExamRequest['answers'] = [];
    exam.sections.forEach((section) => {
      section.questions.forEach((question) => {
        const inProgressAnswer = examInProgress?.answers.find((answer) => answer.questionId === question._id)?.answer;
        res.push({ questionId: question._id, answer: inProgressAnswer || '' });
      });
    });

    setPayload({ examId: exam._id, answers: res });
  }, [exam]);

  useEffect(() => {
    const isIn = saveExamPayload.answers.some((answer) => {
      if (answer && answer.questionId) return answer.questionId === question._id;
      return false;
    });
    if (!isIn)
      setSaveExamPayload((p) => ({
        ...p,
        answers: [...p.answers, { questionId: question._id, answer: '', answerId: '' }]
      }));
  }, [question]);

  useEffect(() => {
    if (!hasTimer) return;

    if (isPaused) {
      clearInterval(intervalId!);
      setIntervalId(null);
      setIsPaused(true);
    } else startClock();

    return () => clearInterval(intervalId!);
  }, [activeSection, isPaused, hasTimer]);

  const startStopwatch = () => {
    const { running, time } = stopwatch;

    if (running) clearInterval(timerRef.current);
    else {
      timerRef.current = setInterval(() => {
        setStopwatch((p) => ({ ...p, time: p.time + 1 }));
      }, 1000);
    }

    setStopwatch({ running: !running, time });
  };

  useEffect(() => {
    if (!hasTimer) startStopwatch();
  }, [hasTimer]);

  return (
    <>
      <Modal
        title={exam.name}
        onClose={onClose}
        wrapperClassName="!p-0"
        boxClassName="w-screen h-screen max-h-screen !rounded-none overflow-y-scroll pb-20"
        hasBackButton={false}
      >
        <div className="relative w-full lg:w-1/2 mx-auto h-[calc(100vh-170px)] md:h-auto overflow-y-auto md:overflow-y-visible">
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-3 border-dotted border-b border-tertiary pb-5">
            <div className="flex items-center gap-2">
              <PiStudentFill className="w-12 h-12 text-danger" />
              <div>
                <p className="text-base font-medium">
                  Exam Simulator: <span className="text-danger">{exam.name}</span>
                </p>
                <p className="text-sm">
                  <span className="text-danger">{section.name}</span> · Question{' '}
                  <span className="text-danger">{(activeQuestion + 1).toString().padStart(2, '0')}</span> of{' '}
                  {section.questions.length.toString().padStart(2, '0')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <GoStopwatch className="w-10 h-10" />
              {hasTimer ? (
                <span className="text-md text-black font-semibold">{formatTimer(sectionTimes[activeSection])}</span>
              ) : (
                <span className="text-md text-black font-semibold">{formatTimer(stopwatch.time)}</span>
              )}
            </div>

            {hasTimer && (
              <div className="absolute right-[-65px] cursor-pointer">
                {intervalId ? (
                  <AiOutlinePauseCircle onClick={() => setIsPaused(true)} style={{ width: 28, height: 28 }} />
                ) : (
                  <AiOutlinePlayCircle onClick={() => setIsPaused(false)} style={{ width: 28, height: 28 }} />
                )}
              </div>
            )}

            <AiOutlineClose
              className="absolute right-[-120px] cursor-pointer"
              style={{ width: 24, height: 24 }}
              onClick={() => setLeaveModalOpen(true)}
            />
          </div>

          {/* <div className="absolute -right-20 top-20 mb-10 mt-4 flex flex-col gap-4">
            <button
              className="secondaryBtn w-fit"
              onClick={() => setQuestionForReport(question._id)}
              data-tooltip-id="report"
            >
              <FiFlag />
            </button>
            <Tooltip id="report" place="top">
              Report to Admin
            </Tooltip>
            <button
              className="secondaryBtn w-fit"
              onClick={() => {
                if (user?.savedQuestions.includes(question._id)) {
                  deleteSavedQuestionMutation([question._id]);
                } else {
                  saveQuestionMutation([question._id]);
                }
              }}
              data-tooltip-id="save-question-btn"
            >
              {user?.savedQuestions.includes(question._id) ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <Tooltip id="save-question-btn" place="top">
              {user?.savedQuestions.includes(question._id) ? 'Remove Saved Question' : 'Save Question'}
            </Tooltip>
          </div> */}

          {question.scenarioId ? (
            <Link
              target="_blank"
              to={`/scenario?id=${question.scenarioId}`}
              className="flex items-center gap-2 cursor-pointer secondaryBtn p-0 my-5 w-full"
            >
              <AiOutlineFileText style={{ width: 24, height: 24 }} />
              <p>Scenario question - click for details.</p>
            </Link>
          ) : null}

          <div className="relative flex flex-col gap-3 mt-3">
            <p className="text-black text-base font-medium">{question.question}</p>

            {question?.image ? (
              <img className="self-center my-5" src={question.image} alt="Exam Image Question" />
            ) : null}

            <div className="flex flex-col gap-3">
              {question.answers.map((answer: any) => (
                <div
                  key={answer._id}
                  className="grid items-center gap-4 border border-tertiary rounded-xl p-4 cursor-pointer hover:bg-bg"
                  style={{ gridTemplateColumns: 'auto 1fr' }}
                  onClick={() => handleAnswerChange(answer)}
                >
                  <RadioInput
                    isChecked={payload.answers.some(
                      (payloadAnswer) =>
                        payloadAnswer.questionId === question._id && payloadAnswer.answer === answer.answer
                    )}
                  />
                  <div
                    className={`text-sm leading-sm w-fit ${isActiveClass(
                      underlinedQuestions.includes(question.question + answer.answer),
                      'line-through'
                    )}`}
                    onClick={(e) => onToggleUnderline(e, question.question + answer.answer)}
                    dangerouslySetInnerHTML={{ __html: answer.answer }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-tertiary py-3 flex items-center justify-center gap-4">
          <button className="primaryBtn" onClick={handlePreviousQuestion}>
            <GoChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <div className="relative">
            {isReviewing && (
              <>
                <div className="fixed inset-0 -z-[1]" onClick={() => setIsReviewing(false)} />
                <div className="absolute bottom-[calc(100%+12px)] left-1/2 transform -translate-x-1/2 bg-white z-50 shadow-md rounded-xl w-[700px] p-5 border border-secondary max-h-[400px] overflow-y-auto">
                  <div className="flex flex-col gap-4">
                    {exam.sections.map((section, sIndex) => (
                      <div key={section._id}>
                        <h3 className="text-base font-medium mb-3">
                          {section.name} ·
                          <span className="ml-1">
                            {
                              section.questions.filter((question) =>
                                payload.answers.some((answer) => answer.questionId === question._id)
                              ).length
                            }
                            /{section.questions.length}
                          </span>
                        </h3>
                        <ul className="grid grid-cols-5 gap-3">
                          {section.questions.map((question, index) => (
                            <li
                              key={question._id}
                              className="flex items-center gap-1 text-sm cursor-pointer"
                              onClick={() => {
                                if (sectionTimes[sIndex] > 0) {
                                  setActiveSection(sIndex);
                                  setActiveQuestion(index);
                                  setIsReviewing(false);
                                }
                              }}
                            >
                              {index + 1}.
                              {payload.answers.some((answer) => answer.questionId === question._id && answer.answer) ? (
                                <span className="text-success-100">Answered</span>
                              ) : (
                                <span className="text-danger">Not Answered</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center gap-2">
              {/* <button className="secondaryBtn gap-1" onClick={() => saveProgress(saveExamPayload)}>
                Save
                <AiOutlineSave className="w-5 h-5" />
              </button> */}
              <button className="primaryBtn gap-1" onClick={() => setIsReviewing((p) => !p)}>
                Review
                <LuClipboardList className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            className="primaryBtn"
            onClick={() => {
              isLastQuestionInSection || isLastQuestion ? setIsOpenSubmitSectionDialog(true) : handleNextQuestion();
            }}
            disabled={isLoading}
          >
            {isLastQuestionInSection ? 'Submit Section' : isLastQuestion ? 'Finish' : 'Next'}
            <GoChevronRight className="w-5 h-5" />
          </button>
        </div>

        {isOpenSubmitSectionDialog ? (
          <ConfirmModal
            title="submit"
            onDismiss={() => setIsOpenSubmitSectionDialog(false)}
            onAgree={() => {
              // if (!(activeQuestion === section.questions.length - 1 && activeSection === exam.sections.length - 1))
              //   saveProgress(saveExamPayload);
              handleNextQuestion();
              setIsOpenSubmitSectionDialog(false);
            }}
          />
        ) : null}

        {/* {questionForReport && (
          <ReportIssueModal
            questionID={questionForReport}
            scenarioId={question.scenarioId}
            onClose={() => setQuestionForReport('')}
          />
        )} */}

        {/* {isOpenTimeDialog && !timeType && (
          <TimingMethodModal
            onChange={(value: any) => {
              if (value === 'standard') {
                setIsPaused(false);
                setTimeType(EXAM_TIME_TYPE.STANDARD_TIME);
              } else if (value === 'unlimited') {
                setHasTimer(false);
                setTimeType(EXAM_TIME_TYPE.UNLIMITED);
              } else {
                setIsPaused(false);
                setSectionTimes(exam.sections.map(() => value * 60));
                setTimeType(EXAM_TIME_TYPE.CUSTOM_TIME);
              }
            }}
            onClose={() => {
              setIsOpenTimeDialog(false);
            }}
          />
        )} */}
      </Modal>
      {leaveModalOpen && (
        <ConfirmModal title="leave exam" onAgree={onClose} onDismiss={() => setLeaveModalOpen(false)} />
      )}
    </>
  );
};
