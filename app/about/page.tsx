import Heading from "@/components/Heading";

export const metadata = {
    title: "About", //override the default values
};

export default function AboutPage() {
    return (
        <>
            <Heading>About</Heading>
            <p>
                Aqui vai ter informações sobre o site Indie Gamer, um lugar onde você pode encontrar os melhores jogos indie do mercado!
            </p>
        </>
    );
}