// Mock data for "Starte og drive bedrift" based on https://info.altinn.no/starte-og-drive/

export const mockUmbracoContent = {
  "/starte-og-drive-bedrift": {
    "id": "1234",
    "contentType": "sectionPage",
    "name": "Starte og drive bedrift",
    "createDate": "2023-01-01T00:00:00Z",
    "updateDate": "2023-10-27T00:00:00Z",
    "route": {
      "path": "/starte-og-drive-bedrift",
      "startItem": { "id": "1234", "path": "/starte-og-drive-bedrift" }
    },
    "properties": {
      "heading": "Starte og drive bedrift",
      "backgroundImage": {
        "url": "/images/headers/section-header.jpg", // Needs a real asset or placeholder
        "altText": "Decorative background of office work"
      },
      "themePageArea": [
        { "id": "1", "name": "Veiledere innen ulike tema og bransjer", "route": { "path": "/starte-og-drive-bedrift/veiledere" } },
        { "id": "2", "name": "Dokumentmaler", "route": { "path": "/starte-og-drive-bedrift/dokumentmaler" } }
      ],
      "goToLinkLocation": { "name": "Alle skjema for næringsdrivende", "url": "/skjema/naringsdrivende" },
      "goToLinkText": "Finn skjema",
      "themeArea": {
        "contentData": [
          {
            "heading": "Start og registrering",
            "themePageArea": [
              { "id": "10", "name": "Starte bedrift", "route": { "path": "/starte-og-drive-bedrift/starte" } },
              { "id": "11", "name": "Drive bedrift", "route": { "path": "/starte-og-drive-bedrift/drive-bedrift" } },
              { "id": "12", "name": "Endre og melde opplysninger", "route": { "path": "/starte-og-drive-bedrift/endre" } }
            ]
          },
          {
            "heading": "Økonomi og rettigheter",
            "themePageArea": [
              { "id": "20", "name": "Støtteordninger", "route": { "path": "/starte-og-drive-bedrift/stotteordninger" } },
              { "id": "21", "name": "Regnskap og revisjon", "route": { "path": "/starte-og-drive-bedrift/regnskap-og-revisjon" } },
              { "id": "22", "name": "Skatt og avgift", "route": { "path": "/starte-og-drive-bedrift/skatt-og-avgift" } }
            ]
          },
          {
            "heading": "Ansatte og eksport",
            "themePageArea": [
              { "id": "30", "name": "Arbeidsforhold", "route": { "path": "/starte-og-drive-bedrift/arbeidsforhold" } },
              { "id": "31", "name": "Eksport og import", "route": { "path": "/starte-og-drive-bedrift/eksport-og-import" } },
              { "id": "32", "name": "Avvikling, sletting og konkurs", "route": { "path": "/starte-og-drive-bedrift/avvikling-sletting-og-konkurs" } }
            ]
          }
        ]
      },
      "bottomArea": [
         {
             "contentType": "latestNewsBlock",
             "heading": "Siste nytt",
             "newsLocation": { "url": "/starte-og-drive-bedrift/nyheter" },
             "news": [
                 { 
                     "pageName": "Kutt i Innovasjon Norge", 
                     "mainIntro": "Som konsekvens av kuttene i statsbudsjettet for 2026, har Innovasjon Norges styre fastsatt et behov for å nedbemanne med 100–110 årsverk.",
                     "url": "/starte-og-drive-bedrift/kutt"
                 },
                 { 
                     "pageName": "Styrk bedriftens digitale sikkerhet", 
                     "mainIntro": "Sikkert.no skal bidra til å styrke Norges digitale motstandskraft ved å gi tydelige, like og korrekte råd om digital sikkerhet.",
                     "url": "/starte-og-drive-bedrift/sikkerhet"
                 },
                 { 
                     "pageName": "Fra årsskiftet er registrering enklere", 
                     "mainIntro": "Nye og enklere regler for Enhetsregisteret og Foretaksregisteret trer i kraft 1. januar 2026.",
                     "url": "/starte-og-drive-bedrift/registrering"
                 },
                 { 
                     "pageName": "Ny enhetsregisterlov fra 1. januar 2026", 
                     "mainIntro": "De to nye lovene påvirker blant annet hva som skal registreres, hvilken dokumentasjon som skal sendes inn og hvem som skal signere meldinger.",
                     "url": "/starte-og-drive-bedrift/ny-lov"
                 }
             ]
         },
         {
             "contentType": "doYouNeedHelpBlock",
             "heading": "Trenger du hjelp?",
             "description": "Våre veiledere sitter klar for å svare på spørsmål om å starte og drive bedrift i Norge. Tjenesten er gratis. Åpningstid: 9.00 – 15.00 (hverdager).",
             "phoneNumber": "800 33 840",
             "emailLinkText": "Skriv til oss",
             "email": "kontakt@example.com",
             "image": { "url": "/images/icons/help-lighthouse.svg", "altText": "Lighthouse illustration" },
             "showContactFormButton": true
         }
      ]
    }
  },
  
  // Example for a sub-page (GuidePage)
  "/starte-og-drive-bedrift/starte": {
    "id": "5678",
    "contentType": "guidePage",
    "name": "Starte bedrift",
    "createDate": "2023-01-01T00:00:00Z",
    "updateDate": "2023-05-15T00:00:00Z",
     "route": {
      "path": "/starte-og-drive-bedrift/starte",
      "startItem": { "id": "1234", "path": "/starte-og-drive-bedrift" }
    },
    "properties": {
      "metaTitle": "Starte bedrift - Steg for steg",
      "mainIntro": "Hva må du tenke på når du skal starte egen bedrift? Her finner du oversikt over valg av selskapsform, registrering og planlegging.",
      "mainBody": {
        "markup": `
          <h3>Valg av selskapsform</h3>
          <p>Det første du må ta stilling til er hvilken organisasjonsform som passer best for deg. De vanligste er:</p>
          <ul>
            <li>Enkeltpersonforetak (ENK)</li>
            <li>Aksjonærselskap (AS)</li>
            <li>Ansvarlig selskap (ANS/DA)</li>
          </ul>
        `,
        "blocks": []
      }
    }
  }
};
