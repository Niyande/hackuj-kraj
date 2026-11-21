let szerokoscGeograficzna = null;
let dlugoscGeograficzna = null;

    const przycisk = document.getElementById("g1");
    const statusTekst = document.getElementById("status");
    const poleLat = document.getElementById("wyswietl-lat");
    const poleLon = document.getElementById("wyswietl-lon");

    async function pobierzLokalizacje() {
      // Sprawdzenie bezpiecznego kontekstu (HTTPS lub localhost)
      if (!window.isSecureContext) {
        statusTekst.innerHTML = '<span class="blad">Błąd: Uruchom plik przez serwer lokalny (localhost) lub HTTPS, a nie bezpośrednio z dysku (file://).</span>';
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

    przycisk.addEventListener("click", pobierzLokalizacje);



