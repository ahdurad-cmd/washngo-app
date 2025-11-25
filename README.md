# WashNGo - Website

Dette repository indeholder en Next.js + TypeScript + Tailwind skabelon for WashNGo bilforretning.

Quick start (Windows PowerShell):

```powershell
npm install
npm run dev
```

Quick visual preview (no Node or Docker required):

 - Open the static preview file in your browser to see a visual mock of the homepage without running the app.
 - File path (Windows):

```powershell
Start-Process 'C:\Users\Adura\Desktop\WashnGo\Hjemmeside ideer\public\preview\index.html'
```

Or open `public/preview/index.html` by double-clicking it in File Explorer. The preview uses the Tailwind CDN and the images in `public/images`.


Git (initial push)

If you want to push this project to GitHub from your local machine, run these commands (replace with your repo URL):

```powershell
git init
git add --all
git commit -m "Initial commit - WashNGo site"
# Replace URL below with your GitHub repo url
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/washngo-site.git
git branch -M main
git push -u origin main
```


Production / deployment notes:
- Skift `https://example.com` i `public/sitemap.xml` og `public/robots.txt` til dit rigtige domæne før deployment.
- Upload-funktionen i `/admin` skriver til `public/docs` og virker kun lokalt; brug S3 eller anden objektlagring i produktion.
- For analytics, indsæt din målekode i `src/pages/_app.tsx` eller integrer en privatlivsvenlig løsning (f.eks. Plausible) og informer brugerne i privatlivspolitikken.

Kør tests:

```powershell
npm run test
```

Analytics and production tips:
- Plausible: sæt `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` i Vercel/environment variables til dit domæne for at aktivere analytics (ingen cookies). 
- Google Analytics: sæt `NEXT_PUBLIC_GA_ID` hvis du foretrækker GA (husk cookietilladelse hvis nødvendigt).

Production uploads (S3):
- I stedet for upload til `public/docs` (lokalt), brug S3. Jeg har tilføjet en S3-helper i `src/lib/storage.ts` som bruger `@aws-sdk/client-s3`.
- Installer klient: `npm install @aws-sdk/client-s3` og konfigurer miljøvariabler fra `.env.example`.

Deployment (Vercel):
- Opret projekt i Vercel, link repo, og sæt miljøvariabler i Vercel dashboard. Sørg for at opdatere `public/sitemap.xml`/`robots.txt` med dit domæne først.


Scripts:
- `npm run dev`: Kører dev-server på `http://localhost:3000`
- `npm run build`: Bygger produktion
- `npm run start`: Starter produktionsserver
- `npm run lint`: Kør ESLint
- `npm run format`: Kør Prettier
- `npm run test`: Kør tests

Deployment:
- Vercel anbefales: link dit repo og brug `next` build-pipeline.
Deployment:
- Vercel anbefales: link dit repo og brug `next` build-pipeline.

Kør uden at installere Node lokalt (Docker)

1) Kør i PowerShell (kræver Docker Desktop):

```powershell
Set-Location -LiteralPath 'C:\Users\Adura\Desktop\WashnGo\Hjemmeside ideer'
docker-compose up --build
```

Dette starter en udviklings-container og binder `http://localhost:3000`.

2) Byg og kør produktionsimage:

```powershell
docker build -t washngo-site:prod .
docker run -p 3000:3000 --env NEXT_PUBLIC_PLAUSIBLE_DOMAIN=example.com washngo-site:prod
```

Bemærk: Upload via `/admin` skriver til `public/docs` kun når container er kørt med bind-mount (som i `docker-compose`). For en produktionsopsætning, brug S3 og sæt `AWS_*` miljøvariabler.

Notes:
- PDF-dokumenter kan placeres i `public/docs` og vises på ` /docs `-siden.
- Booking-data gemmes midlertidigt i `data/bookings.json` via API-route (mock). Replace med database i produktion.
