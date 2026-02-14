import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <SignUp forceRedirectUrl="/diet-preferences" />
        </div>
    )
}

export default SignUpPage
