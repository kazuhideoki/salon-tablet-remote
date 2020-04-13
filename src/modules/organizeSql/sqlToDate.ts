export const sqlToDate = (arg) => {
    const date = new Date(arg);

    return date.getMonth() + 1 + "月" + date.getDate() + "日"
}