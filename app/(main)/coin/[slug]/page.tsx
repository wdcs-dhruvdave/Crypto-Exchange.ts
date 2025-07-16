type Props = {
  params: {
    slug: string;
  };
};

export default function CoinPage({ params }: Props) {
  return <div>Coin slug: {params.slug}</div>;
}
