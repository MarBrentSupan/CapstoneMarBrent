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
    const modalRef = useRef(null);
    console.log(pagedata);

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

        router.post(route('SA.delete-department'), { id })
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
                                    <DangerButton
                                        onClick={(e) => delete_department(e, rowData.id)}
                                    >
                                        Delete
                                    </DangerButton>:"-"
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