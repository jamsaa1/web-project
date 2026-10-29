# Vaatimusmäärittely: Web project

**Versio:** 0.1   
**Päivämäärä:** 28.10.2026  
**Laatija:** Ryhmä 7
**Tila:** Esimerkkidokumentti – ei oikean asiakkaan hyväksymä

## 1. Tausta ja tavoite

Kaveriporukalla on ollut pitkään jo ryhmä, jossa katsotaan, ehdotetaan ja arvostellaan elokuvia. Ajan kanssa oli vaikea muistaa kaikkia elokuvia mitä oli ehdotettu ja ryhmä kaipaa alustaa, jolla voisi luoda ryhmiä ja jakaa arvosteluja ryhmälleen.

**Tavoite:** Käyttät voivat luoda joko yksityisiä tai julkisia ryhmiä ja kirjoittaa 1-5 tähden arvosteluja muille ryhmän jäsenille. Julkisiin ryhmiin voi liittyä vapaasti, mutta yksityisiin ryhmiin tarvitsee kutsun. Näin ryhmän jäsenet voivat lukea arvosteluja ja keskustella ryhmän chatissa. Käyttäjät voivat luoda/muokata/poistaa/jakaa elokuva listoja itselleen tai ryhmälle.

**Onnistumisen mittarit (sovittava asiakkaan kanssa):**
- Henkilö voi luoda käyttäjän ja kirjautua sivulle omalla sähköpostilla, uniikilla 	käyttäjänimellä ja salasanalla. Henkilö voi myös poistaa käyttäjän.
- Käyttäjä voi liittyä/luoda/kutsua ihmisiä ryhmiin
- Käyttäjä voi kirjoittaa arvosteluja ja antaa 1-5 tähteä elokuvalle
- Käyttäjä näkee missä elokuvateatterissa kyseisen elokuvan näytösaikoja ja 	suoratoistopalveluja, josta elokuvan voi katsoa
- Käyttäjä voi hakea elokuvia nimellä, sekä elokuvan kategorian mukaan.


## 2. Käyttäjät ja roolit

| Rooli | Tarve | Oikeudet |
|---|---|---|
| Ryhmän ylläpitäjä | Kirjoittaa elokuva arvosteluja. Nähdä mistä elokuvia voi katsoa. Nähdä muiden käyttäjien arvosteluja. Ylläpitää/moderoida ryhmää. Kutsua muita käyttäjiä ryhmään. Luoda/muokata/poistaa/jakaa listoja. | Nähdä itsensä ja muiden käyttäjien kirjoittamat arvostelut. Nähdä muut käyttäjät ryhmässä. Poistaa/lisätä käyttäjiä ryhmästä. Poistaa sääntöjä rikkovia/sopimattomia arvosteluja. Voi siirtää/antaa ylläpitäjän oikeudet toisille käyttäjille.|
| Ryhmän jäsen |  Kirjoittaa elokuva arvosteluja. Nähdä mistä elokuvia voi katsoa. Nähdä muiden käyttäjien arvosteluja. Liittyä ryhmiin. Luoda/muokata/poistaa/jakaa listoja.| Nähdä itsensä ja muiden käyttäjien kirjoittamat arvostelut. Nähdä muut käyttäjät ryhmässä. Poistua ryhmästä. Poistaa ja muokata omia arvosteluja. 


**Esimerkin rajaus:** TBA

## 3. Käyttötilanne
1. Henkilö kirjautuu/luo käyttäjän.
2. Käyttäjä saa kutsun yksityiseen ryhmään ja liittyy sinne.
3. Käyttäjä luo uuden arvostelun ja valitsee katalogista elokuvan, jonka haluaa arvostella. Käyttäjä arvioi elokuvan 1-5 tähdellä ja halutessaan kirjoittaa arvioinnin ja julkaisee sen.
4. Joku muu käyttäjä lukee arvostelun ja lisää kyseisen elokuvan ryhmän listaan valitsemalla sen katalogista.
5. Käyttäjä huomaa kirjoitusvirheen arvostelussaan ja muokkaa sitä, ja tallentaa muutokset.


## 4. Toiminnalliset vaatimukset

Jokaisella vaatimuksella on yksilöllinen tunniste. **Must** tarkoittaa ensimmäisen käyttökelpoisen version kannalta välttämätöntä, **Should** tärkeää mutta lykättävissä olevaa ja **Could** mahdollista lisäominaisuutta.

| ID | Vaatimus | Prioriteetti |
|---|---|---|
| FR-01 | Käyttäjätilin luominen. | MUST
| FR-02 | Arvostelu ominaisuus. | MUST
| FR-03 | Ryhmien luominen. | MUST
| FR-04 | Social-välilehti josta voi löytää uusia ryhmiä sekä lukea arvosteluita. | SHOULD
| FR-05 | Sovellus toimii myös mobiililaitteilla. | SHOULD
| FR-06 | Hakukenttä elokuville. | MUST
| FR-07 | Elokuvalistojen luominen ja niiden jakaminen. | SHOULD
| FR-08 | Elokuvan mahdolliset näytösajat kyseisestä elokuvasta. | COULD
| FR-09 | 
| FR-10 |  

