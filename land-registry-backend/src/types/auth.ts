export interface User {
  id: number;
  email: string;
  walletAddress: string;
  userType: 'landowner' | 'inspector';
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterDTO {
  email: string;
  passcode: string;
  walletAddress: string;
  userType: 'landowner' | 'inspector';
}

export interface LoginDTO {
  email: string;
  passcode: string;
} 