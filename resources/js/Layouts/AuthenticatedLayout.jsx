import { useState, useEffect, useRef } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import Logo from '../../assets/main-logo.png';
import { Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Authenticated({ user, header, children, notification, breadcrumbs, sidenav }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef();

    // Function to close the sidebar if clicked outside
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setShowSidebar(false);
        }
    };

    useEffect(() => {
        if (showSidebar) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSidebar]);


    const clear_notif = (e) => {
        e.preventDefault();
        router.post(route('auth.clear_notification'), { })
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`fixed inset-y-0 left-0 min-w-[300px] !w-[300px] z-1 bg-maincolor text-white transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-200 ease-in-out sm:relative sm:translate-x-0`}
            >
                <div className="flex flex-col gap-4 items-center justify-center text-center pt-10 mb-10">
                    {/* Logo */}
                    <img src={Logo} alt="" className="h-auto w-2/4" /> 
                    <h1 className="text-white font-bold">{sidenav.user.department_name}</h1>
                </div>

                {/* Logo */}
                <div className="w-full bg-[#871223] flex flex-col gap-2 rounded p-5 mt-5 mb-5">
                    <div className="flex flex-row items-center gap-4">
                        <div className="w-[50px] h-[50px] bg-red-800 rounded-lg flex justify-center items-center font-bold text-xl">{sidenav.user.name.split(' ').map((n) => n[0]).join('')}</div>
                        <span>
                            <p className="text-sm text-white">{sidenav.user.name}</p>
                            <small className="text-xs text-gray-300">{sidenav.user.user_role_name =="O"? "Originator": 
                            sidenav.user.user_role_name =="SA"? "Super Admin": 
                            "Document Controller"}</small>
                        </span>
                    </div>
                </div>


                <nav className="flex-1 px-2 py-4 space-y-1">
                    {user.userRoleId == 1 && <>
                        <Link
                            href={route('SA.dashboard')}
                            className={`block px-4 py-2 text-white text-s hover:bg-gray-700 ${route().current('SA.dashboard') ? 'bg-gray-700' : ''}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route('SA.documents')}
                            className={`block px-4 py-2 text-white  hover:bg-gray-700 ${route().current('SA.documents') ? 'bg-gray-700' : ''}`}
                        >
                            Documents
                        </Link>
                        <Link
                            href={route('SA.archive')}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 ${route().current('SA.archive') ? 'bg-gray-700' : ''}`}
                        >
                            Archive
                        </Link>
                        <Link
                            href={route('SA.user-management')}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 ${route().current('SA.user-management') ? 'bg-gray-700' : ''}`}
                        >
                            User Management
                        </Link>
                        <Link
                            href={route('SA.department-management')}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 ${route().current('SA.department-management') ? 'bg-gray-700' : ''}`}
                        >
                            Department Management
                        </Link>
                    </>
                    }
                    {user.userRoleId == 2 && <>
                        <Link
                            href={route('O.dashboard')}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 ${route().current('O.dashboard') ? 'bg-gray-700' : ''}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route('O.documents')}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 ${route().current('O.documents') ? 'bg-gray-700' : ''}`}
                        >
                            Documents
                        </Link>
                        <Link
                            href={route('O.archive')}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 ${route().current('O.archive') ? 'bg-gray-700' : ''}`}
                        >
                            Archive
                        </Link>
                    </>
                    }
                    {user.userRoleId == 3 && <>
                        <Link
                            href={route('DC.dashboard')}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 ${route().current('O.dashboard') ? 'bg-gray-700' : ''}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route('DC.documents')}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 ${route().current('O.documents') ? 'bg-gray-700' : ''}`}
                        >
                            Documents
                        </Link>
                        <Link
                            href={route('DC.archive')}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 ${route().current('O.archive') ? 'bg-gray-700' : ''}`}
                        >
                            Archive
                        </Link>
                    </>
                    }
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <nav className="bg-white border-b border-gray-100">
                    <div className="  mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                {/* Holy Angel University H2 */}
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Holy Angel University
                                </h2>

                                {/* Hamburger Button for Mobile */}
                                <button
                                    onClick={() => setShowSidebar(!showSidebar)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out sm:hidden"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showSidebar ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showSidebar ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex items-center space-x-4">
                                {notification && (
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md relative">
                                                <button
                                                    type="button"
                                                    className="relative flex items-center justify-center p-2 text-gray-500 bg-white hover:bg-gray-200 rounded-full focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    <svg
                                                        width="24px"
                                                        height="24px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003"
                                                            stroke="#000000"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    {notification.length > 0 && (
                                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                                            {notification.length}
                                                        </span>
                                                    )}
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>


                                            <Dropdown.Content>
                                                <div className='m-2 flex flex-col gap-3'>
                                                {notification.map((e) => <>
                                                <div className='bg-gray-200 p-2 rounded-md'>
                                                    <div className="">
                                                        <p className='text-xs font-bold color-black'>{e.seriesNumber} - rev:{e.revision_count}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs color-gray-200">{e.status}</p>
                                                        <p className="text-xs color-black-900">{e.notification_date}</p>
                                                    </div>
                                                </div>
                                                </>)}

                                                <PrimaryButton onClick={clear_notif}>Clear notifs</PrimaryButton>
                                                </div>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                )}
                                <div className="ml-3 relative">
                                    <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-full">
                                            <button
                                                type="button"
                                                className="inline-flex items-center p-2 border border-transparent text-sm leading-4 font-medium rounded-full text-gray-500 bg-white hover:bg-gray-200 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                                        stroke="#000000"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            {user.userRoleId == 1 && (
                                                <Dropdown.Link href={route('SA.profile.edit')}>Profile</Dropdown.Link>
                                            )}
                                            {user.userRoleId == 2 && (
                                                <Dropdown.Link href={route('O.profile.edit')}>Profile</Dropdown.Link>
                                            )}
                                            {user.userRoleId == 3 && (
                                                <Dropdown.Link href={route('DC.profile.edit')}>Profile</Dropdown.Link>
                                            )}

                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {breadcrumbs && (

                    <div className=" py-3 px-4 text-sm font-medium bg-gray-100 sm:px-6 lg:px-8  ">{breadcrumbs}</div>

                )}
                {/* Page Header */}
                {header && (
                    <header className="bg-gray-100 shadow">
                        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                {/* Main Content */}
                <main className="flex-1 bg-gray-100 pt-5 ">
                    
                    {children}

                </main>
            </div>
        </div>
    );
}
