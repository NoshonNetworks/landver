import { Land, LandUseEnum, StatusEnum } from "@/types/interfaces";

// Helper function to generate random hex address
const generateRandomAddress = () => {
    return `0x${Math.random().toString(16).slice(2, 12)}`;
};

// Helper function to generate random coordinates
const generateRandomCoordinates = () => {
    return {
        latitude: Number((Math.random() * 180 - 90).toFixed(6)),
        longitude: Number((Math.random() * 360 - 180).toFixed(6)),
    };
};

// Helper function to generate random area
const generateRandomArea = () => {
    return Math.floor(Math.random() * 10000) + 500; // Between 500 and 10500 sq ft
};

// Helper function to generate random timestamp within last 30 days
const generateRecentTimestamp = () => {
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    return Math.floor(Math.random() * (now - thirtyDaysAgo) + thirtyDaysAgo);
};

// Helper function to generate random land use
const generateRandomLandUse = () => {
    const uses = ["Residential", "Commercial", "Agricultural", "Industrial"];
    const randomUse = uses[Math.floor(Math.random() * uses.length)];
    return {
        variant: {
            [randomUse]: {},
        } as unknown as LandUseEnum,
    };
};

// Helper function to generate random status
const generateRandomStatus = () => {
    const statuses = ["Pending", "Approved", "Rejected"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    return {
        variant: {
            [randomStatus]: {},
        } as unknown as StatusEnum,
    };
};

// Main function to generate mock lands data
export const generateMockLands = (count: number = 10): Land[] => {
    const mockLands: Land[] = [];

    for (let i = 0; i < count; i++) {
        const mockLand: Land = {
            id: generateRandomAddress(),
            area: generateRandomArea(),
            inspector: generateRandomAddress(),
            last_transaction_timestamp: String(generateRecentTimestamp()),
            owner: generateRandomAddress(),
            fee: Math.floor(Math.random() * 10) + 1, // 1-10 ETH
            location: generateRandomCoordinates(),
            land_use: generateRandomLandUse(),
            status: generateRandomStatus(),
        };
        mockLands.push(mockLand);
    }

    return mockLands;
};

// Function to format timestamp to date string
export const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date
        .getFullYear()
        .toString()
        .slice(2)}`;
};

// Function to format area to readable string
export const formatArea = (area: number): string => {
    return `${area.toLocaleString()}sqft`;
};

// Function to format address for display
export const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Function to generate land ID
export const generateLandId = (): string => {
    const prefix = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0");
    const suffix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .split("")
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
        .join("");
    return `${prefix}-${suffix}`;
};
