import SecretMessageView from '@/components/SecretMessageView';

interface SecretMessageSingleViewPageProps {
  params: Promise<{ uuid: string }>;
}

const SecretMessageSingleViewPage = async ({
  params,
}: SecretMessageSingleViewPageProps) => {
  const secretHostName = process.env.NEXT_PUBLIC_SECRETMESSAGE_HOSTNAME;
  const { uuid } = await params;
  var secretMessage;
  const response = await fetch(`${secretHostName}/api/Secret/${uuid}`, {
    cache: 'no-store',
  });
  const data = await response.json();

  if (data.status === 404) {
    secretMessage = null;
  } else {
    secretMessage = data;
  }
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800">
      <SecretMessageView secretMessage={secretMessage} />
    </div>
  );
};

export default SecretMessageSingleViewPage;
