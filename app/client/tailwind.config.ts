import type { Config } from "tailwindcss";

<<<<<<< HEAD
const config: Config = {
=======
export default {
>>>>>>> pr/Birdmannn/257
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
<<<<<<< HEAD
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			black: '#090914',
  			grey: '#7E8299',
  			info: '#2F80ED',
  			success: '#27AE60',
  			warning: '#E2B93B',
  			error: '#EB5757',
  			red: '#F1416C',
  			'grey-2': '#4F4F4F',
  			'grey-3': '#828282',
  			'grey-4': '#D9DAE1',
  			'grey-5': '#D0D5DD',
  			'grey-6': '#E0E0E0',
  			'grey-7': '#BDBDBD',
				'grey-8': '#F9F9F9',
  			'black-2': '#101828',
  			'blue-2': '#344054',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
=======
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
>>>>>>> pr/Birdmannn/257
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
<<<<<<< HEAD
};
export default config;
=======
} satisfies Config;
>>>>>>> pr/Birdmannn/257
