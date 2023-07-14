import Link from "next/link";

export default function  DocsPage(){


    return (
        <div className="pl-72 pr-72 text-2xl text-center">
            <h1 className="text-7xl pb-7">Priebeh vypracovávania zadania</h1>

            Zadanie bolo vo svojej podstate jednoduché, čo sa týka funkcionality.
            Išlo o jednoduchú appku, ktorá spravuje TODO listy používateľa. 
            Čo som však podcenil, je samotný setup aplikácie s požadovaným technologickým stackom.
            Trvalo mi to oveľa viac, ako som očakával a stratil som tam dôležitý čas. Taktiež mi
            dalo zabrať aj zoznamovanie s daným stackom, lebo okrem Next.js som sa nestretol
            so žiadnou s uvedených knižníc. Najviac práce mi v tomto ohľade dalo zabrať TailwindCSS.
            Je to podľa mňa super vec, mám z toho lepší pocit ako z napr. Bootstrapu, ale CSS je bohužiaľ
            mojou slabou stránkou a teda všetko mi v tomto ohľade trvá dlhšie, ako by bolo žiaduce.
            Na druhej strane som sa opäť niečo aj naučil a aj celkovo sa vo svete frontendu cítim viac doma.
            <br></br>
            Celkovo mi vypracovanie projektu trvalo približne 12-13 hodín. Setup aplikácie zabral okolo 1.5 hodiny, 
            robenie funkcionality okolo 3 hodín a zvyšok zabralo štýlovanie komponentov a študovanie dokumentácií.
            Pri POST requestoch bude pravdepodobne treba chvíľu počkať/refreshnuť stránku. Som si vedomý tohto nedostatku,
            ale už som do odovzdania nestihol zapracovať zmeny.


            <h1 className="text-5xl pt-6 pb-6">Routing aplikácie</h1>
            Môj spôsob routovania aplikácie je jednoduchý. Root sa nachádza na mieste, kde sa zobrazujú
            všetky TODO zoznamy. Po kliknutí na konkrétny zoznam sa stránka vnorí do /detail, kde sa zobrazí
            celý todo list so všetkými úlohami. Na to, aby komponent vedel, že ktorý list má načítať, mu posúvam v 
            Link komponente informáciu o ID daného zoznamu.
            Pri vytváraní či už zoznamu alebo úlohy som taktiež použil modály, ktoré sa zobrazovali len
            vtedy, ak v URL bola query s parametrom modal.

            <h1 className="text-5xl pt-6 pb-6">Tech stack</h1>
            <ul className="grid grid-cols-2">
                <li>Next.js</li>
                <li>Typescript</li>
                <li>TailwindCSS</li>
                <li>headlessUI</li>
                <li>daisyUI</li>
                <li>react-form-hook</li>
                <li>zod validácia</li>
                <li>react-query</li>
            </ul>
            <Link href="/todo" className="text-purple-500">Presmerovanie do aplikácie</Link>
        </div>

    )
}