async function verify() {
  console.log("=== SEO VERIFICATION SUITE ===\n");

  const baseUrl = "http://localhost:3005";

  // 1. Homepage HTML
  const homeRes = await fetch(`${baseUrl}/`);
  const html = await homeRes.text();
  console.log("✓ Homepage HTTP status:", homeRes.status);

  // Title
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  console.log("✓ Title:", title);

  // Meta description
  const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)?.[1];
  console.log(`✓ Meta description (${desc?.length || 0} chars):`, desc);

  // Canonical
  const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
  console.log("✓ Canonical URL:", canonical);

  // Robots
  const robotsMeta = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1];
  console.log("✓ Robots meta:", robotsMeta);

  // Open Graph
  const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)?.[1];
  const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)?.[1];
  const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)?.[1];
  const ogLocale = html.match(/<meta[^>]*property=["']og:locale["'][^>]*content=["']([^"']+)["']/i)?.[1];
  console.log("✓ OG Title:", ogTitle);
  console.log("✓ OG Description:", ogDesc);
  console.log("✓ OG Image:", ogImage);
  console.log("✓ OG Locale:", ogLocale);

  // Twitter Card
  const twCard = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']+)["']/i)?.[1];
  const twTitle = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']+)["']/i)?.[1];
  const twImage = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i)?.[1];
  console.log("✓ Twitter Card:", twCard);
  console.log("✓ Twitter Title:", twTitle);
  console.log("✓ Twitter Image:", twImage);

  // JSON-LD scripts
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let match;
  let count = 0;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    count++;
    try {
      const parsed = JSON.parse(match[1]);
      console.log(`✓ JSON-LD #${count} (${parsed["@type"]}):`);
      console.log(`   @context: ${parsed["@context"]}`);
      if (parsed["@type"] === "Person") {
        console.log(`   name: ${parsed.name}`);
        console.log(`   jobTitle: ${parsed.jobTitle}`);
        console.log(`   worksFor: ${parsed.worksFor?.name}`);
        console.log(`   alumniOf: ${parsed.alumniOf?.name}`);
        console.log(`   sameAs: ${parsed.sameAs?.join(", ")}`);
        console.log(`   has phone: ${!!parsed.telephone}, has email: ${!!parsed.email}`);
      }
    } catch (err) {
      console.error(`✗ JSON-LD #${count} parse error:`, err.message);
    }
  }

  // 2. Headings & Landmarks
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  console.log(`✓ H1 count: ${h1Matches.length}`);
  h1Matches.forEach((h, i) => console.log(`   H1 #${i+1}:`, h[1].replace(/<[^>]+>/g, "").trim()));

  const sections = ["hero", "about", "skills", "work", "certifications", "experience", "benchmarks", "contact"];
  sections.forEach((id) => {
    const hasSec = html.includes(`id="${id}"`);
    console.log(`✓ Section #${id} present:`, hasSec);
  });

  // 3. /robots.txt
  const robotsRes = await fetch(`${baseUrl}/robots.txt`);
  const robotsTxt = await robotsRes.text();
  console.log("\n✓ /robots.txt status:", robotsRes.status);
  console.log("--- robots.txt content ---");
  console.log(robotsTxt.trim());

  // 4. /sitemap.xml
  const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
  const sitemapXml = await sitemapRes.text();
  console.log("\n✓ /sitemap.xml status:", sitemapRes.status);
  console.log("--- sitemap.xml preview ---");
  console.log(sitemapXml.slice(0, 300).trim());

  // 5. /opengraph-image
  const ogRes = await fetch(`${baseUrl}/opengraph-image`);
  console.log("\n✓ /opengraph-image status:", ogRes.status, "Content-Type:", ogRes.headers.get("content-type"));

  // 6. /manifest.webmanifest
  const manifestRes = await fetch(`${baseUrl}/manifest.webmanifest`);
  console.log("✓ /manifest.webmanifest status:", manifestRes.status);

  console.log("\n=== ALL SEO CHECKS COMPLETED ===");
}

verify().catch(console.error);
