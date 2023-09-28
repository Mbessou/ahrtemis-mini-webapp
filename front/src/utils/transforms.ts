export const collapseStr = (input: string): string => {
    return input.slice(0, 20) + ((input.length > 20) ? '...' : '');
}