
type PageProps = {
  params: {
    slug: string;
  };
};

export default async function CoinPage({ params }: PageProps) {
  const { slug } = params;


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Coin: {slug}</h1>
    </div>
  );
}
