import { AdjectiveEntry } from "./adjective-entry.model";
import { NounEntry } from "./noun-entry.model";
import { OtherEntry } from "./other-entry.model";
import { VerbEntry } from "./verb-entry.model";

export interface Dictionary {
    verbs: VerbEntry[],
    nouns: NounEntry[],
    adjectives: AdjectiveEntry[],
    other: OtherEntry[]
}