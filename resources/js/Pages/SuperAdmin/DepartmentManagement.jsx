import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, Head, useForm, router } from "@inertiajs/react";
import { CreateDepartmentModal } from "./CreateDepartmentModal";
import TableComponents from "../../Components/TableComponents";
import DangerButton from "@/Components/DangerButton";
import PaginationComponents from "../../Components/PaginationComponents";

function DepartmentBreadcrumbs() {
    return (
        <h2>
            <Link href={route("SA.dashboard")}>Dashboard</Link>
            {" > "}
            <Link href={route("SA.department-management")}>
                Department Management
            </Link>
        </h2>
    );
}

const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Acronym", key: "acronym" },
    { header: "Series Number Prefix", key: "seriesnumberprefix" },
    { header: "Created At", key: "created_at" },
];

function DepartmentManagementHeader(props) {
    return (
        <div className="flex">
            <div>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Super-Admin Department Management
                </h2>
                <p>View and manage departments and departments information</p>
            </div>
            <div className="ml-auto">
                <PrimaryButton onClick={() => props.setShowModal(true)}>
                    Create Department
                </PrimaryButton>
            </div>
        </div>
    );
}

export default function Dashboard({ auth, pagedata }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId ] = useState();

    const modalRef = useRef(null);


    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        acronym: "",
        seriesnumberprefix: "",
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("SA.create-department"), {
            onFinish: () => {
                reset("name", "acronym", "seriesnumberprefix");
                setShowModal(false);
            },
        });
    };

    const delete_department = (e,id) => {
        e.preventDefault();

        router.post(route('SA.delete-department'), { id }, {
            onFinish: () => { setShowDeleteModal(false);}
        })
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            sidenav={pagedata.sidenav}
            breadcrumbs={<DepartmentBreadcrumbs />}
            header={<DepartmentManagementHeader setShowModal={setShowModal} />}
            notification={pagedata.topnav.notification}
        >
            <Head title="Super-Admin Create-Department" />

            <div className="">
                <div className="  mx-auto sm:px-6 lg:px-8">
                    {showModal && (
                        <CreateDepartmentModal
                            modalRef={modalRef}
                            data={data}
                            setData={setData}
                            processing={processing}
                            errors={errors}
                            submit={submit}
                        ></CreateDepartmentModal>
                    )}
                </div>
            </div>

            {showDeleteModal && (
                <div>
                    <div className="fixed z-10 inset-0 overflow-y-auto ">
                        <div className="flex items-center justify-center min-h-screen ">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                                <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg p-5">
                                        <div className="flex flex-col w-full">
                                            <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg mb-3 leading-6 font-medium text-gray-900">Do you want to delete this Department</h3>
                                                <hr />
                                                <div className="mt-2 flex">
                                                    <DangerButton onClick={(e) => delete_department(e, deleteId)}>Delete</DangerButton>
                                                    <PrimaryButton onClick={() => setShowDeleteModal(false)}>Cancel</PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                       
            )}
            
            <div className="py-12">
                <div className="  mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Department List
                        </h3>
                        <TableComponents
                            columns={columns}
                            data={pagedata.content.department.data}
                            renderActions={(rowData) => (
                                <>
                                    {rowData.allow_deletion?
                                         <PrimaryButton onClick={() => {setDeleteId(rowData.id); setShowDeleteModal(true) }}>Delete</PrimaryButton> : "-"
                                    }
                                </>
                            )}
                        ></TableComponents>
                    </div>

                    <PaginationComponents paginationData={pagedata.content.department} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}