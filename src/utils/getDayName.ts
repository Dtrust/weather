const getDayName = (dateStr: string, locale: string) => {
        return new Date(dateStr).toLocaleDateString(locale, { weekday: 'long' })
}

export default getDayName
