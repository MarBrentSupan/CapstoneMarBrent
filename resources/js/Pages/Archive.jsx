import { useState, useRef, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, useForm, router } from '@inertiajs/react';
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
                Document Archives Management
                </h2>
                <p>View and manage documents that are in archives.</p>
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
    { 
        header: "Department",
        render: (rowData) => rowData.department?.name || "N/A"
    },
    { 
        header: "Status",
        render: (rowData) => {
            const status = rowData.status;
            let statusClasses;

            switch (status) {
                case "In progress":
                    statusClasses = 'px-2 py-1 text-white rounded-full bg-yellow-500';
                    break;
                case "Approved":
                    statusClasses = 'px-2 py-1 text-white rounded-full bg-green-500';
                    break;
                case "Needs Update":
                    statusClasses = 'px-2 py-1 text-white rounded-full bg-blue-500';
                    break;
                case "Archived":
                    statusClasses = 'px-2 py-1 text-white rounded-full bg-red-500';
                    break;
            }

            return <span className={statusClasses}>{status || 'N/A'}</span>;
        }
    },
    { header: "Created At", key: "created_at" },
];

export default function Dashboard({ auth, pagedata }) {
    const [modalType, setModalType] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const modalRef = useRef(null);
    console.log(pagedata.content.documents.data);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        externalUrl: '',
        sourceDocumentId: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('O.create-document'), {
            onFinish: () => reset('name', 'externalUrl', 'sourceDocumentId'),
        });
    };

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
                    <Link href={route(auth.user.user_role_name + ".archive")}>Archive</Link>
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

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6">
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