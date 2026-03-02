import Link from "next/link";
export default function ReviewsPage() {
    return (
        <>
            <h1>Reviews</h1>
            <p>
                Tem review pra caramba, mano! Tem review de tudo quanto é jogo indie, desde os mais famosos até os mais obscuros. Se você quer saber se um jogo é bom ou não, é só dar uma olhada aqui!
            </p>
            <ul>
                <li>
                    <Link href="/reviews/hollow-knight">
                        hollow knight
                    </Link>
                </li>
                <li>
                    <Link href="/reviews/stardew-valley">
                        Stardew Valley
                    </Link>
                </li>
            </ul>
        </>
    );
}