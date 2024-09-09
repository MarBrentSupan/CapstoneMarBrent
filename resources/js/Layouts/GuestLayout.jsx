import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import AuthBg from "../../assets/auth-bg.png";


export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"
        style={{
            backgroundImage: `url(${AuthBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg border-t-8 border-maincolor">
                <div className="flex justify-center py-10">
                    <Link href="/">
                        <ApplicationLogo className="w-43 h-40 fill-current text-gray-500" />
                    </Link>
                </div> 
                <div className="text-lg font-extrabold flex justify-center">
                    <h1>DOCUMENT CONTROL LOG MANAGEMENT</h1>
                </div>
                <br />
                <div className="flex justify-center text-small text-center pb-10">
                    <p>The Holy Angel University Office of Institutional Effectiveness plays a pivotal role in ensuring the quality management of HAU operations and compliance</p>
                </div>
                 
                {children}
                
            </div>
        </div>
        </div>
    );
}



