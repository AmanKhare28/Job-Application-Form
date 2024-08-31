const Success = () => {
  return (
    <div className="bg-blue-300 mt-48 w-1/2 m-auto px-7 rounded-2xl flex items-center">
      <img src="/check.svg" />
      <div className="ml-10">
        <h1 className="text-slate-700 text-6xl font-semibold">
          Your application has been submitted.
        </h1>
        <p className="text-slate-600 text-3xl mt-5">
          We will get back to you later.
        </p>
      </div>
    </div>
  );
};
export default Success;
