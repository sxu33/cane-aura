import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Image src="/images/loading.gif" alt="loading ..." height={100} width={100} />
    </div>
  );
};

export default LoadingPage;
