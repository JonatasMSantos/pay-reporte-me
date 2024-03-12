import { getData } from "@/actions/payment-actions";
import Payments from "@/components/payments";
export default async function Home() {
  const data = await getData();
  return <Payments payments={data} />;
}
