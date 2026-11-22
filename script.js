let i=0;

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




