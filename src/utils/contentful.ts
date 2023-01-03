export function transformFaqGroup(item: any, level: number): any {
    return {
        title : item.fields.title,
        items : transformFaqGroupItemList(item.fields.items, level)
    };
}

export function transformFaqQuestionAnswer(item: any): any {
    return {
        question : item.fields.question,
        answer   : item.fields.answer
    };
}

export function transformFaqGroupItem(item: any, level: number): any {
    switch (item.sys.contentType.sys.id) {
        // FAQs can be nested
        case 'faqGroup':
            return transformFaqGroup(item, level + 1);

        // QA is the leaf node (no more nesting from here)
        case 'faqQuestionAnswer':
            return transformFaqQuestionAnswer(item);

        default:
            return null;
    }
}

export function transformFaqGroupItemList(items: any[], level: number): any[] {
    return (items || [])
        .map((item: any) => transformFaqGroupItem(item, level))
        .filter((item) => Boolean(item))
        ;
}


export function transformArticle(item: any): any {
    return {
        title : item.fields.title,
        body  : item.fields.body,
        image : item.fields.image
            ? item.fields.image.fields.file.url
            : null
    };
}

export function transformArticleList(items: any[]): any[] {
    return (items || []).map((item: any) => transformArticle(item));
}

export function getFileUrl(file: any, defaultValue: string | null): string | null {
    return file ? file.fields.file.url : defaultValue;
}