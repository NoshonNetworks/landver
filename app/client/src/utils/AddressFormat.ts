function shortAddress(address?: string): string {
    if(!address) return ""
    if(!address?.slice) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export {
    shortAddress
}