### 4.1 Tarkemmat hyväksymiskriteerit: 
- FR-01 | Oman käyttäjänimen ja salasanan voi vaihtaa sekä sovelluksen tulee toimia myös ilman rekisteröintiä. Ryhmät, arvosteleminen ja listojen luominen vaatii käyttäjätilin.
- FR-02 | Omaa arvostelua voi myöhemmin muokata ja käyttäjä voi päättää sen yksityisyydestä.
- FR-03 | Ryhmissä voi keskustella muiden jäsenten kanssa ja jakaa elokuvia/arvosteluita. Ryhmät voivat olla joko julkisia tai yksityisiä sekä niissä on admin joka voi hallita ryhmää.
- FR-06 | Elokuvia voi hakea myös näyttelijän, vuoden tai genren perusteella.

## 5. Ei-toiminnalliset vaatimukset

Numeeriset rajat ovat **esimerkkitavoitteita**, jotka tulee oikeassa projektissa sopia asiakkaan kanssa ja testata.

| ID | Vaatimus | Todentaminen |
|---|---|---|
| NFR-01 |
| NFR-02 |
| NFR-03 |
| NFR-04 |
| NFR-05 |

## 6. Tiedot ja alustava tietomalli
TBA

## 7. Projektin rajaus
TBA

## 8. Toteutusjärjestys ja alustava viikkosuunnitelma

Tämä on **esimerkkisuunnitelma**, ei asiakkaan hyväksymä aikataulu. Ensimmäinen arvo syntyy, kun tapahtumia voi nähdä ja ilmoittautua niihin; tekniset riippuvuudet, kuten tunnistautuminen, toteutetaan hallitusti tämän ympärille.

| Viikko | Tavoite ja näytettävä tulos |
|---|---|
| 1 | Vaatimukset, tietokantasuunnitelma, backlog ja ensimmäinen Azure-julkaisu hyväksyttyyn pohjaan |
| 2 |
| 3 |
| 4 |
| 5 |
| 6 |
| 7 | Viimeistely, dokumentit, testaus ja tuotantoversion vakauttaminen |
| 8 | Loppuesitys ja toimivan julkaistun sovelluksen esittely |

**Huom.** Varhaisissa demoissa voidaan käyttää rajattua testikäyttäjää tai testitunnistusta. Oikeat käyttöoikeudet ja turvallisuusvaatimukset on toteutettava ennen todellisten käyttäjien käyttöönottoa.

## 9. Definition of Done – milloin vaatimus on valmis?

Vaatimusta ei merkitä valmiiksi vain siksi, että se toimii kehittäjän omalla koneella. Valmis ominaisuus täyttää kaikki seuraavat ehdot:

- [ ] Toteutus vastaa hyväksyttyjä vaatimuksia ja hyväksymiskriteerejä.
- [ ] Koodi on GitHubissa, katselmoitu ja yhdistetty yhteiseen haaraan.
- [ ] Tarvittavat automaattiset testit menevät läpi.
- [ ] Ominaisuus toimii oikean palvelimen ja tietokannan kanssa.
- [ ] Ominaisuus on julkaistu Azureen ja testattu julkaistusta osoitteesta.
- [ ] Tiimi osaa esitellä ja selittää toteutuksen.
- [ ] Tarvittava dokumentaatio on päivitetty.

## 10. Avoimet kysymykset ja oletukset

| ID | Kysymys asiakkaalle | Tila |
|---|---|---|
| Q-01 | Voiko arvosteluille jättää tykkäyksiä tai kommentteja? | Ominaisuutta ei tarvita projektiin. |
| Q-02 |
| Q-03 |
| Q-04 |
| Q-05 |

**Oletukset, jotka pitää varmistaa:** TBA

## 11. Hyväksyntä ja muutosten hallinta

Vaatimusmäärittely käydään asiakkaan kanssa läpi **ennen varsinaisen toteutuksen etenemistä**. Hyväksynnässä tarkistetaan erityisesti tavoitteet, ensimmäisen version rajaus, Must-vaatimukset ja avoimet kysymykset.

| Kenttä | Arvo |
|---|---|
| Asiakkaan edustaja | _________________________ |
| Hyväksytty versio | _________________________ |
| Hyväksynnän päivämäärä | _________________________ |
| Mahdolliset ehdot | _________________________ |

Muutokset kirjataan dokumentin versiohistoriaan ja GitHubin backlogiin. Asiakas ja tiimi arvioivat yhdessä niiden vaikutuksen aikatauluun ja prioriteetteihin.

## 12. Versiohistoria

| Versio | Päivä | Muutos |
|---|---|---|
| 0.1 | 28.10.2026 | Alustava vaatimusmäärittely |

