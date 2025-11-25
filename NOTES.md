# WashNGo – Noter

## Lokalt udviklingsmiljø

Projektmappe:
`C:\Users\Adura\Desktop\WashnGo\Hjemmeside ideer`

### Første gang på en ny computer

1. Sørg for at **Node.js LTS** er installeret (via f.eks. winget eller nodejs.org).
2. Åbn PowerShell.
3. (Vigtig) Tillad npm-scripts for din bruger:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Svar `Y` og tryk Enter. Luk PowerShell og åbn en ny.

4. Gå til projektmappen og installer pakker:

```powershell
cd "C:\Users\Adura\Desktop\WashnGo\Hjemmeside ideer"
npm install
```

5. Start udviklingsserveren:

```powershell
npm run dev
```

6. Åbn siden i browseren:

```powershell
start http://localhost:3000
```

---

## Vercel deploy (online link)

### Installér Vercel CLI (én gang pr. computer)

```powershell
npm install -g vercel
```

### Første deploy

I projektmappen:

```powershell
cd "C:\Users\Adura\Desktop\WashnGo\Hjemmeside ideer"
vercel
```

- Log ind / opret konto i browseren.
- Følg spørgsmålene (nyt projekt, Next.js framework osv.).
- Til sidst får du et URL i terminalen, f.eks. `https://washngo-xyz.vercel.app` – det kan deles med andre.

### Production deploy (når du er tilfreds)

```powershell
cd "C:\Users\Adura\Desktop\WashnGo\Hjemmeside ideer"
vercel --prod
```

---

## Statisk preview uden Node

Du kan altid åbne den statiske forhåndsvisning:

Sti:
`public/preview/index.html`

Fra PowerShell:

```powershell
cd "C:\Users\Adura\Desktop\WashnGo\Hjemmeside ideer\public\preview"
start index.html
```

---

## Husk

- Hvis `npm` klager over "running scripts is disabled", så kør igen:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

- Projektet kan flyttes til en anden computer via zip eller GitHub. På den nye maskine følger du blot trinnene under **Første gang på en ny computer**.
