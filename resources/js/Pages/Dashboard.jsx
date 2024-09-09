import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';



export default function Dashboard({ auth, pagedata }) {
    const [selectedStatus, setSelectedStatus] = useState(null);

    const exportToCSV = () => {
        window.location.href = '/export-csv';
    };

    const filterDocuments = () => {
        if (!selectedStatus) {
            return pagedata.table.departments; // show all documents if no status is selected
        }

        return pagedata.table.departments.map((department) => ({
            ...department,
            document_series: department.document_series.filter(doc => doc.status === selectedStatus),
        })).filter(department => department.document_series.length > 0);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            sidenav={pagedata.sidenav}
            notification={pagedata.topnav.notification}
            breadcrumbs={<h2><Link
                href={route(auth.user.user_role_name + ".dashboard")}
            >
                Dashboard
            </Link> </h2>}
            header={
                <div className="flex">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Dashboard Overview
                        </h2>
                        <p>Overall statistics data of dashboard content.</p>
                    </div>
                    <div className="ml-auto">
                        <PrimaryButton onClick={exportToCSV}>Export to CSV</PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div>
                {/* Cards Section */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 px-8">
                    {auth.user.userRoleId !== 2 &&
                        <div
                            className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
                            onClick={() => setSelectedStatus(null)} // Show all documents
                        >
                            <h3 className="text-gray-700">Total Departments
                                <p className="text-4xl font-bold text-center">{pagedata.dashboardcards.departmentcount}</p>
                            </h3>
                        </div>
                    }
                    <div
                        className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
                        onClick={() => setSelectedStatus(null)} // Show all documents
                    >
                        <h3 className="text-gray-700">Total Documents
                            <p className="text-4xl font-bold text-center">{pagedata.dashboardcards.totaldocument}</p>
                        </h3>
                    </div>
                    <div
                        className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
                        onClick={() => setSelectedStatus('Approved')}
                    >
                        <h3 className="text-gray-700">Approved
                            <p className="text-4xl font-bold text-center">{pagedata.dashboardcards.approveddocument}</p>
                        </h3>
                    </div>
                    <div
                        className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
                        onClick={() => setSelectedStatus('Needs Update')}
                    >
                        <h3 className="text-gray-700">Needs Update
                            <p className="text-4xl font-bold text-center">{pagedata.dashboardcards.needsupdate}</p>
                        </h3>
                    </div>
                    <div
                        className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
                        onClick={() => setSelectedStatus('In progress')}
                    >
                        <h3 className="text-gray-700">In progress
                            <p className="text-4xl font-bold text-center">{pagedata.dashboardcards.inprogress}</p>
                        </h3>
                    </div>
                    <div
                        className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
                        onClick={() => setSelectedStatus('Archived')}
                    >
                        <h3 className="text-gray-700">Archived
                            <p className="text-4xl font-bold text-center">{pagedata.dashboardcards.archived}</p>
                        </h3>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Department
                        </h3>
                        <table className="min-w-full table-auto border-gray-800 text-left text-gray-700 text-xs">
                            <thead>
                                <tr>
                                    {auth.user.user_role_name != 'O' && <th className='px-4 py-2 border-b'>Department</th>}
                                    <th className='px-4 py-2 border-b'>Initial Issue</th>
                                    <th className='px-4 py-2 border-b'>Section/Subsection Code Title</th>
                                    <th className='px-4 py-2 border-b'>Number of Revision</th>
                                    <th className='px-4 py-2 border-b'>Status</th>
                                    <th className='px-4 py-2 border-b'>Effectivity Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterDocuments().map((e, idx) =>
                                        <React.Fragment key={idx}>
                                            {e.document_series.map((i, index) =>
                                                <tr key={index}>
                                                    {auth.user.user_role_name != 'O' && <td className="px-4 py-2 border-b">{e.name}</td>}
                                                    <td className="px-4 py-2 border-b">{i.created_at}</td>
                                                    <td className="px-4 py-2 border-b">{i.seriesNumber} {i.name}</td>
                                                    <td className="px-4 py-2 border-b">{i.revision_count}</td>
                                                    <td className="px-4 py-2 border-b">
                                                    <span className={`inline-block px-2 py-1 text-white text-center rounded-full whitespace-nowrap 
                                                            ${i.status === "In progress" ? 'bg-yellow-500' :
                                                            i.status === "Approved" ? 'bg-green-500' :
                                                            i.status === "Needs Update" ? 'bg-blue-500' :
                                                            i.status === "Archived" ? 'bg-red-500' :
                                                            'bg-gray-500'}`}
                                                    >
                                                    {i.status || 'N/A'}
                                                    </span>
                                                    </td>
                                                    <td className="px-4 py-2 border-b">{i.effectivity_date}</td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
