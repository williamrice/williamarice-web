import SecretMessageView from "@/components/SecretMessageView";

const SecretMessageSingleViewPage = async ({
  params,
}: {
  params: { uuid: string };
}) => {
  var secretMessage;
  const response = await fetch(
    `https://secret.williamarice.com/api/Secret/${params.uuid}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();

  console.log(data);
  if (data.status === 404) {
    secretMessage = null;
  } else {
    secretMessage = data;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <SecretMessageView secretMessage={secretMessage} />
    </div>
  );
};

export default SecretMessageSingleViewPage;
