import Head from 'next/head'

type Props = {
  title?: string
  description?: string
  url?: string
  image?: string
}

export default function SEO({ title, description, url, image }: Props){
  const site = 'WashNGo BilCenter'
  const pageTitle = title ? `${title} — ${site}` : site
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{pageTitle}</title>
      <meta name="description" content={description ?? 'WashNGo BilCenter - professionel bilpleje, vask og salg.'} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description ?? 'WashNGo BilCenter - professionel bilpleje, vask og salg.'} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index,follow" />
      {/* JSON-LD Organization structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": site,
        "url": url ?? 'https://example.com',
        "logo": image ?? '/images/car-sample-1.svg',
        "sameAs": []
      }) }} />
    </Head>
  )
}
