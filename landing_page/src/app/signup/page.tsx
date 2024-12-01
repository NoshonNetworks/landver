'use client';

import { useState } from 'react';
import Button  from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../components/Select/Select';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] text-[#1f1f1f] px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-[40px] font-bold">Let&apos;s set up</h1>
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
          
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm passcode"
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className=""
              >
                {showConfirmPassword?  'Hide' : 'Show'}
              </button>
            }
          />
          <Input
            type="text"
            placeholder="Wallet address"
          />
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Land owner"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Inspector">Inspector</SelectItem>
                <SelectItem value="Land buyer">Land buyer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="text-xs font-[500]">
            <span className="text-[#797979]">Already have an account? </span>
            <a href="/signin" className="text-[#000000]">
              Sing in!
            </a>
          </div>

          <Button classname='w-full !text-lg !font-[600]'>
            Sign up
          </Button>
        </form>
      </div>
    </div>
  )
}
