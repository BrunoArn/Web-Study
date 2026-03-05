import Link from "next/link";
import Heading from "@/components/Heading";

export default function ReviewsPage() {
    return (
        <>
            <Heading>Reviews</Heading>
            <p>
                Tem review pra caramba, mano! Tem review de tudo quanto é jogo indie, desde os mais famosos até os mais obscuros. Se você quer saber se um jogo é bom ou não, é só dar uma olhada aqui!
            </p>
            <ul className="flex flex-col gap-3">
                <li className="bg-white border w-80 rounded shadow hover:shadow-xl">
                    <Link href="/reviews/hollow-knight">
                        <img src="/images/hollow-knight.jpg"
                            alt=""
                            width={320} height={180} className="mb-2 rounded-t"
                        />
                        <h2 className="py-1 text-center">
                            hollow knight
                        </h2>
                    </Link>
                </li>
                 <li className="bg-white border w-80 rounded shadow hover:shadow-xl">
                    <Link href="/reviews/stardew-valley">
                        <img src="/images/stardew-valley.jpg"
                            alt=""
                            width={320} height={180} className="mb-2 rounded-t"
                        />
                        <h2 className="py-1 text-center">
                            stardew valley
                        </h2>
                    </Link>
                </li>
            </ul>
        </>
    );
}