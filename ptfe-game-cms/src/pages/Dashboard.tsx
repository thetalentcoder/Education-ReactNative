import { useAuthStore } from 'store/auth';

export const Dashboard = () => {
  const { user, isLogged } = useAuthStore();

  return (
    <div className="w-full h-fit pl-0 lg:pl-24">
      <div className="w-full h-full relative">
        <div className="w-full h-[40rem] bg-white lg:bg-primary rounded-bl-[300px] pt-4 lg:pt-20 pl-4 lg:pl-24">
          <div className="flex flex-col gap-2 lg:gap-4 text-light-200 lg:text-white pl-0 lg:pl-5">
            <h1 className="text-2xl lg:text-4xl font-circular">Welcome back, {user?.fullname}.</h1>
            <p className="text-xs lg:text-base">This is your dashboard.</p>
          </div>
        </div>
        <div className="static lg:absolute top-48 left-0 right-0">
          <div className="w-full p-4 lg:p-10">
            {/* {isLogged && user && user?.userRole !== 'student' && <StudentsCards />}
            {isLogged && user?.userRole === 'student' && <QuestionOfTheDay />} */}
            <div className="grid items-center gap-5" style={{ gridTemplateColumns: '2fr 300px' }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
