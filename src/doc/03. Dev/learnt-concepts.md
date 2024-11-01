**FUNZIONAMENTO POSIZIONAMENTO ASSOLUTO**
Il posizionamento agisce in due modi: 
-   se il padre non specifica un posizionamento, l'elemento  avente
    posizionamento assoluto, sara posizionato sempre prendendo come 
    riferimento la pagina, in quanto è il genitore piu diretto che sa 
    di avere. 
    ES: se il padre NON dovesse avere ALCUN posizionamnto, l'elemento corrente
    con posizionamento assoluto avente top: 0 e left: 0 sarà posizionato 
    all'angolo sx della pagina o del primo padre nella gerarchia con 
    posizionamento definito, NON della pagina. 
-   se il padre specifica il posizionamento, l'elemento sarà posizionato 
    rispetto all'elemento padre. 
    ES: se il padre dovesse avere posizionamnto relativo, l'elemento corrente
    con posizionamento assoluto avente top: 0 e left: 0 sarà posizionato 
    all'angolo sx dell'elemento pare, NON della pagina. 
**POSIZIONAMENTO RELATIVO / ASSOLUTO**
-   quando si crea l'html della view, nel css bisognerebbe SEMPRE 
    indicare il posizionamento, in tutte le regole. 
    Qusto va fatto prestando in particolare attenzione a dare il 
    posiionamento a tutti gli elementi della gerarchia. 
    

**CSS COME INGRANDIRE UN ELEMENTO HTML**
Uso transform scale. 
ES: transform: scale(1.05);