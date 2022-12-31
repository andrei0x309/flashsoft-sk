import { supabase } from "../lib/deno/supaClientFS.ts";
import { tables, $cat_definition, $tag_types, $certs, $tags } from "./certs.ts"

const insertedCats = {}
const insertedTags = {}


const clean_CERT = async () => {
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

export const seedCert = async () => {
  await clean_CERT()

  const FSK_CERT_CATS = tables[1]
  const FSK_CERT_TAG_TYPES = tables[3]
  const FSK_CERT_TAGS = tables[2]
  const FSK_CERT = tables[0]

  for (const [key, value] of Object.entries($cat_definition)) {
    await supabase
      .from(FSK_CERT_CATS)
      .upsert({
        id: key,
        cat_name: value[0],
        cat_description: value[1],
        cat_icon_name: value[2]
      })
    insertedCats[value[0]] = key
  }
  
  let id = 0
  for (const [key, value] of Object.entries($tag_types)) {
    await supabase
      .from(FSK_CERT_TAG_TYPES)
      .upsert({
        id,
        name: value[0],
        description: value[1]
      })
    insertedTags[key] = id
    id++
  }

  for (const [key, value] of Object.entries($certs)) {
    const prj = {
      id: key,
      cert_file_name: value[0],
      cat_id: insertedCats[value[1]],
      cert_name: value[2],
      cert_description: value[3],
      cert_feature_image: value[4],
      cert_instructor: value[5],
    }
    await supabase
      .from(FSK_CERT)
      .upsert(prj)

    for (const [, tagValue] of Object.entries($tags[key])) {
      await supabase
        .from(FSK_CERT_TAGS)
        .upsert({
          cert_id: key,
          tag_id: insertedTags[tagValue]
        })
    }

  }
}