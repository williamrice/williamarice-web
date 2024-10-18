import Header from "@/components/Header";
import SecretMessageForm from "@/components/SecretMessageForm";

const SecretMessagePage = () => {
  return (
    <>
      <Header>
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white">
            Secret Message
          </h1>
        </div>
      </Header>
      <div className=" flex justify-center p-8">
        <SecretMessageForm />
      </div>
    </>
  );
};

export default SecretMessagePage;
