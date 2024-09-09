import { useState, useRef, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import CreateDocumentManagement from './CreateDocumentManagement';
import ViewDocumentModal from './ViewDocumentModal';
import TableComponents from "@/Components/TableComponents";
import PaginationComponents from "@/Components/PaginationComponents";

function DocumentManagementHeader({ setShowModal, user }) {
    return (
        <div className="flex">
            <div>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Documents Management
                </h2>
                <p>View and manage documents submitted by all departments that are pending, for revision, for approval.</p>
            </div>
            <div className="ml-auto">
                {user.userRoleId == 2 &&
                    <PrimaryButton onClick={() => setShowModal('create')}>
                        Create Document
                    </PrimaryButton>
                }
            </div>
        </div>
    );
}

const columns = [
    { header: "Name", key: "name" },
    { 
        header: "Source Document Type",  
        render: (rowData) => rowData.source_document?.name || "N/A"
    },
    { header: "Series Number", key: "seriesNumber" },
    { header: "Department",
        render: (rowData) => rowData.department?.name || "N/A"
    },
    { 
        header: "Status",
        render: (rowData) => {
            const status = rowData.status;
            let statusClasses = 'inline-block text-center px-2 py-1 text-white rounded-full whitespace-nowrap';

            switch (status) {
                case 'In progress':
                    statusClasses += ' bg-yellow-500'; 
                    break;
                case 'Approved':
                    statusClasses += ' bg-green-500'; 
                    break;
                case 'Needs Update':
                    statusClasses += ' bg-blue-500'; 
                    break;
                case 'Archived':
                    statusClasses += ' bg-red-500'; 
                    break;
                default:
                    statusClasses += ' bg-gray-500';
                    break;
            }

            return <span className={statusClasses}>{status}</span>;
        }
    },
    { header: "Created At", key: "created_at" },
    { header: "Last Update", key: "notification_date" }
];

export default function Dashboard({ auth, pagedata }) {
    console.log(pagedata);
    const { url  } = usePage();
    const [modalType, setModalType] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const modalRef = useRef(null);
    console.log(pagedata.content.documents.data);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        externalUrl: '',
        totalPages:'',
        sourceDocumentId: 1,
    });

    const [search,setSearch]=useState("");
    const [filterStatus, setFilterStatus] = useState(new URLSearchParams(url.split('?')[1]).get('filterStatus') || "");
    const [filterSourceDocuments,setFilterSourceDocuments]= useState(new URLSearchParams(url.split('?')[1]).get('filterSourceDocuments') || "");
    const [filterDepartments,setFilterDepartments]= useState(new URLSearchParams(url.split('?')[1]).get('filterDepartments') || "");

    const submit = (e) => {
        e.preventDefault();
        post(route('O.create-document'), {
            onFinish: () => { reset('name', 'externalUrl', 'sourceDocumentId','totalPages'), setModalType(null) } 
        });
    };

    const gofilter = (e) => {
        e.preventDefault();
        const searchQuery = new URLSearchParams({ search, filterStatus, filterSourceDocuments, filterDepartments }).toString();
        const url = route(auth.user.user_role_name + '.documents') + '?' + searchQuery;
        router.get(url);
    };

    const clearfilter = (e) => {
        e.preventDefault();
        const url = route(auth.user.user_role_name+'.documents');
        router.get(url);
    };
    
    console.log(search);
    const viewDocument = (doc) => {
        setSelectedDocument(doc);
        setModalType('view');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalType(null);
            }
        };

        if (modalType) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalType]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            sidenav={pagedata.sidenav}
            breadcrumbs={
                <h2>
                    <Link href={route(auth.user.user_role_name + ".dashboard")}>Dashboard</Link> {'>'}
                    <Link href={route(auth.user.user_role_name + ".documents")}>Documents</Link>
                </h2>
            }
            header={<DocumentManagementHeader setShowModal={setModalType} user={auth.user} />}
            notification={pagedata.topnav.notification}
        >
            <Head title="Dashboard" />

            <div className="mx-auto sm:px-6 lg:px-8">
                {modalType === 'create' && (
                    <CreateDocumentManagement
                        modalRef={modalRef}
                        data={data}
                        setData={setData}
                        processing={processing}
                        errors={errors}
                        submit={submit}
                        pagedata={pagedata}
                    />
                )}
                {modalType === 'view' && selectedDocument && (
                    <ViewDocumentModal
                        modalRef={modalRef}
                        user={auth.user}
                        data={selectedDocument}
                        onClose={() => setModalType(null)}
                    />
                )}
            </div>


            {/* Table */}
            <div className="py-12">

                 {/* Search Filters */}
                <div className="flex space-x-4 items-center px-8 pb-7">
                    {/* Search by Name and Series Number */}
                    <div className="w-1/6">
                        <label className="block text-sm font-medium text-gray-700">Search</label>
                        <input
                            type="text"
                            placeholder="By name, series number"
                            onChange={(e)=>setSearch(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Search by Document Status */}
                    <div className="w-1/6">
                        <label className="block text-sm font-medium text-gray-700">Document Status</label>
                        <select 
                        value={filterStatus}
                        onChange={(e)=>setFilterStatus(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            <option value="">Choose Status</option>
                            <option value="In progress">In progress</option>
                            <option value="Approved">Approved</option>
                            <option value="Needs Update">Needs Update</option>
                        </select>
                    </div>

                    {/* Search by Source Document */}
                    <div className="w-1/6">
                        <label className="block text-sm font-medium text-gray-700">Source Document</label>
                        <select 
                        value={filterSourceDocuments}
                        onChange={(e)=>setFilterSourceDocuments(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            <option value="">Choose Source</option>
                            {pagedata.filter.sourcedocument.map((e)=><option value={e.id}>{e.name}</option>)}
                        </select>
                    </div>

                    {/* Search by Departments */}
                    {auth.user.user_role_name !='O'&& <div className="w-1/6">
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select 
                        value={filterDepartments}
                        onChange={(e)=>setFilterDepartments(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            
                            <option value="">Choose Department</option>
                            {pagedata.filter.department.map((e)=><option value={e.id}>{e.name}</option>)}
                        </select>
                    </div>}

                    {/* <div className="w-1/6">
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select 
                        onChange={(e)=>setFilterDepartments(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            
                            <option>Choose Department</option>
                            {pagedata.filter.department.map((e)=><option value={e.id}>{e.name}</option>)}
                        </select>
                    </div> */}

                    {/* Go Button */}
                    <div className="flex-none">
                        <button 
                        onClick={gofilter}
                        className="mt-6 px-4 py-1 bg-maincolor text-white font-bold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            GO
                        </button>
                    </div>

                    <div className="flex-none">
                        <button 
                        onClick={clearfilter}
                        className="mt-6 px-4 py-1 bg-maincolor text-white font-bold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            CLEAR
                        </button>
                    </div>
                </div>


                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Document List
                        </h3>
                        <TableComponents 
                            columns={columns}
                            data={pagedata.content.documents.data}
                            renderActions={(rowData) => (
                                <>
                                    <PrimaryButton onClick={() => viewDocument(rowData, auth.user)}>View</PrimaryButton>
                                </>
                            )}
                        ></TableComponents>
                    </div>

                    <PaginationComponents paginationData={pagedata.content.documents} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}