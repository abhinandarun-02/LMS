import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
    const user = await currentUser();
    if (!user){
        return <h2>Stay Tuned... Under Development</h2>
    }
        
    redirect('/app')
        
}