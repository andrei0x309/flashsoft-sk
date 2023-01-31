export const makeTitle = (title: string) => {
    return (title ?? '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
}

export const appendToData = (data: Record<string, unknown>, appendObj: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(appendObj)) {
        ;(data as unknown as Record<string, unknown>)[key] = value
    }
    return data
}

export const getPrjFeatureImage =  (fileName: string) => {
    return `/res/project/feature-img/${fileName}`
}