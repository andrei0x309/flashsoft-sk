import { supabase } from "../lib/deno/supaClientFS.ts";
import { $prjCats, tables, $prjTechs, $prjs } from "./projects.ts"

const insertedCats = {}
const insertedTechs = {}


const clean_PRJ = async () => {
  for (const table of tables) {
    try {
      await supabase
        .from(table)
        .delete()
        .neq('id', -1)
    } catch (err) {
      console.error(err)
    }
  }
}


export const seedPrj = async () => {
  await clean_PRJ()

  const FSK_PRJ_CATS = tables[2]
  const FSK_PRJ_TECH_TYPES = tables[0]
  const FSK_PRJ_TECHS = tables[1]
  const FSK_PRJ = tables[3]

  for (const [key, value] of Object.entries($prjCats)) {
    await supabase
      .from(FSK_PRJ_CATS)
      .upsert({
        id: key,
        cat_name: value[0],
        cat_description: value[1]
      })
    insertedCats[value[0]] = key
  }

  let id = 0
  for (const [key, value] of Object.entries($prjTechs)) {
    await supabase
      .from(FSK_PRJ_TECH_TYPES)
      .upsert({
        id,
        name: value[0],
        description: value[1]
      })
    insertedTechs[key] = id
    id++
  }

  for (const [key, value] of Object.entries($prjs)) {
    const prj = {
      id: key,
      weight: key,
      title: value.title,
      cat_id: insertedCats[value.cat],
      description: value.desc,
      short_description: value.sort_desc,
      feature_image: value.feature_image
    }
    await supabase
      .from(FSK_PRJ)
      .upsert(prj)

    for (const tag of value.tags) {
      await supabase
        .from(FSK_PRJ_TECHS)
        .upsert({
          prj_id: key,
          tech_id: insertedTechs[tag]
        })
    }

  }
}