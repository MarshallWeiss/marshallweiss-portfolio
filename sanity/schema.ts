import { type SchemaTypeDefinition } from 'sanity'

import caseStudy from './schemas/caseStudy'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [caseStudy],
}
