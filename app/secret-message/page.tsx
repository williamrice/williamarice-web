import Header from "@/components/Header";
import SecretMessageForm from "@/components/SecretMessageForm";

const SecretMessagePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800">
      <Header>
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white">
            Secret Message
          </h1>
        </div>
      </Header>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              About This Feature
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                I built this secret message feature for myself using C# .NET on
                the backend. It allows you to create encrypted messages that are
                stored securely at rest.
              </p>
              <p>
                When you create a message, it generates a unique link. Once this
                link is viewed, the message is permanently deleted - gone
                forever. Perfect for sharing sensitive information that should
                only be seen once.
              </p>
            </div>
          </div>
          <SecretMessageForm />
        </div>
      </div>
    </div>
  );
};

export default SecretMessagePage;
