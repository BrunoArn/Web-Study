import Heading from "@/components/Heading";

export default function HollowKnightPage() {
    return (
        <>
            <Heading>Hollow Knight</Heading>
            <img src="/images/hollow-knight.jpg"
                alt=""
                width={640} height={360} className="mb-2 rounded"
            />
            <p>
                Aqui vai ter o review do Hollow Knight, um jogo de metroidvania que é simplesmente incrível! Ele tem uma jogabilidade viciante, gráficos charmosos e uma trilha sonora maravilhosa. Se você gosta de jogos de metroidvania, com certeza vai adorar o Hollow Knight!
            </p>
        </>
    );
}