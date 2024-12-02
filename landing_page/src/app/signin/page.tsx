'use client';

import { useState } from 'react';
import Button  from '../components/Button/Button';
import { Input } from '../components/Input/Input';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] text-[#1f1f1f] px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-[40px] font-bold">Sign in</h1>
          <p className="mt-2 text-[22px] font-[300] text-gray-600">
            Hey, Enter your details to login to your account
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <Input
            type="text"
            placeholder="Enter Email / Phone No"
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Passcode"
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className=""
              >
                {showPassword?  'Hide' : 'Show'}
              </button>
            }
          />
          <div className="text-xs font-[500]">
            <span className="text-[#797979]">Don&apos;t have an account yet? </span>
            <a href="/signup" className="text-[#000000]">
              Register now!
            </a>
          </div>

          <Button classname='w-full !text-lg !font-[600]'>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}
