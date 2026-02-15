import { type SchemaTypeDefinition } from 'sanity'

import caseStudy from './schemas/caseStudy'
import currentlyReading from './schemas/currentlyReading'
import workProject from './schemas/workProject'
import funProject from './schemas/funProject'
import doingItem from './schemas/doingItem'
import curatedArticle from './schemas/curatedArticle'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [caseStudy, currentlyReading, workProject, funProject, doingItem, curatedArticle],
}
