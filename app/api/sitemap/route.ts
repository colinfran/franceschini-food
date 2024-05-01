import { getRecipes } from "@/db/getRecipes"
import { getServerSideSitemap } from "next-sitemap"

export async function GET(): Promise<Response> {
  const { recipes } = await getRecipes()
  const arr = [
    {
      loc: "https://franceschini.food",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://franceschini.food/login",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://franceschini.food/add",
      lastmod: new Date().toISOString(),
    },
  ]
  recipes.forEach((element) => {
    arr.push({
      loc: `https://franceschini.food/recipe/${element.id}`,
      lastmod: new Date().toISOString(),
    })
  })
  arr.push({
    loc: "https://franceschini.food/404",
    lastmod: new Date().toISOString(),
  })

  return getServerSideSitemap(arr)
}
