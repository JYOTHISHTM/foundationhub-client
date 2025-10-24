"use client"

import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-600 text-sm">Choose your preferred method</p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          
          {/* Google Sign In Button */}
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
            <FcGoogle size={20} />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          {/* Home Button */}
          <button
            onClick={() => router.push("/home")}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Go to Home
          </button>
          
        </div>
      </div>
    </div>
  )
}