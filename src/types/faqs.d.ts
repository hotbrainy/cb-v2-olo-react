interface IFaqQuestionAnswer
{
    question: string;
    answer: any; // NOTE: this will be a "rich-text" contentful document
}

interface IFaqGroup
{
    title?: string;
    items: ReadonlyArray<IFaqGroup | IFaqQuestionAnswer>;

    // TODO: review these (may now be obsolete with use of Contentful)
    id?: string;
    level?: number;
}
