'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function AuthGuard({ children }: { children: React.ReactNode }) {

    const [checked, setChecked] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem('user')

        if (!user) {
            router.push('/login')
        } else {
            setChecked(true)
        }
    }, [])

    if (!checked) {
        return null
    }

    return <>{children}</>;
}
