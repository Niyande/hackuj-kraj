let szerokoscGeograficzna = null;
let dlugoscGeograficzna = null;
let i=0;

    
    const przycisk = document.getElementById("g1");
    const statusTekst = document.getElementById("status");
    const poleLat = document.getElementById("wyswietl-lat");
    const poleLon = document.getElementById("wyswietl-lon");
    const przyciskReset = document.getElementById("btn-reset");


    //WYSYLANIE DANYCH PONIŻEJ FUNKCJI POBIERANIA LOKALIZACJI!!!!
    //WYSYLANIE DANYCH PONIŻEJ FUNKCJI POBIERANIA LOKALIZACJI!!!!
    //WYSYLANIE DANYCH PONIŻEJ FUNKCJI POBIERANIA LOKALIZACJI!!!!
    //WYSYLANIE DANYCH PONIŻEJ FUNKCJI POBIERANIA LOKALIZACJI!!!!
    //WYSYLANIE DANYCH PONIŻEJ FUNKCJI POBIERANIA LOKALIZACJI!!!!
    //WYSYLANIE DANYCH PONIŻEJ FUNKCJI POBIERANIA LOKALIZACJI!!!!
    //WYSYLANIE DANYCH PONIŻEJ FUNKCJI POBIERANIA LOKALIZACJI!!!!


    async function pobierzLokalizacje() {
      // Sprawdzenie bezpiecznego kontekstu (HTTPS lub localhost)
      if (!window.isSecureContext) {
        statusTekst.innerHTML = '<span class="blad">Błąd: </span>';
        return;
      }

      if (!("geolocation" in navigator)) {
        statusTekst.innerHTML = '<span class="blad">Twoja przeglądarka nie obsługuje geolokalizacji.</span>';
        return;
      }
      statusTekst.textContent = "Pobieranie lokalizacji...";
      try {
        const pozycja = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });


        szerokoscGeograficzna = pozycja.coords.latitude;
        dlugoscGeograficzna = pozycja.coords.longitude;

        statusTekst.textContent = "Lokalizacja pobrana pomyślnie!";
        poleLat.textContent = szerokoscGeograficzna;
        poleLon.textContent = dlugoscGeograficzna;


        console.log("Zmienna szerokoscGeograficzna:", szerokoscGeograficzna);
        console.log("Zmienna dlugoscGeograficzna:", dlugoscGeograficzna);



      } catch (blad) {
        let komunikat = "Nie udało się pobrać lokalizacji.";
        if (blad.code === blad.PERMISSION_DENIED) {
          komunikat = "Odmówiono dostępu do lokalizacji.";
        } else if (blad.code === blad.POSITION_UNAVAILABLE) {
          komunikat = "Pozycja jest obecnie niedostępna.";
        } else if (blad.code === blad.TIMEOUT) {
          komunikat = "Przekroczono czas oczekiwania.";
        }
        statusTekst.innerHTML = `<span class="blad">${komunikat}</span>`;
      }
    }
    function resetujLokalizacje() {
      szerokoscGeograficzna = null;
      dlugoscGeograficzna = null;
      statusTekst.textContent = "Zresetowano. Kliknij przycisk, aby pobrać współrzędne.";
      poleLat.textContent = "-";
      poleLon.textContent = "-";
    }

    przycisk.addEventListener("click", pobierzLokalizacje);
    przyciskReset.addEventListener("click", resetujLokalizacje);
//
//
//
//
//
//
//      TU PONIZEJ: 
//
//
//
//
//
//
async function wyslijDoSerwera(lat, lon) {
  try {
    const odpowiedz = await fetch("http://localhost:3000/lokalizacja", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat: lat, lon: lon })
    });

    if (!odpowiedz.ok) {
      throw new Error("Serwer zwrócił błąd: " + odpowiedz.status);
    }

    const wynik = await odpowiedz.json();
    console.log("Odpowiedź serwera:", wynik);
    statusTekst.textContent = "Lokalizacja wysłana na serwer!";
  } catch (blad) {
    console.error(blad);
    statusTekst.innerHTML = '<span class="blad">Nie udało się wysłać danych na serwer.</span>';
  }
}
function kontrast()
{
    i++;
    if(i%2==1)
    {
      document.querySelector('button').style.color="yellow";
      document.querySelector('button').style.backgroundColor="black";
      document.getElementById("btn-reset").style.backgroundColor="black";
      document.getElementById("btn-reset").style.color="yellow";
      document.body.style.backgroundColor = "black";
      document.body.style.color="yellow";

      document.getElementsByClassName('logo-aed')[0].src = "media/invertedlogopoziom.png";
      document.getElementsByClassName('kontrast')[0].src = "media/inv_polkolko.png";
      document.getElementsByClassName('fontt')[0].src = "media/inv_czcionka.png";
    }

    if(i%2==0)
    {
      document.querySelector('button').style.color="";
      document.querySelector('button').style.backgroundColor="";
      document.getElementById("btn-reset").style.backgroundColor="";
      document.getElementById("btn-reset").style.color="";
      document.body.style.backgroundColor = "";
      document.body.style.color="";

      document.getElementsByClassName('logo-aed')[0].src = "media/mappoziom.webp";
      document.getElementsByClassName('kontrast')[0].src = "media/polkolko.webp";
      document.getElementsByClassName('fontt')[0].src = "media/czcionka.webp";
    }


}
  let licznik;
function duzyfont(krok)
{
    const root = document.documentElement;
    const obecny = parseFloat(getComputedStyle(root).fontSize);
    const nowy = Math.min(Math.max(obecny + krok, 10), 24);
    
    if(nowy >=24)root.style.fontSize = "16px";
    else root.style.fontSize = nowy + "px";
}




